<script>
  export let variant = 'primary'; // primary, secondary, success, danger
  export let size = 'md'; // sm, md, lg
  export let href = null;
  export let onClick = null;
  export let disabled = false;
  export let loading = false;
  export let icon = null;
  export let iconPosition = 'left'; // left, right

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 border border-white/20 text-white',
    success:
      'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white',
    danger:
      'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  function handleClick(event) {
    if (disabled || loading) return;
    if (onClick) onClick(event);
  }
</script>

{#if href}
  <a
    {href}
    class="inline-flex items-center justify-center gap-2 {variants[variant]} {sizes[
      size
    ]} smooth-transition hover-lift glow-on-hover relative overflow-hidden rounded-2xl font-semibold backdrop-blur-xl {disabled
      ? 'cursor-not-allowed opacity-50'
      : 'cursor-pointer'}"
    class:pointer-events-none={disabled || loading}
  >
    <span class="relative z-10 flex items-center gap-2">
      {#if icon && iconPosition === 'left'}
        <span class="text-lg">{icon}</span>
      {/if}
      <slot />
      {#if icon && iconPosition === 'right'}
        <span class="smooth-transition text-lg group-hover:translate-x-1">{icon}</span>
      {/if}
      {#if loading}
        <div
          class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        ></div>
      {/if}
    </span>

    <!-- Hover overlay -->
    <div
      class="smooth-transition absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 hover:opacity-100"
    ></div>

    <!-- Ripple effect -->
    <div
      class="smooth-transition absolute inset-0 scale-0 rounded-full bg-white/20 opacity-0 active:scale-100 active:opacity-100"
    ></div>
  </a>
{:else}
  <button
    on:click={handleClick}
    {disabled}
    class="inline-flex items-center justify-center gap-2 {variants[variant]} {sizes[
      size
    ]} smooth-transition hover-lift glow-on-hover relative overflow-hidden rounded-2xl font-semibold backdrop-blur-xl {disabled
      ? 'cursor-not-allowed opacity-50'
      : ''}"
  >
    <span class="relative z-10 flex items-center gap-2">
      {#if icon && iconPosition === 'left'}
        <span class="text-lg">{icon}</span>
      {/if}
      <slot />
      {#if icon && iconPosition === 'right'}
        <span class="smooth-transition text-lg group-hover:translate-x-1">{icon}</span>
      {/if}
      {#if loading}
        <div
          class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        ></div>
      {/if}
    </span>

    <!-- Hover overlay -->
    <div
      class="smooth-transition absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 hover:opacity-100"
    ></div>

    <!-- Ripple effect -->
    <div
      class="smooth-transition absolute inset-0 scale-0 rounded-full bg-white/20 opacity-0 active:scale-100 active:opacity-100"
    ></div>
  </button>
{/if}

<style>
  /* Enhanced button animations */
  :global(.group:hover .group-hover\:translate-x-1) {
    transform: translateX(0.25rem);
  }

  :global(.group:hover .group-hover\:translate-x-2) {
    transform: translateX(0.5rem);
  }
</style>
