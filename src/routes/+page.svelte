<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let showAnswer = false;
  let currentStep = 0;

  // Background words animation
  const backgroundWords = [
    'IDIOT', 'FOOL', 'STUPID', 'DUMB', 'MORON', 'IGNORANT', 'SILLY', 'DENSE',
    'IDIOTES', 'PRIVATE', 'CITIZEN', 'DEMOCRACY', 'ATHENS', 'AGORA', 'CIVIC',
    'PUBLIC', 'POLITICS', 'GREEK', 'ANCIENT', 'HISTORY', 'ETYMOLOGY', 'MEANING'
  ];

  function handleReveal() {
    showAnswer = true;
    setTimeout(() => {
      currentStep = 1;
    }, 1000);
  }

  function goToStart() {
    goto('/start');
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Enter' && !showAnswer) {
        handleReveal();
      } else if (e.key === 'Enter' && showAnswer && currentStep >= 1) {
        goToStart();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>Am I The Idiot?</title>
  <meta name="description" content="Discover the surprising history behind the word 'idiot' - from ancient Greek democracy to modern usage." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
  <!-- Animated Background Words -->
  <div class="absolute inset-0 overflow-hidden opacity-5">
    {#each backgroundWords as word, i}
      <div 
        class="absolute text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white select-none pointer-events-none"
        style="
          left: {Math.random() * 100}%; 
          top: {Math.random() * 100}%; 
          animation: float {8 + Math.random() * 4}s ease-in-out infinite;
          animation-delay: {Math.random() * 2}s;
          transform: rotate({Math.random() * 40 - 20}deg);
        "
      >
        {word}
      </div>
    {/each}
  </div>

  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse"></div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 min-h-screen flex items-center justify-center p-6">
    <div class="text-center max-w-4xl mx-auto">
      
      {#if !showAnswer}
        <!-- Question -->
        <div in:fade={{ duration: 1000 }}>
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 sm:mb-8 leading-tight">
            <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Am I The
            </span>
          </h1>
          
          <div class="text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[12rem] font-black mb-8 sm:mb-12">
            <span class="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
              IDIOT?
            </span>
          </div>

          <p class="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Before you answer, do you know what this word really means?
          </p>

          <button
            on:click={handleReveal}
            class="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl text-white text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span class="group-hover:animate-pulse">Find Out</span>
          </button>

          <div class="mt-8 text-sm text-slate-400">
            Press Enter to continue
          </div>
        </div>

      {:else}
        <!-- Answer Reveal -->
        <div in:fly={{ y: 50, duration: 800 }}>
          <div class="text-6xl mb-8 animate-bounce">🤔</div>
          
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-8">
            Plot Twist!
          </h2>
          
          <div class="text-2xl md:text-3xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            The word "idiot" has nothing to do with intelligence.
            <br />
            <span class="text-amber-400 font-semibold">It's about democracy.</span>
          </div>

          {#if currentStep >= 1}
            <div in:fade={{ delay: 500, duration: 800 }} class="mb-12">
              <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                In ancient Greece, an "idiotes" was someone who avoided civic duty.
                Ready to learn the full story?
              </p>
              
              <button
                on:click={goToStart}
                class="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl text-white text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span class="flex items-center gap-2">
                  Learn the History
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </button>

              <div class="mt-6 text-sm text-slate-400">
                Press Enter to continue
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(var(--rotation, 0deg));
    }
    50% {
      transform: translateY(-20px) rotate(var(--rotation, 0deg));
    }
  }
</style>