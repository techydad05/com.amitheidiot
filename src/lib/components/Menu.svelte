<script>
  import { fade } from 'svelte/transition';
  import EducationStats from './EducationStats.svelte';

  export let goBackToStart;
  export let startQuiz;
  export let showLearnMore;

  let showStats = false;
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-base-300 bg-opacity-95 p-2 backdrop-blur-sm sm:p-4"
  transition:fade
>
  <div
    class="relative my-2 w-full max-w-3xl space-y-6 rounded-lg bg-base-100 p-4 shadow-xl sm:my-4 sm:space-y-8 sm:p-8"
  >
    <!-- Close button -->
    <button
      class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 sm:btn-md sm:right-4 sm:top-4"
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
      <h2 class="mb-2 text-3xl font-bold text-primary sm:mb-4 sm:text-4xl md:text-6xl">
        Choose Your Path
      </h2>
      <p class="px-2 text-lg text-base-content opacity-80 sm:text-xl md:text-2xl">
        Discover the fascinating journey of how a word about civic duty became a modern insult
      </p>
    </div>

    <!-- Buttons in cards -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
      <!-- Learn More Card -->
      <div class="card bg-primary text-primary-content shadow-xl">
        <div class="card-body items-center p-3 text-center sm:p-4">
          <h3 class="card-title mb-2 text-lg font-bold sm:text-xl">Learn More</h3>
          <p class="mb-3 text-sm">
            Explore the historical journey of the word "idiot" through ancient Greece.
          </p>
          <div class="card-actions w-full">
            <button
              class="btn glass btn-primary btn-sm w-full border-primary-content text-primary-content sm:btn-md md:btn-lg hover:border-secondary-content hover:bg-secondary"
              on:click={showLearnMore}
            >
              Discover →
            </button>
          </div>
        </div>
      </div>

      <!-- Take the Quiz Card -->
      <div class="card bg-secondary text-secondary-content shadow-xl">
        <div class="card-body items-center p-3 text-center sm:p-4">
          <h3 class="card-title mb-2 text-lg font-bold sm:text-xl">Take the Quiz</h3>
          <p class="mb-3 text-sm">
            Test your knowledge about the historical meaning and modern usage.
          </p>
          <div class="card-actions w-full">
            <button
              class="btn glass btn-secondary btn-sm w-full border-secondary-content text-secondary-content sm:btn-md md:btn-lg hover:border-primary-content hover:bg-primary"
              on:click={startQuiz}
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>

      <!-- Results Card -->
      <div class="card bg-accent text-accent-content shadow-xl">
        <div class="card-body items-center p-3 text-center sm:p-4">
          <h3 class="card-title mb-2 text-lg font-bold sm:text-xl">View Results</h3>
          <p class="mb-3 text-sm">
            Check out the leaderboard and claim your quiz results.
          </p>
          <div class="card-actions w-full">
            <a
              href="/results"
              class="btn glass btn-accent btn-sm w-full border-accent-content text-accent-content sm:btn-md md:btn-lg hover:border-secondary-content hover:bg-secondary"
            >
              Leaderboard →
            </a>
          </div>
        </div>
      </div>

    </div>

    <!-- Education Stats Button -->
    <div class="w-full">
      <button
        class="btn btn-wide btn-outline btn-error btn-sm w-full sm:btn-md"
        on:click={() => showStats = true}
      >
        <span class="mr-2">📊</span>
        View Education Crisis Stats
      </button>
    </div>

    <!-- Coming Soon Card -->
    <div class="card bg-accent text-accent-content shadow-xl w-full md:col-span-3">
        <div class="card-body items-center p-3 text-center sm:p-4">
          <h3 class="card-title mb-2 text-lg font-bold sm:text-xl">Coming Soon</h3>
          <p class="mb-3 text-sm">
            More features and content are on the way. Stay tuned!
          </p>
          <div class="card-actions w-full">
            <button
              class="btn glass btn-accent btn-sm w-full border-accent-content text-accent-content sm:btn-md md:btn-lg hover:border-secondary-content hover:bg-secondary"
              disabled
            >
              Soon →
            </button>
          </div>
        </div>
      </div>
  </div>
</div>

{#if showStats}
  <EducationStats bind:show={showStats} />
{/if}
