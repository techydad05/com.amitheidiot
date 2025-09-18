<script>
  import '../app.css';
  import { AppShell, Drawer } from '@skeletonlabs/skeleton';
  import { initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  import { onNavigate } from '$app/navigation';

  // Initialize Skeleton stores
  initializeStores();

  // Initialize popup utility
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  // Initialize theme on mount
  import { onMount } from 'svelte';

  onMount(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<!-- Drawer -->
<Drawer>
  <nav class="list-nav p-4">
    <ul>
      <li><a href="/" class="flex items-center space-x-2"><span>🏠</span><span>Home</span></a></li>
      <li>
        <a href="/results" class="flex items-center space-x-2"
          ><span>📊</span><span>Results</span></a
        >
      </li>
    </ul>
  </nav>
</Drawer>

<!-- Cool Light/Dark Toggle - Fixed Position -->
<div class="fixed right-4 top-4 z-50">
  <button
    class="theme-toggle-btn"
    on:click={() => {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      html.classList.toggle('dark', !isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }}
    aria-label="Toggle theme"
  >
    <div class="sun-moon-container">
      <div class="sun">☀️</div>
      <div class="moon">🌙</div>
    </div>
  </button>
</div>

<!-- App Shell -->
<AppShell>
  <!-- Main Content -->
  <slot />
</AppShell>

<style>
  .theme-toggle-btn {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .theme-toggle-btn:hover {
    transform: scale(1.15) translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
  }

  .theme-toggle-btn:active {
    transform: scale(1.05) translateY(0px);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sun-moon-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .sun,
  .moon {
    position: absolute;
    font-size: 24px;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translateY(-2px);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .sun {
    opacity: 1;
    transform: translateY(-2px) rotate(0deg) scale(1);
  }

  .moon {
    opacity: 0;
    transform: translateY(-2px) rotate(180deg) scale(0.3);
  }

  /* Dark mode styles */
  :global(.dark) .theme-toggle-btn {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }

  :global(.dark) .sun {
    opacity: 0;
    transform: translateY(-2px) rotate(-180deg) scale(0.3);
  }

  :global(.dark) .moon {
    opacity: 1;
    transform: translateY(-2px) rotate(0deg) scale(1);
  }

  /* Enhanced pulse animation on hover */
  .theme-toggle-btn::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(139, 92, 246, 0.3));
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: -1;
  }

  .theme-toggle-btn:hover::before {
    opacity: 1;
    transform: scale(1.1);
    animation: pulseGlow 2s ease-in-out infinite;
  }

  /* Enhanced ripple effect */
  .theme-toggle-btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%);
    transform: translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: none;
  }

  .theme-toggle-btn:active::after {
    width: 80px;
    height: 80px;
    opacity: 0;
  }

  @keyframes pulseGlow {
    0%,
    100% {
      transform: scale(1.1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
</style>
