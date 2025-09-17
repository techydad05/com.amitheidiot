<script>
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount, afterUpdate } from 'svelte';
  import { gsap } from 'gsap';

  export let show = true;

  let selectedPeriod = null;
  let timelineContainer = null;
  let timelineItems;

  const timeline = [
    {
      period: '5th Century BCE',
      year: '~450 BCE',
      title: "Birth of 'Idiotes'",
      description:
        "In the bustling agora of Athens, a new word emerges: ἰδιώτης (idiotes). It simply means 'private person' - someone who minds their own business instead of participating in the democratic process.",
      icon: '🏛️',
      color: 'from-blue-500 to-cyan-500',
      image: '/greek-assembly.webp',
      details: {
        context:
          "Athens was the world's first democracy, and civic participation was considered essential for society's wellbeing.",
        usage:
          'Used neutrally to describe private citizens, but with subtle disapproval from civic-minded Greeks.',
        modernEquivalent:
          "Like calling someone 'politically disengaged' today - not necessarily an insult, but not a compliment either.",
      },
    },
    {
      period: 'Classical Period',
      year: '400-300 BCE',
      title: 'The Civic Duty Era',
      description:
        "Greek philosophers like Aristotle cement the idea that humans are 'political animals.' Avoiding civic life isn't just antisocial - it's almost inhuman. The 'idiotes' becomes a cautionary tale.",
      icon: '⚖️',
      color: 'from-cyan-500 to-teal-500',
      image: '/democracy_greek_debating.mp4',
      details: {
        context:
          "Aristotle's 'Politics' argues that anyone who doesn't participate in civic life is either a beast or a god.",
        usage:
          "The term gains negative connotations - being an 'idiotes' means you're failing at being human.",
        modernEquivalent:
          "Like being called 'antisocial' or 'selfish' for not voting or engaging with community issues.",
      },
    },
    {
      period: 'Roman Era',
      year: '100 BCE - 400 CE',
      title: 'Latin Makeover',
      description:
        "Romans borrow the word as 'idiota,' but they're more chill about it. To them, it just means 'ordinary person' or 'non-expert.' The civic judgment softens into simple classification.",
      icon: '🏺',
      color: 'from-teal-500 to-green-500',
      image: '/public-forum.webp',
      details: {
        context:
          "Roman society was less democratic, so civic participation wasn't as emphasized as in Athens.",
        usage:
          'More neutral - used to distinguish between experts and laypeople in various fields.',
        modernEquivalent:
          "Like calling someone a 'layperson' or 'non-specialist' - descriptive, not insulting.",
      },
    },
    {
      period: 'Medieval Times',
      year: '500-1400 CE',
      title: 'The Meaning Drift',
      description:
        "Medieval scholars start connecting 'not participating in public life' with 'not being educated.' The word begins its slow transformation from civic disengagement to intellectual deficiency.",
      icon: '📜',
      color: 'from-green-500 to-yellow-500',
      image: '/language-evolution.webp',
      details: {
        context:
          'Medieval society valued learning and education, especially among clergy and nobility.',
        usage:
          'Begins to imply ignorance or lack of education, moving away from its civic origins.',
        modernEquivalent: "Like 'uneducated' or 'ignorant' - starting to become more of an insult.",
      },
    },
    {
      period: 'Modern Era',
      year: '1800-Present',
      title: 'Complete Transformation',
      description:
        "Today's 'idiot' has nothing to do with civic engagement. It's just a generic insult for 'foolish person.' The 2,500-year journey from civic duty to stupidity is complete. The Greeks would be confused.",
      icon: '🔄',
      color: 'from-red-500 to-purple-500',
      image: '/modern-democracy.webp',
      details: {
        context: 'Modern usage is completely divorced from political or civic contexts.',
        usage: "Generic insult meaning 'stupid,' 'foolish,' or 'lacking common sense.'",
        modernEquivalent:
          'Exactly what it means today - a straightforward insult with zero civic implications.',
      },
    },
    {
      period: 'The Modern Crisis',
      year: '2024',
      title: "The Return of the 'Idiotes'?",
      description:
        "Ironically, in an age of unprecedented connection, we face a new crisis of 'idiocy.' Disengagement, misinformation, and political apathy are rampant. Are we the modern 'idiotes' the Greeks warned us about?",
      icon: '💥',
      color: 'from-purple-500 to-pink-500',
      image: '/modern-democracy.webp', // fallback to existing image
      details: {
        context:
          'Social media echo chambers and political polarization discourage meaningful civic discourse.',
        usage:
          "The term 'idiot' is used freely, but the original concept of the 'private citizen' who harms democracy through inaction is more relevant than ever.",
        modernEquivalent:
          "The person who gets their news from memes, doesn't vote, and believes all politicians are the same.",
      },
    },
  ];

  function selectPeriod(index) {
    selectedPeriod = selectedPeriod === index ? null : index;
  }

  function goBack() {
    goto('/reveal');
  }

  function animateIn() {
    // Set initial state immediately to prevent layout shifts
    gsap.set(timelineItems, { opacity: 0, y: 30 });
    
    // Animate in with smaller y offset to prevent large gaps
    gsap.to(timelineItems, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'transform' // Clear transforms after animation
    });
  }

  function animateOut() {
    gsap.to(timelineItems, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.in',
    });
  }

  onMount(() => {
    // Initialize timeline items immediately to prevent layout issues
    const initializeTimeline = () => {
      timelineItems = gsap.utils.toArray('.timeline-item');
      if (show && timelineItems.length > 0) {
        // Immediately hide items to prevent flash
        gsap.set(timelineItems, { opacity: 0, y: 30 });
        // Start animation after a brief delay for smooth loading
        setTimeout(() => animateIn(), 50);
      } else if (timelineItems.length === 0) {
        // Retry if items haven't loaded yet
        setTimeout(initializeTimeline, 50);
      }
    };
    
    initializeTimeline();

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

  afterUpdate(() => {
    // Only animate in if we have timeline items and show is true
    if (show && timelineItems && timelineItems.length > 0) {
      // Check if items are already visible to avoid re-animating
      const firstItem = timelineItems[0];
      if (firstItem && gsap.getProperty(firstItem, 'opacity') === 0) {
        animateIn();
      }
    }
  });
</script>


<svelte:head>
  <title>Complete Timeline - Am I The Idiot?</title>
</svelte:head>

<div
  class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
>
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-500/5 to-purple-500/5"
    ></div>
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
        <span class="hidden sm:inline">Back to Reveal</span>
        <span class="sm:hidden">Back</span>
      </button>

      <div class="text-center">
        <h1 class="text-lg font-bold text-white sm:text-xl lg:text-2xl">Complete Timeline</h1>
        <p class="text-xs text-white/60 sm:text-sm">2,500 years of word evolution</p>
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

  <!-- Timeline -->
  <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-8" bind:this={timelineContainer}>
    <div class="relative pt-4">
      <!-- Timeline Line -->
      <div
        class="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 sm:left-8"
      ></div>

      <!-- Timeline Items -->
      <div class="space-y-8 sm:space-y-12">
        {#each timeline as item, index}
          <button
            class="timeline-item group relative flex cursor-pointer gap-6 sm:gap-8 w-full text-left will-change-transform"
            on:click={() => selectPeriod(index)}
            tabindex="0"
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectPeriod(index);
              }
            }}
            aria-expanded={selectedPeriod === index}
            aria-label={`Toggle details for ${item.title}`}
          >
            <!-- Timeline Dot -->
            <div class="relative flex-shrink-0">
              <div
                class="h-8 w-8 rounded-full bg-gradient-to-r sm:h-12 sm:w-12 {item.color} flex items-center justify-center border-4 border-slate-900 text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 sm:text-2xl"
              >
                {item.icon}
              </div>
              <!-- Glow effect -->
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-r {item.color} opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30"
              ></div>
            </div>

            <!-- Content -->
            <div class="flex-1 pb-8">
              <div
                class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 group-hover:scale-[1.02] group-hover:border-white/20 sm:rounded-3xl sm:p-6"
              >
                <!-- Header -->
                <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div class="mb-1 text-xs font-medium text-white/60 sm:text-sm">
                      {item.period}
                    </div>
                    <h3 class="mb-2 text-lg font-bold text-white sm:text-xl lg:text-2xl">
                      {item.title}
                    </h3>
                    <div
                      class="inline-block rounded bg-white/10 px-2 py-1 font-mono text-sm text-white/80"
                    >
                      {item.year}
                    </div>
                  </div>
                  <div class="mt-2 sm:mt-0">
                    <div
                      class="text-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100 sm:text-3xl"
                    >
                      {selectedPeriod === index ? '📖' : '👆'}
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <p class="mb-4 text-sm leading-relaxed text-white/80 sm:text-base">
                  {item.description}
                </p>

                {#if item.image.endsWith('.mp4')}
                  <video 
                    src={item.image} 
                    autoplay 
                    loop 
                    muted 
                    class="my-4 rounded-lg w-full h-auto"
                    on:error={(e) => {
                      console.warn('Failed to load video:', item.image);
                      e.target.style.display = 'none';
                    }}
                  ></video>
                {:else}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    class="my-4 rounded-lg w-full h-auto" 
                    on:error={(e) => {
                      console.warn('Failed to load image:', item.image);
                      e.target.style.display = 'none';
                    }}
                  />
                {/if}

                <!-- Expand indicator -->
                <div class="flex items-center gap-2 text-xs text-white/50">
                  <span>Click to {selectedPeriod === index ? 'collapse' : 'expand'}</span>
                  <svg
                    class="h-4 w-4 transition-transform duration-300 {selectedPeriod === index
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>

                <!-- Expanded Details -->
                {#if selectedPeriod === index}
                  <div
                    in:fly={{ y: 20, duration: 300 }}
                    class="mt-6 space-y-4 border-t border-white/10 pt-6"
                  >
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
                        <h4 class="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                          <span class="text-lg">🏛️</span>
                          Historical Context
                        </h4>
                        <p class="text-xs leading-relaxed text-white/70 sm:text-sm">
                          {item.details.context}
                        </p>
                      </div>

                      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
                        <h4 class="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                          <span class="text-lg">💬</span>
                          How It Was Used
                        </h4>
                        <p class="text-xs leading-relaxed text-white/70 sm:text-sm">
                          {item.details.usage}
                        </p>
                      </div>

                      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
                        <h4 class="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                          <span class="text-lg">🔄</span>
                          Modern Equivalent
                        </h4>
                        <p class="text-xs leading-relaxed text-white/70 sm:text-sm">
                          {item.details.modernEquivalent}
                        </p>
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Summary -->
    <div class="mt-12 text-center" in:fade={{ duration: 800, delay: 1000 }}>
      <div
        class="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 backdrop-blur-xl sm:p-8"
      >
        <h2 class="mb-4 text-2xl font-bold text-white sm:text-3xl">Are We The Modern 'Idiotes'?</h2>
        <p class="mb-6 text-lg leading-relaxed text-white/80">
          From ancient Greek civic duty to modern-day insult - "idiot" has traveled further than
          most words ever do. It's a perfect example of how language evolves, societies change, and
          meanings get completely flipped over time. Now that you know the history, it's time to test your knowledge.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            on:click={() => goto('/crisis')}
            class="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-orange-600"
          >
            Explore the Modern Crisis
          </button>
          <button
            on:click={() => goto('/quiz')}
            class="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-600"
          >
            Test Your Knowledge
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

<style>
  /* Prevent layout shifts during GSAP animations */
  :global(.timeline-item) {
    transform-origin: center top;
  }
  
  /* Ensure proper positioning for timeline container */
  .timeline-container {
    position: relative;
    overflow: visible;
  }
  
  /* Smooth transitions for expanded content */
  :global(.timeline-item .expanded-content) {
    will-change: height, opacity;
  }
</style>
