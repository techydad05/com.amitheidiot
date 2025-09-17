<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let currentSection = 0;
  const sections = [
    {
      title: "The Modern Crisis",
      subtitle: "Are We the New 'Idiotes'?",
      icon: "⚠️",
      content: "In an age of unprecedented connection, we face a crisis of civic disengagement that would horrify the ancient Greeks."
    },
    {
      title: "Echo Chambers",
      subtitle: "Digital Isolation",
      icon: "📱",
      content: "Social media algorithms create isolated bubbles, preventing the diverse civic discourse that democracy requires."
    },
    {
      title: "Information Overload",
      subtitle: "Paralysis by Analysis",
      icon: "🌊",
      content: "Too much information, too little wisdom. We're drowning in data but starving for understanding."
    },
    {
      title: "Political Apathy",
      subtitle: "The New 'Private Citizens'",
      icon: "🤷",
      content: "Like the ancient 'idiotes,' many retreat from civic life, believing their voice doesn't matter."
    },
    {
      title: "The Solution",
      subtitle: "Reclaiming Democracy",
      icon: "💪",
      content: "The Greeks knew: democracy requires active participation. We must choose engagement over isolation."
    }
  ];

  function nextSection() {
    if (currentSection < sections.length - 1) {
      currentSection++;
    } else {
      goto('/quiz');
    }
  }

  function prevSection() {
    if (currentSection > 0) {
      currentSection--;
    }
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextSection();
      } else if (e.key === 'ArrowLeft') {
        prevSection();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>The Modern Crisis - Am I The Idiot?</title>
  <meta
    name="description"
    content="Explore how modern society faces the same civic disengagement crisis that ancient Greeks warned about."
  />
</svelte:head>

<div
  class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900"
>
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute inset-0 animate-pulse bg-gradient-to-br from-red-500/5 to-orange-500/5"
    ></div>
  </div>

  <!-- Navigation -->
  <div class="relative z-20 p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <button
        on:click={() => goto('/timeline')}
        class="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
      >
        <svg
          class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span class="hidden sm:inline">Back to Timeline</span>
        <span class="sm:hidden">Back</span>
      </button>

      <div class="text-center">
        <h1 class="text-lg font-bold text-white sm:text-xl lg:text-2xl">The Modern Crisis</h1>
        <p class="text-xs text-white/60 sm:text-sm">Understanding today's civic challenges</p>
      </div>

      <button
        on:click={() => goto('/quiz')}
        class="rounded-full border border-green-500/30 bg-green-500/20 px-3 py-2 text-sm text-green-300 backdrop-blur-xl transition-all duration-300 hover:bg-green-500/30 hover:text-green-200 sm:px-4 sm:text-base"
      >
        <span class="hidden sm:inline">Take Quiz</span>
        <span class="sm:hidden">Quiz</span>
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 flex min-h-[80vh] items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-4xl">
      {#key currentSection}
        <div
          in:fly={{ x: 50, duration: 500 }}
          out:fly={{ x: -50, duration: 300 }}
          class="text-center"
        >
          <div class="mb-8 text-8xl">{sections[currentSection].icon}</div>
          
          <h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {sections[currentSection].title}
          </h2>
          
          <h3 class="mb-8 text-xl text-orange-300 sm:text-2xl md:text-3xl">
            {sections[currentSection].subtitle}
          </h3>
          
          <div class="mx-auto max-w-3xl">
            <div class="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
              <p class="text-lg leading-relaxed text-slate-200 sm:text-xl">
                {sections[currentSection].content}
              </p>
            </div>
          </div>
        </div>
      {/key}

      <!-- Navigation Controls -->
      <div class="mt-12 flex items-center justify-between">
        <button
          on:click={prevSection}
          disabled={currentSection === 0}
          class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>

        <!-- Progress Indicator -->
        <div class="flex gap-2">
          {#each sections as _, index}
            <div
              class="h-2 w-8 rounded-full transition-all duration-300"
              class:bg-orange-500={index === currentSection}
              class:bg-white/20={index !== currentSection}
            ></div>
          {/each}
        </div>

        <button
          on:click={nextSection}
          class="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-white transition-all duration-300 hover:scale-105"
        >
          {currentSection === sections.length - 1 ? 'Take Quiz' : 'Next'}
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Instructions -->
      <div class="mt-8 text-center text-sm text-white/40">
        <p>Use arrow keys to navigate • Press Enter for next section</p>
      </div>
    </div>
  </div>
</div>