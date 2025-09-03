<script>
  import { fade, fly, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import WordHistory from '$lib/components/WordHistory.svelte';

  let currentSection = 0;
  let showWordHistory = false;
  
  const sections = [
    {
      title: "Ancient Athens",
      subtitle: "The Birth of Democracy 🏛️",
      content: "Picture ancient Athens: bustling markets, passionate debates, and citizens gathering in the agora. This wasn't just a marketplace - it was democracy's birthplace, where every voice mattered.",
      icon: "🏛️",
      color: "from-blue-500 to-purple-500",
      funFact: "The agora was like ancient Twitter - but with actual face-to-face debates!"
    },
    {
      title: "Meet the 'Idiotes'",
      subtitle: "ἰδιώτης - The Original Meaning",
      content: "An 'idiotes' wasn't stupid - they were just... private. Think of them as ancient introverts who preferred Netflix and chill over town hall meetings.",
      icon: "🏠",
      color: "from-purple-500 to-pink-500",
      funFact: "Basically, they were the ancient equivalent of people who skip voting!"
    },
    {
      title: "Civic Duty Drama",
      subtitle: "Why Greeks Were Judgy About It",
      content: "Greeks were hardcore about democracy. Avoiding civic duty was like ghosting your entire community. They believed your personal choices affected everyone.",
      icon: "⚖️",
      color: "from-pink-500 to-red-500",
      funFact: "Imagine if not voting made you the neighborhood villain - that was ancient Greece!"
    },
    {
      title: "The Great Translation Fail",
      subtitle: "How 'Private Citizen' Became 'Dummy'",
      content: "Over 2,000 years, the word took a wild journey. From 'person who avoids politics' to 'complete fool' - talk about a glow-down!",
      icon: "🔄",
      color: "from-red-500 to-orange-500",
      funFact: "It's like if 'influencer' somehow became an insult in the year 4024!"
    }
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

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
  <!-- Dynamic Background -->
  <div class="absolute inset-0 overflow-hidden">
    {#each sections as section, i}
      <div 
        class="absolute inset-0 bg-gradient-to-br {section.color} opacity-{currentSection === i ? '20' : '0'} transition-opacity duration-1000"
      ></div>
    {/each}
  </div>

  <!-- Navigation -->
  <div class="relative z-20 p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <button
        on:click={goBack}
        class="group flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 text-white/80 hover:text-white transition-all duration-300 text-sm sm:text-base"
      >
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </button>

      <!-- Progress Indicator -->
      <div class="flex items-center gap-2">
        {#each sections as _, i}
          <div 
            class="w-2 h-2 rounded-full transition-all duration-300 {currentSection === i ? 'bg-white w-6 sm:w-8' : 'bg-white/30'}"
          ></div>
        {/each}
      </div>

      <button
        on:click={() => showWordHistory = true}
        class="px-3 sm:px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 backdrop-blur-xl rounded-full border border-amber-500/30 text-amber-300 hover:text-amber-200 transition-all duration-300 text-sm sm:text-base"
      >
        Full History
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-4xl text-center">
      
      {#key currentSection}
        <div in:fly={{ x: 100, duration: 500 }} out:fly={{ x: -100, duration: 300 }}>
          <!-- Icon -->
          <div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 animate-pulse">
            {sections[currentSection].icon}
          </div>

          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 leading-tight px-4">
            <span class="bg-gradient-to-r {sections[currentSection].color} bg-clip-text text-transparent">
              {sections[currentSection].title}
            </span>
          </h1>

          <!-- Subtitle -->
          <div class="text-xl sm:text-2xl md:text-3xl text-white/80 mb-6 sm:mb-8 font-light px-4">
            {sections[currentSection].subtitle}
          </div>

          <!-- Content -->
          <p class="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
            {sections[currentSection].content}
          </p>

          <!-- Fun Fact -->
          <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto mb-8 sm:mb-12">
            <div class="flex items-center gap-3 mb-2">
              <div class="text-2xl">💡</div>
              <div class="text-amber-300 font-semibold">Fun Fact</div>
            </div>
            <p class="text-amber-100 text-sm sm:text-base leading-relaxed">
              {sections[currentSection].funFact}
            </p>
          </div>
        </div>
      {/key}

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-center gap-4 sm:gap-6 px-4">
        <button
          on:click={prevSection}
          disabled={currentSection === 0}
          class="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
        >
          <svg class="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="hidden sm:inline">Previous</span>
          <span class="sm:hidden">Prev</span>
        </button>

        <div class="text-white/60 text-sm">
          {currentSection + 1} of {sections.length}
        </div>

        {#if currentSection < sections.length - 1}
          <button
            on:click={nextSection}
            class="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r {sections[currentSection].color} hover:scale-105 rounded-2xl text-white font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            <span class="hidden sm:inline">Next</span>
            <span class="sm:hidden">Next</span>
            <svg class="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        {:else}
          <button
            on:click={() => goto('/quiz')}
            class="group flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 rounded-2xl text-white font-bold transition-all duration-300 text-sm sm:text-base"
          >
            <span class="hidden sm:inline">Take the Quiz</span>
            <span class="sm:hidden">Quiz</span>
            <svg class="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        {/if}
      </div>

      <!-- Keyboard Hints -->
      <div class="mt-8 sm:mt-12 text-xs sm:text-sm text-white/40 space-y-1 px-4">
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
    onClose={() => showWordHistory = false}
    onStartQuiz={() => {
      showWordHistory = false;
      goto('/quiz');
    }}
  />
{/if}