<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let searchTerm = '';
  let selectedFilter = 'all';

  $: results = data.results || [];
  $: filteredResults = results
    .filter((result) => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'top10') return result.rank <= 10;
      if (selectedFilter === 'top50percent') return parseFloat(result.percentile) >= 50;
      return true;
    })
    .filter((result) => {
      if (!searchTerm) return true;
      return result.id.toLowerCase().includes(searchTerm.toLowerCase());
    });

  $: averageScore = results.length
    ? (
        results.reduce((acc, r) => acc + (r.score / r.total_questions) * 100, 0) / results.length
      ).toFixed(1)
    : 0;

  $: totalParticipants = results.length;

  function getEmoji(percentage) {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '😐';
    if (percentage >= 50) return '😕';
    return '🤦';
  }

  function getGradientClass(rank) {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-300 text-primary-content';
    if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-100 to-amber-300';
    return '';
  }

  let mounted = false;
  let verificationModalOpen = false;
  let activeResultId = null;
  let verificationCode = '';
  let username = '';
  let verifying = false;
  let error = '';

  // Handle URL parameters for verification
  onMount(() => {
    mounted = true;

    // Check for verification code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const verifyToken = urlParams.get('verify');

    if (verifyToken) {
      console.log('Found verification token:', verifyToken);
      verificationCode = verifyToken;

      // Find the matching result
      const matchingResult = results.find((r) => r.verification_token === verifyToken);
      if (matchingResult) {
        console.log('Found matching result:', matchingResult);
        activeResultId = matchingResult.id;
        verificationModalOpen = true;
      } else {
        console.error('No matching result found for token:', verifyToken);
      }

      // Clean up URL without refreshing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  });

  async function verifyAndClaim() {
    if (!verificationCode || !username) {
      error = 'Please fill in all fields';
      return;
    }

    verifying = true;
    error = '';

    try {
      const response = await fetch('/api/verify-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resultId: activeResultId,
          verificationToken: verificationCode,
          username,
        }),
      });

      const result = await response.json();

      if (result.type === 'error') {
        error = result.error;
      } else {
        verificationModalOpen = false;
        // Refresh the page to show updated results
        window.location.reload();
      }
    } catch {
      error = 'Failed to verify result';
    } finally {
      verifying = false;
    }
  }
</script>

<div class="bg-base-200 min-h-screen px-4 py-8">
  <div class="mx-auto max-w-4xl">
    <div class="mb-6">
      <a href="/" class="btn-ghost btn gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back to Menu
      </a>
    </div>
    <div class="mb-8 text-center">
      <h1 class="mb-4 text-4xl font-bold" in:scale>Am I The Idiot? - Leaderboard</h1>
      <p class="text-lg opacity-80" in:fade={{ delay: 200 }}>
        See how you stack up against other quiz takers!
      </p>
    </div>

    <div class="stats mb-8 w-full shadow" in:fly={{ y: 20, duration: 800, delay: 400 }}>
      <div class="stat">
        <div class="stat-title">Average Score</div>
        <div class="stat-value">{averageScore}%</div>
        <div class="stat-desc">Across all participants</div>
      </div>

      <div class="stat">
        <div class="stat-title">Total Participants</div>
        <div class="stat-value">{totalParticipants}</div>
        <div class="stat-desc">And counting!</div>
      </div>
    </div>

    <div class="mb-6 flex flex-col gap-4 sm:flex-row" in:fly={{ y: 20, duration: 800, delay: 600 }}>
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search by ID..."
          class="input-bordered input w-full"
          bind:value={searchTerm}
        />
      </div>
      <select class="select-bordered select" bind:value={selectedFilter}>
        <option value="all">All Results</option>
        <option value="top10">Top 10</option>
        <option value="top50percent">Top 50%</option>
      </select>
    </div>

    <div class="bg-base-100 card shadow-xl" in:fly={{ y: 20, duration: 800, delay: 800 }}>
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table-zebra table">
            <thead>
              <tr>
                <th class="w-20">Rank</th>
                <th class="w-1/2">Player</th>
                <th class="w-32">Score</th>
                <th class="hidden w-32 sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredResults as result, i (result.id)}
                <tr
                  class="hover:bg-base-200 transition-colors {getGradientClass(result.rank)}"
                  in:fly={{
                    y: 20,
                    delay: mounted ? 0 : Math.min(1000 + i * 100, 2000),
                    duration: 500,
                    easing: quintOut,
                  }}
                >
                  <td class="font-bold">
                    {#if result.rank <= 3}
                      <div class="flex items-center gap-2">
                        <span class="text-xl">{result.rank}</span>
                        {#if result.rank === 1}
                          <span class="text-2xl">👑</span>
                        {:else if result.rank === 2}
                          <span class="text-2xl">🥈</span>
                        {:else}
                          <span class="text-2xl">🥉</span>
                        {/if}
                      </div>
                    {:else}
                      {result.rank}
                    {/if}
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      {#if result.is_claimed}
                        <span class="text-primary text-lg font-bold tracking-wide"
                          >{result.username}</span
                        >
                      {:else}
                        <div class="flex items-center gap-3">
                          <span class="opacity-50">Unclaimed</span>
                          <button
                            class="btn-primary btn-outline btn btn-sm whitespace-nowrap"
                            on:click={() => {
                              activeResultId = result.id;
                              verificationModalOpen = true;
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="mr-1 h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Claim Result
                          </button>
                        </div>
                      {/if}
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <span class="text-lg">{result.percentage}%</span>
                      <span class="text-2xl">{getEmoji(result.percentage)}</span>
                    </div>
                  </td>
                  <td class="hidden sm:table-cell">
                    {new Date(result.created_at).toLocaleDateString()}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {#if filteredResults.length === 0}
      <div class="py-8 text-center opacity-60" in:fade>No results found matching your criteria</div>
    {/if}
  </div>
</div>

{#if verificationModalOpen}
  <div class="modal-open modal">
    <div class="modal-box">
      <h3 class="mb-4 text-lg font-bold">Claim Your Result</h3>

      <div class="form-control">
        <label class="label" for="verification-code">
          <span class="label-text">Verification Code</span>
        </label>
        <input
          type="text"
          id="verification-code"
          placeholder="Enter your verification code"
          class="input-bordered input w-full"
          bind:value={verificationCode}
        />
      </div>

      <div class="form-control mt-4">
        <label class="label" for="username">
          <span class="label-text">Choose a Username</span>
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your desired username"
          class="input-bordered input w-full"
          bind:value={username}
        />
      </div>

      {#if error}
        <div class="alert-error alert mt-4">
          {error}
        </div>
      {/if}

      <div class="modal-action">
        <button
          class="btn"
          on:click={() => {
            verificationModalOpen = false;
            error = '';
            verificationCode = '';
            username = '';
          }}
        >
          Cancel
        </button>
        <button class="btn-primary btn" disabled={verifying} on:click={verifyAndClaim}>
          {verifying ? 'Verifying...' : 'Verify & Claim'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add smooth transitions for hover effects */
  tr {
    transition: all 0.2s ease-in-out;
  }

  /* Style the radial progress bars */
  :global(.radial-progress) {
    font-size: 0.7rem;
  }
</style>
