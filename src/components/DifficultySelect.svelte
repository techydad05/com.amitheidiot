<script>
  import { fade, fly } from 'svelte/transition';
  export let onSelect;
  export let onBack;
  export let questions = [];

  const difficulties = [
    {
      id: 'humble',
      title: '"I Know What I Don\'t Know"',
      description: 'At least I admit I might be an idiot.',
      icon: '🧠',
      settings: {
        num_questions: 5,
        time_limit: 45,
        theme: 'garden'
      },
      class: 'bg-success text-success-content',
      hoverClass: 'hover:bg-success-focus',
      subtitle: 'For the self-aware citizen'
    },
    {
      id: 'moderate',
      title: '"I Watch The News Sometimes"',
      description: 'I catch headlines between TikTok videos.',
      icon: '📱',
      settings: {
        num_questions: 7,
        time_limit: 30,
        theme: 'synthwave'
      },
      class: 'bg-warning text-warning-content',
      hoverClass: 'hover:bg-warning-focus',
      subtitle: 'For the casually misinformed'
    },
    {
      id: 'facebook',
      title: '"I Do My Own Research"',
      description: 'Facebook memes and YouTube comments are my trusted sources.',
      icon: '🤳',
      settings: {
        num_questions: 10,
        time_limit: 20,
        theme: 'dracula'
      },
      class: 'bg-error text-error-content',
      hoverClass: 'hover:bg-error-focus',
      subtitle: 'For those who think they know everything'
    }
  ];
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-base-300 bg-opacity-95 p-4 backdrop-blur-sm"
  transition:fade={{ duration: 150 }}
>
  <div
    class="relative w-full max-w-4xl space-y-8 rounded-lg bg-base-100 p-6 shadow-xl"
    in:fly={{ y: 20, duration: 200 }}
  >
    <!-- Close button -->
    <button
      class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
      on:click={onBack}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div class="text-center">
      <h2 class="mb-2 text-3xl font-bold text-primary">Rate Your Knowledge</h2>
      <p class="text-lg text-base-content opacity-80">
        Be honest (or don't, we'll find out anyway)
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      {#each difficulties as difficulty}
        <div
          class="card transition-all duration-300 hover:-translate-y-2 {difficulty.class}"
          role="button"
          on:click={() => onSelect(difficulty.settings)}
          on:keydown={(e) => e.key === 'Enter' && onSelect(difficulty.settings)}
          tabindex="0"
        >
          <div class="card-body items-center p-6 text-center">
            <span class="text-4xl">{difficulty.icon}</span>
            <h3 class="card-title mb-2 text-xl font-bold">{difficulty.title}</h3>
            <p class="mb-1 text-sm italic opacity-90">{difficulty.subtitle}</p>
            <p class="text-sm">{difficulty.description}</p>
            <div class="card-actions mt-4">
              <button class="btn btn-outline border-2 {difficulty.hoverClass}">
                Choose This Level
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="divider text-base-content/70 font-semibold my-8">OR TAKE THE ULTIMATE CHALLENGE</div>

    <!-- Premium Challenge -->
    <div class="card bg-secondary text-secondary-content w-full transition-all duration-300 hover:-translate-y-2">
      <div class="card-body items-center p-6 text-center">
        <div class="flex items-center gap-3">
          <span class="text-4xl">👑</span>
          <h3 class="card-title text-2xl font-bold">"Put Your Money Where Your Brain Is"</h3>
        </div>
        <p class="mb-1 text-lg italic opacity-90">The Ultimate Challenge - Leaderboard Access</p>
        <p class="text-base">Think you're smart enough for the leaderboard? Prove it with a $1 entry fee. All questions, 15 seconds each, no room for idiots.</p>
        <div class="card-actions mt-4 w-full">
          <button 
            class="btn btn-block bg-secondary text-secondary-content border-none font-bold shadow-lg hover:scale-105 hover:brightness-110"
            on:click={() => onSelect({
              num_questions: questions.length,
              time_limit: 15,
              theme: 'luxury',
              isPremium: true
            })}
          >
            Enter the Challenge ($1)
          </button>
        </div>
        <p class="mt-2 text-xs opacity-75">
          Entry fee helps support server costs. Only premium scores are eligible for the leaderboard.
        </p>
      </div>
    </div>

    <div class="mt-6 text-center text-sm italic text-base-content opacity-60">
      Tip: The more confident you are, the less time you'll get per question.
      Choose wisely!
    </div>
  </div>
</div>
