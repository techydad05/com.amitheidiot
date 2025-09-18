<script>
  import { fade, fly } from 'svelte/transition';
  export let show = false;
  export let onClose = () => {};
  export let onStartQuiz = () => {};

  const timeline = [
    {
      period: '5th Century BCE',
      title: 'Ancient Greece 🏛️',
      description:
        "ἰδιώτης (idiotes) - A private citizen who chose personal life over public service. Think ancient Greek for 'I'm staying home tonight.'",
      icon: '🏛️',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      period: 'Classical Period',
      title: 'Democracy Fanatics ⚖️',
      description:
        'Greeks were OBSESSED with civic participation. Avoiding politics was like skipping the group project - everyone judged you for it.',
      icon: '⚖️',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      period: 'Roman Era',
      title: 'Latin Makeover 🏺',
      description:
        "Romans borrowed the word as 'idiota' but kept it chill - just meant 'ordinary person' or 'not a specialist.' No shade yet!",
      icon: '🏺',
      color: 'from-teal-500 to-green-500',
    },
    {
      period: 'Medieval Times',
      title: 'The Plot Thickens 📜',
      description:
        "Medieval scholars started connecting 'not participating in public life' with 'not being educated.' The meaning began its dark turn...",
      icon: '📜',
      color: 'from-green-500 to-yellow-500',
    },
    {
      period: 'Renaissance',
      title: 'Education Obsession 🎨',
      description:
        "Renaissance = education everything! 'Idiot' became synonymous with 'uneducated' and 'lacking wisdom.' The civic meaning was getting buried.",
      icon: '🎨',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      period: 'Modern Era',
      title: 'Complete Transformation 🔄',
      description:
        "Today's 'idiot' = foolish person. The original civic meaning? Completely forgotten! It's like the word had amnesia about its own history.",
      icon: '🔄',
      color: 'from-orange-500 to-red-500',
    },
  ];

  function handleClose() {
    show = false;
    onClose();
  }

  function handleStartQuiz() {
    show = false;
    onStartQuiz();
  }
</script>

{#if show}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    <div
      class="max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-900 to-slate-800 sm:max-h-[90vh] sm:rounded-3xl"
      in:fly={{ y: 50, duration: 400 }}
      out:fly={{ y: -50, duration: 200 }}
    >
      <!-- Header -->
      <div class="border-b border-white/10 p-4 sm:p-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="mb-1 text-xl font-bold text-white sm:mb-2 sm:text-2xl md:text-3xl">
              Complete Word History
            </h2>
            <p class="text-sm text-white/60 sm:text-base">
              The evolution of 'idiot' through the ages
            </p>
          </div>
          <button
            on:click={handleClose}
            class="flex-shrink-0 rounded-full p-2 transition-colors duration-200 hover:bg-white/10"
          >
            <svg
              class="h-5 w-5 text-white/60 hover:text-white sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Timeline -->
      <div class="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
        <div class="space-y-6 sm:space-y-8">
          {#each timeline as item, index}
            <div class="group flex gap-4 sm:gap-6">
              <!-- Timeline Line -->
              <div class="flex flex-shrink-0 flex-col items-center">
                <div
                  class="h-10 w-10 rounded-full bg-gradient-to-r sm:h-12 sm:w-12 {item.color} flex items-center justify-center text-xl shadow-lg sm:text-2xl"
                >
                  {item.icon}
                </div>
                {#if index < timeline.length - 1}
                  <div
                    class="mt-3 h-12 w-0.5 bg-gradient-to-b from-white/30 to-transparent sm:mt-4 sm:h-16"
                  ></div>
                {/if}
              </div>

              <!-- Content -->
              <div class="flex-1 pb-6 sm:pb-8">
                <div
                  class="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10 group-hover:border-white/20 sm:rounded-2xl sm:p-6"
                >
                  <div class="mb-2 text-xs font-medium text-white/60 sm:text-sm">{item.period}</div>
                  <h3 class="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl">{item.title}</h3>
                  <p class="text-sm leading-relaxed text-white/80 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-white/10 bg-white/5 p-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-white/60">
            From civic duty to modern insult - quite a journey!
          </div>
          <div class="flex gap-3">
            <button
              on:click={handleClose}
              class="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white/80 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              Close
            </button>
            <button
              on:click={handleStartQuiz}
              class="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg"
            >
              Test Your Knowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
