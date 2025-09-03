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

      <!-- Path Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
        
        <!-- Learn Path -->
        <div class="group relative" in:fly={{ y: 30, duration: 800, delay: 400 }}>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
            <div class="text-4xl mb-4">🏛️</div>
            <h3 class="text-2xl font-bold text-white mb-4">Learn the History</h3>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Journey through ancient Greece and discover the fascinating evolution of language and democracy
            </p>
            <button
              on:click={() => goto('/learn')}
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
            >
              Start Learning →
            </button>
          </div>
        </div>

        <!-- Quiz Path -->
        <div class="group relative" in:fly={{ y: 30, duration: 800, delay: 600 }}>
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-2xl font-bold text-white mb-4">Take the Quiz</h3>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Test your knowledge and see if you're truly the "idiot" in the ancient Greek sense
            </p>
            <button
              on:click={() => goto('/quiz')}
              class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
            >
              Start Quiz →
            </button>
          </div>
        </div>

        <!-- Fun Facts Path -->
        <div class="group relative" in:fly={{ y: 30, duration: 800, delay: 800 }}>
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
            <div class="text-4xl mb-4">💡</div>
            <h3 class="text-2xl font-bold text-white mb-4">Fun Facts</h3>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Discover more fascinating etymology and language evolution stories
            </p>
            <button
              on:click={() => goto('/learn')}
              class="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
            >
              Explore More →
            </button>
          </div>
        </div>
      </div>



      <!-- Greek Quote -->
      <div class="text-center mt-16" in:fade={{ duration: 800, delay: 1200 }}>
        <blockquote class="text-lg md:text-xl text-slate-400 italic max-w-2xl mx-auto">
          "The unexamined life is not worth living"
        </blockquote>
        <cite class="text-amber-400 text-sm mt-2 block">— Socrates</cite>
      </div>
    </div>
  </div>
</div>

