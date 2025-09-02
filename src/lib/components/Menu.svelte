<script>
  import { fade } from 'svelte/transition';
  import EducationStats from './EducationStats.svelte';

  export let goBackToStart;
  export let startQuiz;
  export let showLearnMore;

  let showStats = false;
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-surface-backdrop-token p-2 backdrop-blur-sm sm:p-4"
  transition:fade
>
  <div
    class="relative my-2 w-full max-w-3xl space-y-6 rounded-container-token bg-surface-100-800-token p-4 shadow-xl sm:my-4 sm:space-y-8 sm:p-8"
  >
    <!-- Close button -->
    <button
      class="btn-icon btn-icon-sm variant-filled-surface absolute right-2 top-2 sm:btn-icon-base sm:right-4 sm:top-4"
      on:click={goBackToStart}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 sm:h-6 sm:w-6"
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

    <!-- Title -->
    <div class="mt-6 text-center sm:mt-0">
      <h2 class="mb-2 text-3xl font-bold text-primary-500 sm:mb-4 sm:text-4xl md:text-6xl">
        Choose Your Path
      </h2>
      <p class="px-2 text-lg text-surface-600-300-token opacity-80 sm:text-xl md:text-2xl">
        Discover the fascinating journey of how a word about civic duty became a modern insult
      </p>
    </div>

    <!-- Buttons in cards -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
      <!-- Learn More Card -->
      <div class="card variant-filled-primary p-4 shadow-xl">
        <div class="text-center">
          <h3 class="mb-2 text-lg font-bold sm:text-xl">Learn More</h3>
          <p class="mb-3 text-sm opacity-90">
            Explore the historical journey of the word "idiot" through ancient Greece.
          </p>
          <button
            class="btn variant-ghost-surface w-full"
            on:click={showLearnMore}
          >
            Discover →
          </button>
        </div>
      </div>

      <!-- Take the Quiz Card -->
      <div class="card variant-filled-secondary p-4 shadow-xl">
        <div class="text-center">
          <h3 class="mb-2 text-lg font-bold sm:text-xl">Take the Quiz</h3>
          <p class="mb-3 text-sm opacity-90">
            Test your knowledge about the historical meaning and modern usage.
          </p>
          <button
            class="btn variant-ghost-surface w-full"
            on:click={startQuiz}
          >
            Start Quiz →
          </button>
        </div>
      </div>

      <!-- Results Card -->
      <div class="card variant-filled-tertiary p-4 shadow-xl">
        <div class="text-center">
          <h3 class="mb-2 text-lg font-bold sm:text-xl">View Results</h3>
          <p class="mb-3 text-sm opacity-90">
            Check out the leaderboard and claim your quiz results.
          </p>
          <a
            href="/results"
            class="btn variant-ghost-surface w-full"
          >
            Leaderboard →
          </a>
        </div>
      </div>

    </div>

    <!-- Education Stats Button -->
    <div class="w-full">
      <button
        class="btn variant-outline-error w-full"
        on:click={() => showStats = true}
      >
        <span class="mr-2">📊</span>
        View Education Crisis Stats
      </button>
    </div>

    <!-- Coming Soon Card -->
    <div class="card variant-filled-surface p-4 shadow-xl w-full">
        <div class="text-center">
          <h3 class="mb-2 text-lg font-bold sm:text-xl">Coming Soon</h3>
          <p class="mb-3 text-sm opacity-80">
            More features and content are on the way. Stay tuned!
          </p>
          <button
            class="btn variant-ghost-surface w-full"
            disabled
          >
            Soon →
          </button>
        </div>
      </div>
  </div>
</div>

{#if showStats}
  <EducationStats bind:show={showStats} />
{/if}
