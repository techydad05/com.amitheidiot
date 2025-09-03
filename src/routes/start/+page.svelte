<script>
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';

  function goBack() {
    goto('/');
  }
</script>

<svelte:head>
  <title>Choose Your Path - Am I The Idiot?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
  <!-- Animated Background Elements -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>

  <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-6xl" in:fade={{ duration: 600 }}>
      
      <!-- Back Button -->
      <div class="mb-8">
        <button
          on:click={goBack}
          class="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 text-white/80 hover:text-white transition-all duration-300"
        >
          <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Home
        </button>
      </div>

      <!-- Hero Section -->
      <div class="text-center mb-16" in:fly={{ y: 30, duration: 800, delay: 200 }}>
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-300 text-sm font-medium mb-6">
          <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          From Ancient Athens to Modern Democracy
        </div>
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight px-4">
          <span class="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Choose Your
          </span>
          <br>
          <span class="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Journey
          </span>
        </h1>
        
        <p class="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
          Discover how a simple Greek word for "private citizen" became one of our most misunderstood terms
        </p>
      </div>

      <!-- Main Path Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 px-4">
        
        <!-- Etymology Journey -->
        <div class="group relative" in:fly={{ y: 30, duration: 800, delay: 400 }}>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
            <div class="text-5xl mb-6">🏛️</div>
            <h3 class="text-3xl font-bold text-white mb-4">The Word Journey</h3>
            <p class="text-slate-300 mb-6 leading-relaxed text-lg">
              Follow "idiot" from ancient Athens to your Twitter feed. Spoiler: it's not what you think! 
              Discover how a simple Greek word about civic duty became the ultimate insult.
            </p>
            
            <!-- Mini preview -->
            <div class="bg-blue-500/10 rounded-2xl p-4 mb-6 border border-blue-500/20">
              <div class="text-blue-300 text-sm font-semibold mb-2">🎯 You'll Learn:</div>
              <ul class="text-blue-100 text-sm space-y-1">
                <li>• Why ancient Greeks side-eyed "private citizens"</li>
                <li>• How democracy shaped language (and vice versa)</li>
                <li>• The 2,500-year translation fail that changed everything</li>
              </ul>
            </div>
            
            <button
              on:click={() => goto('/learn')}
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 group-hover:scale-105 text-lg"
            >
              Start the Journey →
            </button>
          </div>
        </div>

        <!-- Modern Crisis -->
        <div class="group relative" in:fly={{ y: 30, duration: 800, delay: 600 }}>
          <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
            <div class="text-5xl mb-6">📉</div>
            <h3 class="text-3xl font-bold text-white mb-4">The Modern Crisis</h3>
            <p class="text-slate-300 mb-6 leading-relaxed text-lg">
              From Reagan to Citizens United: How we accidentally created a nation of "idiotes." 
              The shocking stats about civic engagement that'll make you question everything.
            </p>
            
            <!-- Mini preview -->
            <div class="bg-red-500/10 rounded-2xl p-4 mb-6 border border-red-500/20">
              <div class="text-red-300 text-sm font-semibold mb-2">🚨 Eye-Opening Stats:</div>
              <ul class="text-red-100 text-sm space-y-1">
                <li>• How money in politics broke democracy</li>
                <li>• The Reagan era's lasting impact on civic life</li>
                <li>• Why Americans are becoming "idiotes" again</li>
              </ul>
            </div>
            
            <button
              on:click={() => goto('/crisis')}
              class="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 group-hover:scale-105 text-lg"
            >
              See the Data →
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 px-4" in:fly={{ y: 30, duration: 800, delay: 800 }}>
        
        <!-- Quiz Path -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02]">
            <div class="flex items-center gap-4">
              <div class="text-3xl">⚡</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-2">Quick Quiz</h3>
                <p class="text-slate-300 text-sm">Test your knowledge in 2 minutes</p>
              </div>
              <button
                on:click={() => goto('/quiz')}
                class="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl transition-colors duration-300 font-semibold"
              >
                Start →
              </button>
            </div>
          </div>
        </div>

        <!-- Word History -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02]">
            <div class="flex items-center gap-4">
              <div class="text-3xl">📚</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-2">Full Timeline</h3>
                <p class="text-slate-300 text-sm">Complete word evolution history</p>
              </div>
              <button
                on:click={() => goto('/timeline')}
                class="px-4 py-2 bg-amber-600/80 hover:bg-amber-600 text-white rounded-xl transition-colors duration-300 font-semibold"
              >
                Explore →
              </button>
            </div>
          </div>
        </div>
      </div>



      <!-- Fun Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 px-4" in:fly={{ y: 30, duration: 800, delay: 1000 }}>
        <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
          <div class="text-3xl mb-2">📚</div>
          <div class="text-2xl font-bold text-white mb-1">2,500+</div>
          <div class="text-sm text-white/60">Years of word evolution</div>
        </div>
        
        <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
          <div class="text-3xl mb-2">🏛️</div>
          <div class="text-2xl font-bold text-white mb-1">Ancient</div>
          <div class="text-sm text-white/60">Greek democracy birthplace</div>
        </div>
        
        <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
          <div class="text-3xl mb-2">🤯</div>
          <div class="text-2xl font-bold text-white mb-1">Mind</div>
          <div class="text-sm text-white/60">Blown by this story</div>
        </div>
      </div>

      <!-- Greek Quote -->
      <div class="text-center mt-8" in:fade={{ duration: 800, delay: 1200 }}>
        <blockquote class="text-lg md:text-xl text-slate-400 italic max-w-2xl mx-auto px-4">
          "The unexamined life is not worth living"
        </blockquote>
        <cite class="text-amber-400 text-sm mt-2 block">— Socrates (who definitely wasn't an 'idiotes')</cite>
      </div>
    </div>
  </div>
</div>

