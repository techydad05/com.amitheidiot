<script>
  /** @type {import('./$types').PageData} */
  export let data;

  $: result = data.result;
  $: percentage = ((result.score / result.total_questions) * 100).toFixed(1);

  function getEmoji(score) {
    if (score >= 90) return "🏆";
    if (score >= 80) return "🌟";
    if (score >= 70) return "👍";
    if (score >= 60) return "😐";
    if (score >= 50) return "😕";
    return "🤦";
  }
</script>

<div class="min-h-screen bg-base-200 py-8 px-4">
  <div class="max-w-2xl mx-auto">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Quiz Result</h2>
        
        <div class="stats shadow w-full mb-6">
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
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p class="font-bold">Claimed by {result.claimed_by}</p>
              <p class="text-sm">This result has been verified</p>
            </div>
          </div>
        {/if}

        {#if result.missed_questions?.length > 0}
          <div class="mt-6">
            <h3 class="text-lg font-semibold mb-3">Missed Questions</h3>
            <div class="space-y-2">
              {#each result.missed_questions as question}
                <div class="bg-base-200 p-4 rounded-lg">
                  {question}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <div class="mt-6 text-sm opacity-60">
          <p>Taken on {new Date(result.created_at).toLocaleString()}</p>
        </div>

        <div class="card-actions justify-end mt-6">
          <a href="/results" class="btn btn-primary">View Leaderboard</a>
        </div>
      </div>
    </div>
  </div>
</div>
