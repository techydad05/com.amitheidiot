<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

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
    goto('/reveal');
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Enter') {
        handleReveal();
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
  <div class="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-7xl text-center">
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
        class="hover:scale-115 morphing-button group relative transform overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-xl font-bold text-white transition-all duration-700 hover:-translate-y-3 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-[0_30px_60px_rgba(139,92,246,0.4)] sm:px-10 sm:py-5 sm:text-2xl"
      >
        <span class="relative z-10 flex items-center gap-3">
          <span class="animate-pulse text-2xl">🔮</span>
          <span>Reveal Truth</span>
          <span class="animate-pulse text-2xl">🔮</span>
        </span>
      </button>
      <div class="mt-8 text-sm text-slate-400 opacity-70">Press Enter to continue</div>
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

  .morphing-button {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
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
</style>
