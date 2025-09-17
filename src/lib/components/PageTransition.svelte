<script>
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let key = '';
</script>

{#key key}
  <div 
    in:fly={{ y: 30, duration: 600, easing: quintOut, delay: 100 }}
    out:fly={{ y: -30, duration: 400, easing: quintOut }}
    class="w-full h-full"
  >
    <slot />
  </div>
{/key}