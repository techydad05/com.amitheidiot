<script>
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>Page Not Found - Am I The Idiot?</title>
</svelte:head>

<div
  class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-6"
>
  <div class="text-center">
    <div class="mb-8 text-9xl">🤔</div>

    <h1 class="mb-4 text-6xl font-bold text-white">404</h1>

    <h2 class="mb-8 text-2xl text-white/80">Well, this is awkward...</h2>

    <p class="mx-auto mb-12 max-w-md text-xl text-white/60">
      Looks like you found a page that doesn't exist. Maybe you're the idiot after all? 😉
    </p>

    <button
      on:click={() => goto('/')}
      class="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600"
    >
      Go Home
    </button>
  </div>
</div>
