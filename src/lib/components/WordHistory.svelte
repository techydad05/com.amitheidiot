<script>
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let show = false;
  export let onClose = () => {};
  export let onStartQuiz = () => {};

  const dispatch = createEventDispatcher();

  const timeline = [
    {
      period: "5th Century BCE",
      title: "Ancient Greece",
      description: "ἰδιώτης (idiotes) - A private citizen who focuses on personal affairs rather than public service",
      icon: "🏛️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      period: "Classical Period",
      title: "Civic Duty",
      description: "Greeks believed participation in democracy was essential. Those who avoided it were seen as selfish",
      icon: "⚖️",
      color: "from-cyan-500 to-teal-500"
    },
    {
      period: "Roman Era",
      title: "Latin Adoption",
      description: "Romans adopted the word as 'idiota' - maintaining the meaning of 'ordinary person'",
      icon: "🏺",
      color: "from-teal-500 to-green-500"
    },
    {
      period: "Medieval Times",
      title: "Meaning Shift",
      description: "The word began to imply ignorance and lack of learning, moving away from civic context",
      icon: "📜",
      color: "from-green-500 to-yellow-500"
    },
    {
      period: "Renaissance",
      title: "Intellectual Focus",
      description: "Emphasis on education made 'idiot' synonymous with lack of knowledge or wisdom",
      icon: "🎨",
      color: "from-yellow-500 to-orange-500"
    },
    {
      period: "Modern Era",
      title: "Current Usage",
      description: "Today it simply means 'foolish person' - completely divorced from its civic origins",
      icon: "🔄",
      color: "from-orange-500 to-red-500"
    }
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
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Complete Word History</h2>
            <p class="text-sm sm:text-base text-white/60">The evolution of 'idiot' through the ages</p>
          </div>
          <button
            on:click={handleClose}
            class="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Timeline -->
      <div class="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
        <div class="space-y-6 sm:space-y-8">
          {#each timeline as item, index}
            <div class="flex gap-4 sm:gap-6 group">
              <!-- Timeline Line -->
              <div class="flex flex-col items-center flex-shrink-0">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r {item.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                  {item.icon}
                </div>
                {#if index < timeline.length - 1}
                  <div class="w-0.5 h-12 sm:h-16 bg-gradient-to-b from-white/30 to-transparent mt-3 sm:mt-4"></div>
                {/if}
              </div>

              <!-- Content -->
              <div class="flex-1 pb-6 sm:pb-8">
                <div class="bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 transition-all duration-300 group-hover:border-white/20">
                  <div class="text-xs sm:text-sm text-white/60 mb-2 font-medium">{item.period}</div>
                  <h3 class="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                  <p class="text-sm sm:text-base text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-white/10 bg-white/5">
        <div class="flex items-center justify-between">
          <div class="text-white/60 text-sm">
            From civic duty to modern insult - quite a journey!
          </div>
          <div class="flex gap-3">
            <button
              on:click={handleClose}
              class="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 text-white/80 hover:text-white transition-all duration-300"
            >
              Close
            </button>
            <button
              on:click={handleStartQuiz}
              class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 rounded-xl text-white font-semibold transition-all duration-300"
            >
              Test Your Knowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}