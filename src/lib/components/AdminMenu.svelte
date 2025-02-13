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
<div
    class="fixed top-0 left-0 w-16 h-16 z-[9999]"
    on:click={handleClick}
/>

{#if show}
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        transition:fade
        on:click|self={() => show = false}
    >
        <div
            class="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            on:click|stopPropagation
        >
            <h2 class="text-2xl font-bold mb-6">Quiz Settings</h2>
            
            <div class="form-control w-full mb-4">
                <label class="label" for="numQuestions">
                    <span class="label-text">Number of Questions</span>
                </label>
                <input
                    type="number"
                    id="numQuestions"
                    bind:value={numQuestions}
                    min="1"
                    max="20"
                    class="input input-bordered w-full"
                />
            </div>

            <div class="form-control w-full mb-6">
                <label class="label" for="timeLimit">
                    <span class="label-text">Time Limit (seconds)</span>
                </label>
                <input
                    type="number"
                    id="timeLimit"
                    bind:value={timeLimit}
                    min="10"
                    max="300"
                    class="input input-bordered w-full"
                />
            </div>

            <div class="form-control w-full mb-6">
                <label class="label" for="theme">
                    <span class="label-text">Theme</span>
                </label>
                <select 
                    class="select select-bordered w-full" 
                    bind:value={currentTheme}
                    on:change={handleThemeChange}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="cupcake">Cupcake</option>
                    <option value="bumblebee">Bumblebee</option>
                    <option value="emerald">Emerald</option>
                    <option value="corporate">Corporate</option>
                    <option value="synthwave">Synthwave</option>
                    <option value="retro">Retro</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="valentine">Valentine</option>
                    <option value="halloween">Halloween</option>
                    <option value="garden">Garden</option>
                    <option value="forest">Forest</option>
                    <option value="aqua">Aqua</option>
                    <option value="lofi">Lo-Fi</option>
                    <option value="pastel">Pastel</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="wireframe">Wireframe</option>
                    <option value="black">Black</option>
                    <option value="luxury">Luxury</option>
                    <option value="dracula">Dracula</option>
                    <option value="cmyk">CMYK</option>
                    <option value="autumn">Autumn</option>
                    <option value="business">Business</option>
                    <option value="acid">Acid</option>
                    <option value="lemonade">Lemonade</option>
                    <option value="night">Night</option>
                    <option value="coffee">Coffee</option>
                    <option value="winter">Winter</option>
                </select>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    class="btn btn-ghost"
                    on:click={() => show = false}
                >
                    Cancel
                </button>
                <button
                    class="btn btn-primary"
                    on:click={saveSettings}
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}
