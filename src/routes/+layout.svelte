<script>
	import '../app.css';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	// Initialize Skeleton stores
	initializeStores();

	// Initialize popup utility
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerStore = getDrawerStore();

	function drawerOpen() {
		drawerStore.open();
	}

	// Initialize theme on mount
	import { onMount } from 'svelte';
	
	onMount(() => {
		const theme = localStorage.getItem('theme') || 'dark';
		document.documentElement.classList.toggle('dark', theme === 'dark');
	});
</script>

<!-- Drawer -->
<Drawer>
	<nav class="list-nav p-4">
		<ul>
			<li><a href="/" class="flex items-center space-x-2"><span>🏠</span><span>Home</span></a></li>
			<li><a href="/results" class="flex items-center space-x-2"><span>📊</span><span>Results</span></a></li>
		</ul>
	</nav>
</Drawer>

<!-- Cool Light/Dark Toggle - Fixed Position -->
<div class="fixed top-4 right-4 z-50">
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
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}

	.theme-toggle-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	.theme-toggle-btn:active {
		transform: scale(0.95);
	}

	.sun-moon-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.sun, .moon {
		position: absolute;
		font-size: 24px;
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateY(-2px);
	}

	.sun {
		opacity: 1;
		transform: translateY(-2px) rotate(0deg) scale(1);
	}

	.moon {
		opacity: 0;
		transform: translateY(-2px) rotate(180deg) scale(0.5);
	}

	/* Dark mode styles */
	:global(.dark) .theme-toggle-btn {
		background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
	}

	:global(.dark) .sun {
		opacity: 0;
		transform: translateY(-2px) rotate(-180deg) scale(0.5);
	}

	:global(.dark) .moon {
		opacity: 1;
		transform: translateY(-2px) rotate(0deg) scale(1);
	}

	/* Pulse animation on hover */
	.theme-toggle-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		background: inherit;
		opacity: 0;
		transform: scale(1);
		transition: all 0.3s ease;
	}

	.theme-toggle-btn:hover::before {
		opacity: 0.3;
		transform: scale(1.2);
	}

	/* Ripple effect */
	.theme-toggle-btn::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		transform: translate(-50%, -50%);
		transition: width 0.3s ease, height 0.3s ease;
	}

	.theme-toggle-btn:active::after {
		width: 60px;
		height: 60px;
	}
</style>
