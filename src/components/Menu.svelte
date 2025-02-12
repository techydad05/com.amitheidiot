<script>
	import { fade } from "svelte/transition";

  export let goBackToStart;
  export let startQuiz;
  export let showLearnMore;
</script>
<div
      class="fixed inset-0 bg-base-300 bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
      transition:fade
    >
      <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-3xl p-4 sm:p-8 space-y-6 sm:space-y-8 relative my-2 sm:my-4">
        <!-- Close button -->
        <button
          class="absolute top-2 right-2 sm:top-4 sm:right-4 btn btn-circle btn-ghost btn-sm sm:btn-md"
          on:click={goBackToStart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Title -->
        <div class="text-center mt-6 sm:mt-0">
          <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-primary">Choose Your Path</h2>
          <p class="text-lg sm:text-xl md:text-2xl text-base-content opacity-80 px-2">
            Discover the fascinating journey of how a word about civic duty became a modern insult
          </p>
        </div>

        <!-- Buttons in cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-8">
          <!-- Learn More Card -->
          <div class="card bg-primary text-primary-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">Learn More</h3>
              <p class="text-sm sm:text-base mb-4">Explore the historical journey of the word "idiot" through ancient Greece.</p>
              <div class="card-actions w-full">
                <button
                  class="btn glass btn-primary btn-sm sm:btn-md md:btn-lg w-full text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content"
                  on:click={showLearnMore}
                >
                  Discover →
                </button>
              </div>
            </div>
          </div>

          <!-- Take the Quiz Card -->
          <div class="card bg-secondary text-secondary-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">Take the Quiz</h3>
              <p class="text-sm sm:text-base mb-4">Test your knowledge about the historical meaning and modern usage.</p>
              <div class="card-actions w-full">
                <button
                  class="btn glass btn-secondary btn-sm sm:btn-md md:btn-lg w-full text-secondary-content border-secondary-content hover:bg-primary hover:border-primary-content"
                  on:click={startQuiz}
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          </div>

          <!-- Coming Soon Card -->
          <div class="card bg-accent text-accent-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">Coming Soon</h3>
              <p class="text-sm sm:text-base mb-4">More features and content are on the way. Stay tuned!</p>
              <div class="card-actions w-full">
                <button
                  class="btn glass btn-accent btn-sm sm:btn-md md:btn-lg w-full text-accent-content border-accent-content hover:bg-secondary hover:border-secondary-content"
                  disabled
                >
                  Soon →
                </button>
              </div>
            </div>
          </div>

          <!-- Results Card -->
          <div class="card bg-accent text-accent-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">View Results</h3>
              <p class="text-sm sm:text-base mb-4">Check out the leaderboard and claim your quiz results.</p>
              <div class="card-actions w-full">
                <a
                  href="/results"
                  class="btn glass btn-accent btn-sm sm:btn-md md:btn-lg w-full text-accent-content border-accent-content hover:bg-secondary hover:border-secondary-content"
                >
                  Leaderboard →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>