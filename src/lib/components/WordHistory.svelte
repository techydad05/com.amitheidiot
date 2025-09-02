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
      <!-- Header section with fixed height -->
      <div class="relative flex-none border-b border-surface-300-600-token p-4 md:p-6">
        <!-- Close button -->
        <button
          class="btn-icon btn-icon-sm variant-filled-surface absolute right-4 top-4 z-10"
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

        <!-- Title -->
        <h2 class="text-center text-3xl font-bold text-primary-500 md:text-5xl lg:text-6xl">
          The History of "Idiot"
        </h2>
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
</style>
