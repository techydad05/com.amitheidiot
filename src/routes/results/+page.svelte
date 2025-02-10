<script>
  import { fade, fly, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let searchTerm = "";
  let selectedFilter = "all";
  let showStats = false;

  $: results = data.results || [];
  $: filteredResults = results.filter(result => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "top10") return result.rank <= 10;
    if (selectedFilter === "top50percent") return parseFloat(result.percentile) >= 50;
    return true;
  }).filter(result => {
    if (!searchTerm) return true;
    return result.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  $: averageScore = results.length
    ? (results.reduce((acc, r) => acc + (r.score / r.total_questions * 100), 0) / results.length).toFixed(1)
    : 0;

  $: totalParticipants = results.length;

  function getEmoji(percentage) {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 70) return "👍";
    if (percentage >= 60) return "😐";
    if (percentage >= 50) return "😕";
    return "🤦";
  }

  function getGradientClass(rank) {
    if (rank === 1) return "bg-gradient-to-r from-yellow-300 to-yellow-500";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-800";
    return "";
  }

  let mounted = false;
  onMount(() => {
    mounted = true;
  });

  let verificationModalOpen = false;
  let activeResultId = null;
  let verificationCode = '';
  let username = '';
  let verifying = false;
  let error = '';

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
          username
        })
      });
      
      const result = await response.json();
      
      if (result.type === 'error') {
        error = result.error;
      } else {
        verificationModalOpen = false;
        // Refresh the page to show updated results
        window.location.reload();
      }
    } catch (err) {
      error = 'Failed to verify result';
    } finally {
      verifying = false;
    }
  }
</script>

<div class="min-h-screen bg-base-200 py-8 px-4">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4" in:scale>Am I The Idiot? - Leaderboard</h1>
      <p class="text-lg opacity-80" in:fade={{ delay: 200 }}>
        See how you stack up against other quiz takers!
      </p>
    </div>

    <div class="stats shadow w-full mb-8" in:fly={{ y: 20, duration: 800, delay: 400 }}>
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

    <div class="flex flex-col sm:flex-row gap-4 mb-6" in:fly={{ y: 20, duration: 800, delay: 600 }}>
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search by ID..."
          class="input input-bordered w-full"
          bind:value={searchTerm}
        />
      </div>
      <select class="select select-bordered" bind:value={selectedFilter}>
        <option value="all">All Results</option>
        <option value="top10">Top 10</option>
        <option value="top50percent">Top 50%</option>
      </select>
    </div>

    <div class="card bg-base-100 shadow-xl" in:fly={{ y: 20, duration: 800, delay: 800 }}>
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Score</th>
                <th>Percentile</th>
                <th class="hidden sm:table-cell">Date</th>
                <th class="hidden md:table-cell">ID</th>
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
                    easing: quintOut
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
                      <span>{result.percentage}%</span>
                      <span class="text-xl">{getEmoji(result.percentage)}</span>
                    </div>
                  </td>
                  <td>
                    <div class="radial-progress text-primary" style="--value:{result.percentile}; --size:2rem;">
                      {result.percentile}%
                    </div>
                  </td>
                  <td class="hidden sm:table-cell">
                    {new Date(result.created_at).toLocaleDateString()}
                  </td>
                  <td class="hidden md:table-cell font-mono text-sm opacity-60">
                    <div class="flex items-center gap-2">
                      <span>{result.claimed_by || result.id}</span>
                      {#if !result.is_claimed}
                        <button
                          class="btn btn-xs btn-ghost"
                          on:click={() => {
                            activeResultId = result.id;
                            verificationModalOpen = true;
                          }}
                        >
                          Claim
                        </button>
                      {/if}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {#if filteredResults.length === 0}
      <div class="text-center py-8 opacity-60" in:fade>
        No results found matching your criteria
      </div>
    {/if}
  </div>
</div>

{#if verificationModalOpen}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Claim Your Result</h3>
      
      <div class="form-control">
        <label class="label">
          <span class="label-text">Verification Code</span>
        </label>
        <input
          type="text"
          placeholder="Enter your verification code"
          class="input input-bordered w-full"
          bind:value={verificationCode}
        />
      </div>
      
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text">Choose a Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter your desired username"
          class="input input-bordered w-full"
          bind:value={username}
        />
      </div>

      {#if error}
        <div class="alert alert-error mt-4">
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
        <button
          class="btn btn-primary"
          disabled={verifying}
          on:click={verifyAndClaim}
        >
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
