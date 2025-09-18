<script>
  /** @type {import('./$types').PageData} */
  export let data;

  $: result = data.result;
  $: percentage = ((result.score / result.total_questions) * 100).toFixed(1);

  function getEmoji(score) {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🌟';
    if (score >= 70) return '👍';
    if (score >= 60) return '😐';
    if (score >= 50) return '😕';
    return '🤦';
  }
</script>

<div class="bg-base-200 min-h-screen px-4 py-8">
  <div class="mx-auto max-w-2xl">
    <div class="bg-base-100 card shadow-xl">
      <div class="card-body">
        <h2 class="card-title mb-4 text-2xl">Quiz Result</h2>

        <div class="stats mb-6 w-full shadow">
          <div class="stat">
            <div class="stat-title">Score</div>
            <div class="stat-value flex items-center gap-2">
              {percentage}%
              <span class="text-4xl">{getEmoji(percentage)}</span>
            </div>
            <div class="stat-desc">{result.score} out of {result.total_questions} correct</div>
          </div>
        </div>

        {#if result.claimed_by}
          <div class="alert-success alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
            <div>
              <p class="font-bold">Claimed by {result.claimed_by}</p>
              <p class="text-sm">This result has been verified</p>
            </div>
          </div>
        {/if}

        {#if result.missed_questions?.length > 0}
          <div class="mt-6">
            <h3 class="mb-3 text-lg font-semibold">Missed Questions</h3>
            <div class="space-y-2">
              {#each result.missed_questions as question}
                <div class="bg-base-200 rounded-lg p-4">
                  {question}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <div class="mt-6 text-sm opacity-60">
          <p>Taken on {new Date(result.created_at).toLocaleString()}</p>
        </div>

        <div class="card-actions mt-6 justify-end">
          <a href="/results" class="btn-primary btn">View Leaderboard</a>
        </div>
      </div>
    </div>
  </div>
</div>
