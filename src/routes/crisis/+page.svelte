<script>
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let currentSection = 0;
  let showStats = false;
  
  const sections = [
    {
      title: "The Reagan Revolution",
      subtitle: "1980s - When Government Became the Enemy",
      content: "\"Government is not the solution to our problem; government IS the problem.\" With these words, Reagan flipped the script on civic engagement. Suddenly, caring about politics wasn't patriotic - it was naive.",
      icon: "🎬",
      color: "from-red-500 to-orange-500",
      stats: {
        title: "The Shift Begins",
        data: [
          { label: "Voter Turnout Drop", value: "63% → 50%", trend: "down" },
          { label: "Trust in Government", value: "76% → 25%", trend: "down" },
          { label: "Civic Participation", value: "High → Declining", trend: "down" }
        ]
      },
      funFact: "Reagan's anti-government rhetoric made civic disengagement cool. The ancient Greeks would be horrified!"
    },
    {
      title: "Corporate Money Enters",
      subtitle: "1990s-2000s - Democracy for Sale",
      content: "As campaign costs skyrocketed, politicians needed corporate cash to survive. Suddenly, your voice mattered less than a corporation's checkbook. The 'idiotes' weren't avoiding politics - politics was avoiding them.",
      icon: "💰",
      color: "from-orange-500 to-yellow-500",
      stats: {
        title: "Money Talks Louder",
        data: [
          { label: "Campaign Spending", value: "$1B → $14B", trend: "up" },
          { label: "Lobbyist Spending", value: "$1.4B → $3.7B", trend: "up" },
          { label: "Average Citizen Influence", value: "Minimal → Nearly Zero", trend: "down" }
        ]
      },
      funFact: "A single billionaire now has more political influence than entire cities. Democracy? More like oligarchy with extra steps."
    },
    {
      title: "Citizens United",
      subtitle: "2010 - The Final Nail",
      content: "The Supreme Court decided corporations are people and money is speech. Translation: Democracy is now officially for sale to the highest bidder. Regular citizens? You're just background noise.",
      icon: "⚖️",
      color: "from-yellow-500 to-red-500",
      stats: {
        title: "Democracy Hijacked",
        data: [
          { label: "Dark Money Spending", value: "$5M → $1B+", trend: "up" },
          { label: "Corporate Political Power", value: "Limited → Unlimited", trend: "up" },
          { label: "Voter Influence", value: "Weak → Practically None", trend: "down" }
        ]
      },
      funFact: "Corporations got more rights than actual humans. The Founding Fathers are probably spinning in their graves like rotisserie chickens."
    },
    {
      title: "The Modern 'Idiotes'",
      subtitle: "Today - We're All Greeks Now",
      content: "Congratulations! We've come full circle. Just like ancient Greek 'idiotes,' Americans are retreating from civic life. But this time, it's because the system is rigged, not because we're selfish.",
      icon: "🔄",
      color: "from-red-500 to-purple-500",
      stats: {
        title: "The New Reality",
        data: [
          { label: "Americans Who Feel Powerless", value: "78%", trend: "up" },
          { label: "Trust in Elections", value: "37%", trend: "down" },
          { label: "Civic Knowledge", value: "Embarrassingly Low", trend: "down" }
        ]
      },
      funFact: "We're not idiots for avoiding politics - we're rational actors in an irrational system. The Greeks would actually understand this version!"
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
  <title>The Modern Crisis - Am I The Idiot?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
  <!-- Dynamic Background -->
  <div class="absolute inset-0 overflow-hidden">
    {#each sections as section, i}
      <div 
        class="absolute inset-0 bg-gradient-to-br {section.color} opacity-{currentSection === i ? '15' : '0'} transition-opacity duration-1000"
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
        on:click={() => showStats = true}
        class="px-3 sm:px-4 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-xl rounded-full border border-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300 text-sm sm:text-base"
      >
        All Stats
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-6xl">
      
      {#key currentSection}
        <div in:fly={{ x: 100, duration: 500 }} out:fly={{ x: -100, duration: 300 }}>
          <!-- Icon -->
          <div class="text-center mb-8">
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
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
            
            <!-- Main Content -->
            <div class="space-y-6">
              <p class="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                {sections[currentSection].content}
              </p>

              <!-- Fun Fact -->
              <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-6">
                <div class="flex items-center gap-3 mb-2">
                  <div class="text-2xl">🤯</div>
                  <div class="text-amber-300 font-semibold">Reality Check</div>
                </div>
                <p class="text-amber-100 text-sm sm:text-base leading-relaxed">
                  {sections[currentSection].funFact}
                </p>
              </div>
            </div>

            <!-- Stats Panel -->
            <div class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10">
              <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span class="text-3xl">📊</span>
                {sections[currentSection].stats.title}
              </h3>
              
              <div class="space-y-4">
                {#each sections[currentSection].stats.data as stat}
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div class="text-white/80 text-sm sm:text-base">{stat.label}</div>
                    <div class="flex items-center gap-2">
                      <div class="text-white font-bold text-lg">{stat.value}</div>
                      <div class="text-2xl">
                        {stat.trend === 'up' ? '📈' : '📉'}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/key}

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-center gap-4 sm:gap-6 px-4 mt-12">
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
            <span class="hidden sm:inline">Test Your Knowledge</span>
            <span class="sm:hidden">Quiz</span>
            <svg class="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        {/if}
      </div>

      <!-- Keyboard Hints -->
      <div class="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-white/40 space-y-1 px-4">
        <div class="hidden sm:block">Use ← → arrow keys to navigate</div>
        <div class="hidden sm:block">Press ESC to go back</div>
        <div class="sm:hidden">Swipe or use buttons to navigate</div>
      </div>
    </div>
  </div>
</div>

<!-- Stats Modal -->
{#if showStats}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    <div 
      class="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden"
      in:fly={{ y: 50, duration: 400 }}
      out:fly={{ y: -50, duration: 200 }}
    >
      <!-- Header -->
      <div class="p-4 sm:p-6 border-b border-white/10">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">The Shocking Numbers</h2>
            <p class="text-sm sm:text-base text-white/60">How we became a nation of "idiotes"</p>
          </div>
          <button
            on:click={() => showStats = false}
            class="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- All Stats -->
      <div class="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
            <h3 class="text-red-300 font-bold mb-4 flex items-center gap-2">
              <span class="text-2xl">🗳️</span>
              Voter Engagement Crisis
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-white/80">Midterm Turnout</span>
                <span class="text-red-300 font-bold">36%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/80">Young Voter Participation</span>
                <span class="text-red-300 font-bold">23%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/80">Local Election Turnout</span>
                <span class="text-red-300 font-bold">15%</span>
              </div>
            </div>
          </div>

          <div class="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20">
            <h3 class="text-orange-300 font-bold mb-4 flex items-center gap-2">
              <span class="text-2xl">💰</span>
              Money in Politics
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-white/80">2024 Election Spending</span>
                <span class="text-orange-300 font-bold">$16B+</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/80">Corporate Donations</span>
                <span class="text-orange-300 font-bold">Unlimited</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/80">Average Citizen Influence</span>
                <span class="text-orange-300 font-bold">~0%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
          <h3 class="text-purple-300 font-bold mb-4 flex items-center gap-2">
            <span class="text-2xl">🧠</span>
            Civic Knowledge Gap
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-300 mb-1">32%</div>
              <div class="text-white/80">Can name their representative</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-300 mb-1">26%</div>
              <div class="text-white/80">Know how bills become laws</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-300 mb-1">19%</div>
              <div class="text-white/80">Understand Citizens United</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-white/10 bg-white/5">
        <div class="flex items-center justify-between">
          <div class="text-white/60 text-sm">
            The ancient Greeks would call this a democracy crisis.
          </div>
          <div class="flex gap-3">
            <button
              on:click={() => showStats = false}
              class="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 text-white/80 hover:text-white transition-all duration-300"
            >
              Close
            </button>
            <button
              on:click={() => {
                showStats = false;
                goto('/quiz');
              }}
              class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 rounded-xl text-white font-semibold transition-all duration-300"
            >
              Take Action Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}