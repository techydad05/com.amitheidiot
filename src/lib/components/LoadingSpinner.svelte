<script>
  export let size = 'md'; // sm, md, lg
  export let color = 'blue'; // blue, purple, green, red, white
  export let text = '';

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    white: 'border-white',
  };
</script>

<div class="flex flex-col items-center justify-center gap-4">
  <!-- Enhanced spinner with multiple rings -->
  <div class="relative">
    <!-- Outer ring -->
    <div class="{sizes[size]} border-4 {colors[color]} rounded-full border-opacity-20"></div>

    <!-- Spinning ring -->
    <div
      class="absolute inset-0 {sizes[size]} border-4 border-transparent {colors[
        color
      ]} animate-spin rounded-full border-t-current"
    ></div>

    <!-- Inner pulse -->
    <div
      class="pulse-smooth absolute inset-2 rounded-full bg-gradient-to-br from-current to-transparent opacity-20"
    ></div>
  </div>

  {#if text}
    <div class="fade-in-up text-sm font-medium text-white/80">
      {text}
    </div>
  {/if}
</div>

<style>
  /* Custom spinner animation */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
