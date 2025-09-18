<script>
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import WordHistory from '$lib/components/WordHistory.svelte';

  let currentSection = 0;
  let showWordHistory = false;

  const sections = [
    {
      title: 'Ancient Athens',
      subtitle: 'The Birth of Democracy 🏛️',
      content:
        "Picture ancient Athens: bustling markets, passionate debates, and citizens gathering in the agora. This wasn't just a marketplace - it was democracy's birthplace, where every voice mattered.",
      icon: '🏛️',
      color: 'from-blue-500 to-purple-500',
      funFact: 'The agora was like ancient Twitter - but with actual face-to-face debates!',
    },
    {
      title: "Meet the 'Idiotes'",
      subtitle: 'ἰδιώτης - The Original Meaning',
      content:
        "An 'idiotes' wasn't stupid - they were just... private. Think of them as ancient introverts who preferred Netflix and chill over town hall meetings.",
      icon: '🏠',
      color: 'from-purple-500 to-pink-500',
      funFact: 'Basically, they were the ancient equivalent of people who skip voting!',
    },
    {
      title: 'Civic Duty Drama',
      subtitle: 'Why Greeks Were Judgy About It',
      content:
        'Greeks were hardcore about democracy. Avoiding civic duty was like ghosting your entire community. They believed your personal choices affected everyone.',
      icon: '⚖️',
      color: 'from-pink-500 to-red-500',
      funFact: 'Imagine if not voting made you the neighborhood villain - that was ancient Greece!',
    },
    {
      title: 'The Great Translation Fail',
      subtitle: "How 'Private Citizen' Became 'Dummy'",
      content:
        "Over 2,000 years, the word took a wild journey. From 'person who avoids politics' to 'complete fool' - talk about a glow-down!",
      icon: '🔄',
      color: 'from-red-500 to-orange-500',
      funFact: "It's like if 'influencer' somehow became an insult in the year 4024!",
    },
  ];

  function nextSection() {
    if (currentSection < sections.length - 1) {
      currentSection++;
    }
  }

  function prevSection() {
    if (currentSection > 0) {
      currentSection--;
    }
  }

  function goBack() {
    goto('/start');
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
      if (e.key === 'Escape') goBack();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>Learn the History - Am I The Idiot?</title>
</svelte:head>

<div
  class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
>
  <!-- Dynamic Background -->
  <div class="absolute inset-0 overflow-hidden">
    {#each sections as section, i}
      <div
        class="absolute inset-0 bg-gradient-to-br {section.color} opacity-{currentSection === i
          ? '20'
          : '0'} transition-opacity duration-1000"
      ></div>
    {/each}
  </div>

  <!-- Navigation -->
  <div class="relative z-20 p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <button
        on:click={goBack}
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
        Back
      </button>

      <!-- Progress Indicator -->
      <div class="flex items-center gap-2">
        {#each sections as i}
          <div
            class="h-2 w-2 rounded-full transition-all duration-300 {currentSection === i
              ? 'w-6 bg-white sm:w-8'
              : 'bg-white/30'}"
          ></div>
        {/each}
      </div>

      <button
        on:click={() => (showWordHistory = true)}
        class="rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-2 text-sm text-amber-300 backdrop-blur-xl transition-all duration-300 hover:bg-amber-500/30 hover:text-amber-200 sm:px-4 sm:text-base"
      >
        Full History
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-4xl text-center">
      {#key currentSection}
        <div in:fly={{ x: 100, duration: 500 }} out:fly={{ x: -100, duration: 300 }}>
          <!-- Icon -->
          <div class="mb-6 animate-pulse text-6xl sm:mb-8 sm:text-7xl md:text-8xl lg:text-9xl">
            {sections[currentSection].icon}
          </div>

          <!-- Title -->
          <h1
            class="mb-4 px-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl"
          >
            <span
              class="bg-gradient-to-r {sections[currentSection]
                .color} bg-clip-text text-transparent"
            >
              {sections[currentSection].title}
            </span>
          </h1>

          <!-- Subtitle -->
          <div class="mb-6 px-4 text-xl font-light text-white/80 sm:mb-8 sm:text-2xl md:text-3xl">
            {sections[currentSection].subtitle}
          </div>

          <!-- Content -->
          <p
            class="mx-auto mb-6 max-w-3xl px-4 text-lg leading-relaxed text-slate-300 sm:mb-8 sm:text-xl md:text-2xl"
          >
            {sections[currentSection].content}
          </p>

          <!-- Fun Fact -->
          <div
            class="mx-auto mb-8 max-w-2xl rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 sm:mb-12 sm:p-6"
          >
            <div class="mb-2 flex items-center gap-3">
              <div class="text-2xl">💡</div>
              <div class="font-semibold text-amber-300">Fun Fact</div>
            </div>
            <p class="text-sm leading-relaxed text-amber-100 sm:text-base">
              {sections[currentSection].funFact}
            </p>
          </div>
        </div>
      {/key}

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-center gap-4 px-4 sm:gap-6">
        <button
          on:click={prevSection}
          disabled={currentSection === 0}
          class="group flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 sm:text-base"
        >
          <svg
            class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span class="hidden sm:inline">Previous</span>
          <span class="sm:hidden">Prev</span>
        </button>

        <div class="text-sm text-white/60">
          {currentSection + 1} of {sections.length}
        </div>

        {#if currentSection < sections.length - 1}
          <button
            on:click={nextSection}
            class="group flex items-center gap-2 bg-gradient-to-r px-4 py-2 sm:px-6 sm:py-3 {sections[
              currentSection
            ]
              .color} rounded-2xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg sm:text-base"
          >
            <span class="hidden sm:inline">Next</span>
            <span class="sm:hidden">Next</span>
            <svg
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        {:else}
          <button
            on:click={() => goto('/quiz')}
            class="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg sm:px-8 sm:py-3 sm:text-base"
          >
            <span class="hidden sm:inline">Take the Quiz</span>
            <span class="sm:hidden">Quiz</span>
            <svg
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </button>
        {/if}
      </div>

      <!-- Keyboard Hints -->
      <div class="mt-8 space-y-1 px-4 text-xs text-white/40 sm:mt-12 sm:text-sm">
        <div class="hidden sm:block">Use ← → arrow keys to navigate</div>
        <div class="hidden sm:block">Press ESC to go back</div>
        <div class="sm:hidden">Swipe or use buttons to navigate</div>
      </div>
    </div>
  </div>
</div>

{#if showWordHistory}
  <WordHistory
    bind:show={showWordHistory}
    onClose={() => (showWordHistory = false)}
    onStartQuiz={() => {
      showWordHistory = false;
      goto('/quiz');
    }}
  />
{/if}
