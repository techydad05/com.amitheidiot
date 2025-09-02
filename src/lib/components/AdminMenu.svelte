<!-- AdminMenu.svelte -->
<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    export let show = false;
    let numQuestions = 3;
    let timeLimit = 60;
    let clickCount = 0;
    let lastClickTime = 0;
    const TRIPLE_CLICK_TIMEOUT = 500; // ms between clicks
    const REQUIRED_SETS = 2; // number of triple-click sets required

    export let settings = { num_questions: 3, time_limit: 60, theme: 'dark' };
    let currentTheme = settings.theme || 'dark';

    import { themeChange } from 'theme-change';

    onMount(() => {
        themeChange(false);
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
    });

    function handleThemeChange(event) {
        currentTheme = event.target.value;
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    $: {
        if (settings) {
            numQuestions = settings.num_questions;
            timeLimit = settings.time_limit;
        }
    }

    async function saveSettings() {
        const formData = new FormData();
        formData.append('num_questions', numQuestions.toString());
        formData.append('time_limit', timeLimit.toString());
        formData.append('theme', currentTheme);
        
        const response = await fetch('?/saveSettings', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            show = false;
            window.location.reload(); // Reload to apply new settings
        } else {
            console.error('Failed to save settings');
        }
    }

    let tripleClickSets = 0;
    let lastTripleClickTime = 0;
    const TRIPLE_CLICK_SET_TIMEOUT = 2000; // ms between sets of triple clicks

    function handleClick() {
        const now = Date.now();
        
        // Reset click count if too much time has passed since last click
        if (now - lastClickTime > TRIPLE_CLICK_TIMEOUT) {
            clickCount = 1;
        } else {
            clickCount++;
            if (clickCount === 3) {
                // One set of triple clicks completed
                tripleClickSets++;
                clickCount = 0;
                
                // Check if we've completed two sets of triple clicks
                if (tripleClickSets === REQUIRED_SETS) {
                    show = !show;
                    tripleClickSets = 0; // Reset for next time
                } else if (now - lastTripleClickTime > TRIPLE_CLICK_SET_TIMEOUT) {
                    // Reset if too much time between triple click sets
                    tripleClickSets = 1;
                }
                
                lastTripleClickTime = now;
            }
        }
        lastClickTime = now;
    }

</script>

<!-- Invisible click area -->
<button
    class="fixed top-0 left-0 w-16 h-16 z-[9999] opacity-0 cursor-default"
    on:click={handleClick}
    aria-label="Admin menu trigger"
></button>

{#if show}
    <div
        class="fixed inset-0 bg-surface-backdrop-token flex items-center justify-center z-50"
        transition:fade
        role="dialog"
        aria-modal="true"
        on:click|self={() => show = false}
        on:keydown={(e) => e.key === 'Escape' && (show = false)}
    >
        <div
            class="card variant-filled-surface p-6 shadow-xl max-w-md w-full mx-4"
            role="document"
        >
            <h2 class="text-2xl font-bold mb-6">Quiz Settings</h2>
            
            <div class="w-full mb-4">
                <label class="label" for="numQuestions">
                    <span class="text-sm font-medium">Number of Questions</span>
                </label>
                <input
                    type="number"
                    id="numQuestions"
                    bind:value={numQuestions}
                    min="1"
                    max="20"
                    class="input variant-form-material w-full"
                />
            </div>

            <div class="w-full mb-6">
                <label class="label" for="timeLimit">
                    <span class="text-sm font-medium">Time Limit (seconds)</span>
                </label>
                <input
                    type="number"
                    id="timeLimit"
                    bind:value={timeLimit}
                    min="10"
                    max="300"
                    class="input variant-form-material w-full"
                />
            </div>

            <div class="w-full mb-6">
                <label class="label" for="theme">
                    <span class="text-sm font-medium">Theme</span>
                </label>
                <select 
                    class="select variant-form-material w-full" 
                    bind:value={currentTheme}
                    on:change={handleThemeChange}
                >
                    <option value="skeleton">Skeleton</option>
                    <option value="wintry">Wintry</option>
                    <option value="modern">Modern</option>
                    <option value="rocket">Rocket</option>
                    <option value="seafoam">Seafoam</option>
                    <option value="vintage">Vintage</option>
                    <option value="sahara">Sahara</option>
                    <option value="hamlindigo">Hamlindigo</option>
                    <option value="gold-nouveau">Gold Nouveau</option>
                    <option value="crimson">Crimson</option>
                </select>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    class="btn variant-ghost-surface"
                    on:click={() => show = false}
                >
                    Cancel
                </button>
                <button
                    class="btn variant-filled-primary"
                    on:click={saveSettings}
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}
