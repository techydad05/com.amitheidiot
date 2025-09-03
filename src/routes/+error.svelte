<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>Page Not Found - Am I The Idiot?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-6">
  <div class="text-center">
    <div class="text-9xl mb-8">🤔</div>
    
    <h1 class="text-6xl font-bold text-white mb-4">404</h1>
    
    <h2 class="text-2xl text-white/80 mb-8">
      Well, this is awkward...
    </h2>
    
    <p class="text-xl text-white/60 mb-12 max-w-md mx-auto">
      Looks like you found a page that doesn't exist. Maybe you're the idiot after all? 😉
    </p>
    
    <button
      on:click={() => goto('/')}
      class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 rounded-2xl text-white font-bold transition-all duration-300"
    >
      Go Home
    </button>
  </div>
</div>