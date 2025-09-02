<script>
  import { fly, fade } from 'svelte/transition';

  export let show = false;
  export let onClose;
  export let onStartQuiz;

  const learnMoreContent = [
    {
      title: 'Origins in Ancient Greece',
      text: "The word 'idiot' comes from the ancient Greek 'ἰδιώτης' (idiōtēs), which originally meant a private citizen, someone who did not participate in public life. In ancient Athens, this term wasn't necessarily derogatory - it simply distinguished private individuals from those holding public office or engaging in civic duties.",
      highlight: ['ἰδιώτης', 'idiōtēs', 'private citizen', 'public office', 'civic duties'],
      size: 'text-xl md:text-3xl',
      funFact:
        "In ancient Athens, citizens were expected to participate in the democratic process. Those who didn't were viewed with suspicion!",
      icon: '🏛️',
      image: '/greek-assembly.webp',
    },
    {
      title: 'Private vs Public Life',
      text: 'In ancient Greek society, active participation in public affairs was highly valued. Those who focused solely on private matters were seen as not fulfilling their civic duty. The concept of citizenship was intrinsically linked to participation in public discourse, political decision-making, and community service.',
      highlight: ['public affairs', 'civic duty', 'citizenship', 'public discourse'],
      size: 'text-lg md:text-2xl',
      funFact:
        "The Athenian democracy was so participatory that they even had a process called 'ostracism' where citizens could vote to exile powerful individuals!",
      icon: '⚖️',
      image: '/public-forum.webp',
    },
    {
      title: 'Evolution of Meaning',
      text: 'Over time, the meaning shifted from describing someone uninvolved in public affairs to its modern usage, showing how language evolves with society. During the Middle Ages and Renaissance, the term began to take on more negative connotations, eventually becoming associated with a lack of education or intelligence rather than just civic non-participation.',
      highlight: ['evolved', 'modern usage', 'Middle Ages', 'Renaissance', 'negative connotations'],
      size: 'text-lg md:text-2xl',
      funFact:
        "The transformation of 'idiot' from 'private citizen' to its modern meaning took over 2000 years of language evolution!",
      icon: '🔄',
      image: '/language-evolution.webp',
      imageClass: 'evolution-image',
    },
    {
      title: 'Modern Democracy',
      text: "Today, the word has lost its connection to civic participation, but the original meaning raises important questions about democracy and citizenship. In an era of declining civic engagement and increasing political polarization, perhaps it's time to reconsider what it truly means to be an engaged citizen.",
      highlight: [
        'civic participation',
        'democracy',
        'citizenship',
        'civic engagement',
        'political polarization',
      ],
      size: 'text-lg md:text-2xl',
      funFact:
        'Voter turnout in ancient Athens was often over 75%, while modern democracies frequently struggle to reach 50%!',
      icon: '🗽',
      image: '/modern-democracy.webp',
    },
  ];

  let openFacts = new Set();

  function toggleFact(fact) {
    if (openFacts.has(fact)) {
      openFacts.delete(fact);
    } else {
      openFacts.add(fact);
    }
    openFacts = openFacts; // Trigger reactivity
  }

  function formatLearnMoreText(section) {
    let text = section.text;
    section.highlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      text = text.replace(regex, '<span class="text-primary-500 font-semibold">$1</span>');
    });
    return text;
  }
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-surface-backdrop-token backdrop-blur-sm"
  transition:fade
  role="dialog"
  aria-modal="true"
  on:click|self={onClose}
  on:keydown={(e) => e.key === 'Escape' && onClose()}
>
  <!-- Full-screen container -->
  <div class="flex h-full w-full flex-col md:p-4 lg:p-6">
    <!-- Main content container -->
    <div
      class="relative flex h-full w-full flex-col overflow-hidden variant-filled-surface shadow-xl md:rounded-container-token md:max-h-[90vh]"
    >
      <!-- Epic Cinematic Header with Video Background -->
      <div class="relative flex-none overflow-hidden h-64 md:h-80 lg:h-96">
        <!-- Video Background -->
        <div class="absolute inset-0">
          <video
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
          >
            <source src="/democracy_greek_debating.mp4" type="video/mp4" />
            <!-- Fallback image if video doesn't load -->
            <div class="w-full h-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-700"></div>
          </video>
          
          <!-- Cinematic Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>
          
          <!-- Animated Particles -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="particle particle-1">✨</div>
            <div class="particle particle-2">🏛️</div>
            <div class="particle particle-3">📜</div>
            <div class="particle particle-4">⚖️</div>
            <div class="particle particle-5">🌿</div>
            <div class="particle particle-6">✨</div>
          </div>
        </div>

        <!-- Close button with enhanced styling -->
        <button
          class="absolute right-4 top-4 z-20 btn-icon btn-icon-lg bg-black/50 hover:bg-black/70 text-white border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 backdrop-blur-sm"
          on:click={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Epic Title with Cinematic Effects -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <!-- Subtitle -->
          <div class="text-amber-300 text-sm md:text-lg font-semibold mb-2 tracking-widest uppercase opacity-90">
            From Ancient Agora to Modern Democracy
          </div>
          
          <!-- Main Title -->
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            <span class="inline-block animate-fade-in-up">The</span>
            <span class="inline-block animate-fade-in-up delay-200">History</span>
            <span class="inline-block animate-fade-in-up delay-400">of</span>
            <span class="inline-block animate-fade-in-up delay-600 text-amber-400">"Idiot"</span>
          </h2>
          
          <!-- Greek Translation -->
          <div class="text-xl md:text-2xl text-amber-200 font-medium italic mb-4 opacity-90">
            ἡ ἱστορία τοῦ ἰδιώτου
          </div>
          
          <!-- Subtitle Description -->
          <div class="text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed opacity-90">
            Journey through time to discover how a simple Greek word for "private citizen" 
            became one of our most misunderstood terms
          </div>
          
          <!-- Scroll Indicator -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="text-amber-300 text-2xl">⬇️</div>
            <div class="text-amber-200 text-sm mt-1">Scroll to explore</div>
          </div>
        </div>
        
        <!-- Ancient Greek Border -->
        <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 opacity-80"></div>
      </div>

      <!-- Scrollable content area -->
      <div class="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6 lg:p-8">
        <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {#each learnMoreContent as section}
            <!-- Card with full height on mobile -->
            <div
              class="card variant-filled-surface h-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <!-- Image section with larger height on desktop -->
              <div
                class="relative aspect-[4/3] w-full overflow-hidden bg-surface-300-600-token {section.imageClass || ''}"
                style="background-image: url({section.image});
                       background-size: cover;
                       background-position: {section.imageClass === 'evolution-image' ? 'top' : 'center'};
                       background-repeat: no-repeat;
                       transition: background-position 0.5s ease-in-out;"
                role="img"
                aria-label={section.title}
              ></div>

              <!-- Content section -->
              <div class="flex h-full flex-col p-4 md:p-6">
                <!-- Header with icon -->
                <div class="mb-6 flex items-center gap-4">
                  <span class="text-4xl md:text-5xl">{section.icon}</span>
                  <h3 class="text-2xl font-bold text-secondary-500 md:text-3xl lg:text-4xl">
                    {section.title}
                  </h3>
                </div>

                <!-- Main text -->
                <p class="mb-6 text-base leading-relaxed md:text-lg lg:text-xl">
                  {@html formatLearnMoreText(section)}
                </p>

                <!-- Fun fact section with improved visibility -->
                <div class="mt-auto space-y-4">
                  {#if openFacts.has(section)}
                    <div
                      class="card variant-filled-primary p-4 shadow-lg md:p-6"
                      in:fly={{ y: 20, duration: 300 }}
                      out:fade
                    >
                      <p class="text-base font-medium md:text-lg">
                        <span class="font-bold">Fun Fact:</span>
                        {section.funFact}
                      </p>
                    </div>
                  {/if}
                  <button
                    class="btn variant-filled-primary w-full"
                    on:click={() => toggleFact(section)}
                  >
                    {openFacts.has(section) ? 'Hide Fun Fact' : 'Show Fun Fact'}
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Footer with navigation -->
      <div class="flex-none border-t border-surface-300-600-token p-4 md:p-6">
        <div class="mx-auto max-w-7xl">
          <button
            class="btn variant-ghost-primary w-full md:w-auto"
            on:click={onClose}
          >
            Back to Home
          </button>
          <button
            class="btn variant-filled-secondary mt-4 w-full md:ml-4 md:mt-0 md:w-auto"
            on:click={onStartQuiz}
          >
            Take the Quiz →
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .evolution-image:hover {
    background-position: center !important;
  }

  /* Cinematic Animations */
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }

  .delay-200 {
    animation-delay: 0.2s;
  }

  .delay-400 {
    animation-delay: 0.4s;
  }

  .delay-600 {
    animation-delay: 0.6s;
  }

  /* Floating Particles */
  .particle {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0.6;
    pointer-events: none;
    animation: float-particle 8s ease-in-out infinite;
  }

  .particle-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .particle-2 {
    top: 60%;
    left: 85%;
    animation-delay: 1s;
  }

  .particle-3 {
    top: 30%;
    right: 15%;
    animation-delay: 2s;
  }

  .particle-4 {
    bottom: 40%;
    left: 20%;
    animation-delay: 3s;
  }

  .particle-5 {
    top: 70%;
    left: 60%;
    animation-delay: 4s;
  }

  .particle-6 {
    top: 15%;
    left: 70%;
    animation-delay: 5s;
  }

  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(90deg);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-10px) translateX(-15px) rotate(180deg);
      opacity: 0.8;
    }
    75% {
      transform: translateY(-30px) translateX(5px) rotate(270deg);
      opacity: 0.4;
    }
  }

  /* Video Enhancement */
  video {
    filter: sepia(20%) saturate(1.2) contrast(1.1);
    transition: filter 0.3s ease;
  }

  video:hover {
    filter: sepia(10%) saturate(1.4) contrast(1.2);
  }

  /* Enhanced Scroll Indicator */
  @keyframes bounce-glow {
    0%, 100% {
      transform: translateY(0px);
      text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
    }
    50% {
      transform: translateY(-10px);
      text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
    }
  }

  .animate-bounce {
    animation: bounce-glow 2s ease-in-out infinite;
  }
</style>
