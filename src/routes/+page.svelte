<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Timeline from './timeline/+page.svelte';

  let step = 'question'; // question -> revealing -> revealed -> journey
  let isRevealing = false;
  let showTimeline = false;

  const backgroundWords = [
    'IDIOT',
    'FOOL',
    'STUPID',
    'DUMB',
    'MORON',
    'IGNORANT',
    'SILLY',
    'DENSE',
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

  function handleReveal() {
    if (isRevealing) return;
    isRevealing = true;
    step = 'revealing';

    setTimeout(() => {
      step = 'revealed';
    }, 1500); // Total time for the reveal animation
  }

  function showJourney() {
    step = 'journey';
    setTimeout(() => {
      showTimeline = true;
    }, 500);
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Enter') {
        if (step === 'question') {
          handleReveal();
        } else if (step === 'revealed') {
          showJourney();
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>Am I The Idiot? - A Journey Through History</title>
  <meta
    name="description"
    content="Discover the surprising history behind the word 'idiot' - from ancient Greek democracy to modern usage."
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
  <div class="relative z-10 p-4 sm:p-6" class:flex={!showTimeline} class:min-h-screen={!showTimeline} class:items-center={!showTimeline} class:justify-center={!showTimeline}>
    <div class="w-full text-center" class:max-w-7xl={!showTimeline}>
      <!-- Step 1 & 2: The Question and The Reveal -->
      <div
        class="transform-gpu transition-all duration-1000 ease-smooth-in-out"
        class:opacity-0={showTimeline}
        class:scale-95={showTimeline}
        class:pointer-events-none={showTimeline}
        class:absolute={showTimeline}
        class:inset-0={showTimeline}
        class:-z-10={showTimeline}
      >
        <div
          class="transform-gpu transition-all duration-1000 ease-smooth-in-out"
          class:-translate-y-32={step === 'revealed' || step === 'revealing'}
          class:scale-90={step === 'revealed' || step === 'revealing'}
          class:opacity-0={step === 'revealed' || step === 'revealing'}
        >
          <h1
            class="mb-6 text-4xl font-bold leading-tight sm:mb-8 sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl"
          >
            <span
              class="animate-pulse bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Am I The
            </span>
          </h1>
          <div
            class="mb-8 px-2 text-5xl font-black sm:mb-12 sm:text-6xl md:text-7xl lg:text-9xl xl:text-[10rem]"
          >
            <span
              class="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl"
            >
              IDIOT?
            </span>
          </div>
          <p
            class="mx-auto mb-8 max-w-2xl px-4 text-lg leading-relaxed text-slate-300 sm:mb-12 sm:text-xl md:text-2xl"
          >
            Before you answer, do you know what this word really means?
          </p>
          <button
            on:click={handleReveal}
            disabled={isRevealing}
            class="hover:scale-115 morphing-button group relative transform overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-xl font-bold text-white transition-all duration-700 hover:-translate-y-3 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-[0_30px_60px_rgba(139,92,246,0.4)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-10 sm:py-5 sm:text-2xl"
          >
            <span class="relative z-10 flex items-center gap-3">
              <span class="animate-pulse text-2xl">🔮</span>
              <span>Reveal Truth</span>
              <span class="animate-pulse text-2xl">🔮</span>
            </span>
          </button>
          <div class="mt-8 text-sm text-slate-400 opacity-70">Press Enter to continue</div>
        </div>

        <!-- The Revelation -->
        <div
          class="absolute inset-0 flex transform-gpu flex-col items-center justify-center transition-all duration-1000 ease-smooth-in-out"
          class:opacity-0={step === 'question'}
          class:pointer-events-none={step === 'question'}
          class:translate-y-16={step === 'question'}
        >
          <div class="space-y-6 text-center">
            <div class="text-8xl transition-transform duration-300 hover:rotate-12">🤯</div>
            <h2
              class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-6xl font-black text-transparent md:text-8xl"
            >
              PLOT TWIST!
            </h2>
            <div class="mx-auto max-w-4xl text-2xl font-light text-slate-200 sm:text-3xl md:text-5xl">
              The word <span class="glow-text font-bold text-red-400">"idiot"</span> has nothing to do
              with intelligence.
            </div>
            <div class="text-3xl font-bold sm:text-4xl md:text-6xl">
              <span
                class="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
              >
                It's about democracy! 🏛️
              </span>
            </div>
            <div class="w-full max-w-3xl pt-6">
              <div
                class="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
              >
                In ancient Greece, an <span class="glow-text font-semibold italic text-blue-300"
                  >"idiotes"</span
                >
                was someone who avoided civic duty and public life.
                <div class="mt-4 text-lg text-slate-400">💡 Ready to learn the full story?</div>
              </div>
            </div>
            <div class="pt-6">
              <button
                on:click={showJourney}
                class="morphing-button-2 group relative transform overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 px-8 py-4 text-xl font-bold text-white transition-all duration-700 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_30px_60px_rgba(20,184,166,0.5)] sm:px-12 sm:py-6 sm:text-2xl"
              >
                <span class="relative z-10 flex items-center gap-4">
                  <span class="animate-bounce text-3xl">🚀</span>
                  <span>Learn More</span>
                </span>
              </button>
              <div class="mt-8 text-lg text-slate-400 opacity-70">⌨️ Press Enter to continue</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: The Timeline -->
      {#if showTimeline}
        <div 
          in:fly={{ y: 50, duration: 800, easing: quintOut }}
          class="w-full"
        >
          <Timeline />
        </div>
      {/if}
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

  .morphing-button {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }

  .morphing-button-2 {
    background-size: 200% 200%;
    animation: gradient-shift-2 4s ease infinite;
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
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

  .hover-lift {
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  }

  .ease-smooth-in-out {
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }
</style>
