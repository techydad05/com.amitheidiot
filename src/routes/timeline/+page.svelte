<script>
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let selectedPeriod = null;
  
  const timeline = [
    {
      period: "5th Century BCE",
      year: "~450 BCE",
      title: "Birth of 'Idiotes'",
      description: "In the bustling agora of Athens, a new word emerges: ἰδιώτης (idiotes). It simply means 'private person' - someone who minds their own business instead of participating in the democratic process.",
      icon: "🏛️",
      color: "from-blue-500 to-cyan-500",
      details: {
        context: "Athens was the world's first democracy, and civic participation was considered essential for society's wellbeing.",
        usage: "Used neutrally to describe private citizens, but with subtle disapproval from civic-minded Greeks.",
        modernEquivalent: "Like calling someone 'politically disengaged' today - not necessarily an insult, but not a compliment either."
      }
    },
    {
      period: "Classical Period",
      year: "400-300 BCE",
      title: "The Civic Duty Era",
      description: "Greek philosophers like Aristotle cement the idea that humans are 'political animals.' Avoiding civic life isn't just antisocial - it's almost inhuman. The 'idiotes' becomes a cautionary tale.",
      icon: "⚖️",
      color: "from-cyan-500 to-teal-500",
      details: {
        context: "Aristotle's 'Politics' argues that anyone who doesn't participate in civic life is either a beast or a god.",
        usage: "The term gains negative connotations - being an 'idiotes' means you're failing at being human.",
        modernEquivalent: "Like being called 'antisocial' or 'selfish' for not voting or engaging with community issues."
      }
    },
    {
      period: "Roman Era",
      year: "100 BCE - 400 CE",
      title: "Latin Makeover",
      description: "Romans borrow the word as 'idiota,' but they're more chill about it. To them, it just means 'ordinary person' or 'non-expert.' The civic judgment softens into simple classification.",
      icon: "🏺",
      color: "from-teal-500 to-green-500",
      details: {
        context: "Roman society was less democratic, so civic participation wasn't as emphasized as in Athens.",
        usage: "More neutral - used to distinguish between experts and laypeople in various fields.",
        modernEquivalent: "Like calling someone a 'layperson' or 'non-specialist' - descriptive, not insulting."
      }
    },
    {
      period: "Medieval Times",
      year: "500-1400 CE",
      title: "The Meaning Drift",
      description: "Medieval scholars start connecting 'not participating in public life' with 'not being educated.' The word begins its slow transformation from civic disengagement to intellectual deficiency.",
      icon: "📜",
      color: "from-green-500 to-yellow-500",
      details: {
        context: "Medieval society valued learning and education, especially among clergy and nobility.",
        usage: "Begins to imply ignorance or lack of education, moving away from its civic origins.",
        modernEquivalent: "Like 'uneducated' or 'ignorant' - starting to become more of an insult."
      }
    },
    {
      period: "Renaissance",
      year: "1400-1600 CE",
      title: "Education Obsession",
      description: "The Renaissance puts education on a pedestal. 'Idiot' becomes synonymous with 'uneducated' and 'lacking wisdom.' The original civic meaning is getting buried under layers of intellectual snobbery.",
      icon: "🎨",
      color: "from-yellow-500 to-orange-500",
      details: {
        context: "Renaissance humanism emphasized learning, art, and intellectual achievement.",
        usage: "Firmly established as meaning 'lacking in learning or intelligence.'",
        modernEquivalent: "Similar to calling someone 'ignorant' or 'unlearned' - definitely an insult now."
      }
    },
    {
      period: "Enlightenment",
      year: "1600-1800 CE",
      title: "Reason Rules Everything",
      description: "The Age of Reason doubles down on intellectual superiority. 'Idiot' now means someone who lacks rational thinking. The civic origins are completely forgotten - it's all about brains now.",
      icon: "🧠",
      color: "from-orange-500 to-red-500",
      details: {
        context: "Enlightenment thinkers valued reason, logic, and scientific thinking above all.",
        usage: "Strongly associated with lack of reasoning ability or rational thought.",
        modernEquivalent: "Like calling someone 'irrational' or 'illogical' - a serious intellectual insult."
      }
    },
    {
      period: "Modern Era",
      year: "1800-Present",
      title: "Complete Transformation",
      description: "Today's 'idiot' has nothing to do with civic engagement. It's just a generic insult for 'foolish person.' The 2,500-year journey from civic duty to stupidity is complete. The Greeks would be confused.",
      icon: "🔄",
      color: "from-red-500 to-purple-500",
      details: {
        context: "Modern usage is completely divorced from political or civic contexts.",
        usage: "Generic insult meaning 'stupid,' 'foolish,' or 'lacking common sense.'",
        modernEquivalent: "Exactly what it means today - a straightforward insult with zero civic implications."
      }
    }
  ];

  function selectPeriod(index) {
    selectedPeriod = selectedPeriod === index ? null : index;
  }

  function goBack() {
    goto('/start');
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPeriod !== null) {
          selectedPeriod = null;
        } else {
          goBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>Complete Timeline - Am I The Idiot?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse"></div>
  </div>

  <!-- Navigation -->
  <div class="relative z-20 p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <button
        on:click={goBack}
        class="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 text-white/80 hover:text-white transition-all duration-300"
      >
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Start
      </button>

      <div class="text-center">
        <h1 class="text-xl sm:text-2xl font-bold text-white">Complete Timeline</h1>
        <p class="text-sm text-white/60">2,500 years of word evolution</p>
      </div>

      <button
        on:click={() => goto('/quiz')}
        class="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-xl rounded-full border border-green-500/30 text-green-300 hover:text-green-200 transition-all duration-300"
      >
        Take Quiz
      </button>
    </div>
  </div>

  <!-- Timeline -->
  <div class="relative z-10 max-w-6xl mx-auto p-4 sm:p-6">
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500"></div>
      
      <!-- Timeline Items -->
      <div class="space-y-8 sm:space-y-12">
        {#each timeline as item, index}
          <div 
            class="relative flex gap-6 sm:gap-8 group cursor-pointer"
            in:fly={{ x: -50, duration: 500, delay: index * 100 }}
            on:click={() => selectPeriod(index)}
          >
            <!-- Timeline Dot -->
            <div class="relative flex-shrink-0">
              <div class="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r {item.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-slate-900">
                {item.icon}
              </div>
              <!-- Glow effect -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-r {item.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
            </div>

            <!-- Content -->
            <div class="flex-1 pb-8">
              <div class="bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:scale-[1.02]">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <div class="text-xs sm:text-sm text-white/60 mb-1 font-medium">{item.period}</div>
                    <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <div class="text-sm text-white/80 font-mono bg-white/10 px-2 py-1 rounded inline-block">{item.year}</div>
                  </div>
                  <div class="mt-2 sm:mt-0">
                    <div class="text-2xl sm:text-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                      {selectedPeriod === index ? '📖' : '👆'}
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                  {item.description}
                </p>

                <!-- Expand indicator -->
                <div class="text-xs text-white/50 flex items-center gap-2">
                  <span>Click to {selectedPeriod === index ? 'collapse' : 'expand'}</span>
                  <svg class="w-4 h-4 transition-transform duration-300 {selectedPeriod === index ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>

                <!-- Expanded Details -->
                {#if selectedPeriod === index}
                  <div in:fly={{ y: 20, duration: 300 }} class="mt-6 space-y-4 border-t border-white/10 pt-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 class="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <span class="text-lg">🏛️</span>
                          Historical Context
                        </h4>
                        <p class="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {item.details.context}
                        </p>
                      </div>
                      
                      <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 class="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <span class="text-lg">💬</span>
                          How It Was Used
                        </h4>
                        <p class="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {item.details.usage}
                        </p>
                      </div>
                      
                      <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 class="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <span class="text-lg">🔄</span>
                          Modern Equivalent
                        </h4>
                        <p class="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {item.details.modernEquivalent}
                        </p>
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Summary -->
    <div class="mt-12 text-center" in:fade={{ duration: 800, delay: 1000 }}>
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 max-w-4xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">The Journey Complete</h2>
        <p class="text-lg text-white/80 leading-relaxed mb-6">
          From ancient Greek civic duty to modern-day insult - "idiot" has traveled further than most words ever do. 
          It's a perfect example of how language evolves, societies change, and meanings get completely flipped over time.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            on:click={() => goto('/learn')}
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            Interactive Journey
          </button>
          <button
            on:click={() => goto('/crisis')}
            class="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            Modern Crisis
          </button>
          <button
            on:click={() => goto('/quiz')}
            class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            Test Knowledge
          </button>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="mt-8 text-center text-sm text-white/40">
      <p>Click any timeline item to explore details • Press ESC to go back</p>
    </div>
  </div>
</div>