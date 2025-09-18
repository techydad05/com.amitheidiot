<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  const backgroundWords = [
    'IDIOTES',
    'PRIVATE',
    'CITIZEN',
    'DEMOCRACY',
    'ATHENS',
    'AGORA',
    'CIVIC',
    'PUBLIC',
    'POLITICS',
    'GREEK',
    'ANCIENT',
    'HISTORY',
    'ETYMOLOGY',
    'MEANING',
  ];

  function showTimeline() {
    goto('/timeline');
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Enter') {
        showTimeline();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>The Truth Revealed - Am I The Idiot?</title>
  <meta
    name="description"
    content="Discover the shocking truth about the word 'idiot' - it's not about intelligence at all!"
  />
</svelte:head>

<div
  class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
>
  <!-- Animated Background Words -->
  <div class="absolute inset-0 overflow-hidden opacity-5">
    {#each backgroundWords as word}
      <div
        class="pointer-events-none absolute select-none text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-6xl"
        style="
          left: {Math.random() * 100}%; 
          top: {Math.random() * 100}%; 
          animation: float {8 + Math.random() * 4}s ease-in-out infinite;
          animation-delay: {Math.random() * 2}s;
        "
      >
        {word}
      </div>
    {/each}
  </div>

  <!-- Main Content -->
  <div class="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-6xl text-center">
      <div class="space-y-8">
        <div class="text-8xl transition-transform duration-300 hover:rotate-12">🤯</div>

        <h1
          class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-5xl font-black text-transparent sm:text-6xl md:text-8xl"
        >
          PLOT TWIST!
        </h1>

        <div class="mx-auto max-w-5xl space-y-6">
          <p class="text-2xl font-light text-slate-200 sm:text-3xl md:text-4xl lg:text-5xl">
            The word <span class="glow-text font-bold text-red-400">"idiot"</span> has nothing to do
            with intelligence.
          </p>

          <div class="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            <span
              class="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
            >
              It's about democracy! 🏛️
            </span>
          </div>
        </div>

        <div class="mx-auto w-full max-w-4xl pt-8">
          <div class="rounded-3xl border border-slate-700/50 bg-slate-800/30 p-8 backdrop-blur-sm">
            <div class="space-y-6 text-lg leading-relaxed text-slate-200 sm:text-xl">
              <p>
                In ancient Greece, an <span class="glow-text font-semibold italic text-blue-300"
                  >"idiotes" (ἰδιώτης)</span
                > was someone who avoided civic duty and public life.
              </p>
              <p class="text-slate-300">
                It literally meant "private person" - someone who minded their own business instead
                of participating in democracy.
              </p>
              <div class="mt-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6">
                <p class="text-xl font-medium text-blue-200">
                  💡 Ready to learn the full 2,500-year story?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8">
          <button
            on:click={showTimeline}
            class="morphing-button-2 group relative transform overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 px-10 py-5 text-xl font-bold text-white transition-all duration-700 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_30px_60px_rgba(20,184,166,0.5)] sm:px-12 sm:py-6 sm:text-2xl"
          >
            <span class="relative z-10 flex items-center gap-4">
              <span class="animate-bounce text-3xl">🚀</span>
              <span>Explore the Timeline</span>
            </span>
          </button>
          <div class="mt-6 text-lg text-slate-400 opacity-70">⌨️ Press Enter to continue</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes glow {
    0%,
    100% {
      text-shadow: 0 0 5px currentColor;
    }
    50% {
      text-shadow:
        0 0 20px currentColor,
        0 0 30px currentColor;
    }
  }

  .glow-text {
    animation: glow 2s ease-in-out infinite;
  }

  .morphing-button-2 {
    background-size: 200% 200%;
    animation: gradient-shift-2 4s ease infinite;
  }

  @keyframes gradient-shift-2 {
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
