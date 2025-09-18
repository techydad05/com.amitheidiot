<script>
  import { onMount } from 'svelte';
  export let toggleContainer;

  // Responsive text sizes optimized for space filling
  const primarySize = 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl';
  const secondarySize = 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl';
  const tertiarySize = 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl';
  const specialCharSize = 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl';

  let glowingWords = ['idiot', 'polis'];
  let glowPositions = { idiot: { x: 0, y: 0 }, polis: { x: 0, y: 0 } };
  let glowDirections = { idiot: { x: 1, y: 1 }, polis: { x: -1, y: 1 } };

  function updateGlowPositions() {
    for (let word of glowingWords) {
      glowPositions[word].x += glowDirections[word].x * 0.3;
      glowPositions[word].y += glowDirections[word].y * 0.3;

      if (Math.abs(glowPositions[word].x) > 10) {
        glowDirections[word].x *= -1;
      }
      if (Math.abs(glowPositions[word].y) > 10) {
        glowDirections[word].y *= -1;
      }
    }
    glowPositions = glowPositions;
  }

  onMount(() => {
    const interval = setInterval(updateGlowPositions, 50);
    return () => clearInterval(interval);
  });

  const specialWords = [
    { text: 'idiot', size: `${primarySize} font-bold`, rotate: 'rotate-[-3deg]', glow: true },
    {
      text: 'ἰδιώτης',
      size: `${specialCharSize} font-semibold`,
      rotate: 'rotate-[2deg]',
      hasParens: true,
    },
    { text: 'idiōtēs', size: `${specialCharSize}`, rotate: 'rotate-[-2deg]', hasParens: true },
    { text: 'private', size: `${primarySize} font-bold`, rotate: 'rotate-[1deg]' },
    { text: 'public', size: `${primarySize} font-bold`, rotate: 'rotate-[-1deg]' },
    { text: 'affairs', size: `${secondarySize} font-semibold`, rotate: 'rotate-[2deg]' },
    {
      text: 'polis',
      size: `${tertiarySize} font-bold`,
      rotate: 'rotate-[-3deg]',
      hasParens: true,
      glow: true,
    },
    { text: 'citizenship', size: `${secondarySize}`, rotate: 'rotate-[1deg]' },
    { text: 'society', size: `${primarySize} font-semibold`, rotate: 'rotate-[-2deg]' },
    { text: 'Greece', size: `${secondarySize} font-bold`, rotate: 'rotate-[3deg]' },
    { text: 'civic', size: `${tertiarySize} font-semibold`, rotate: 'rotate-[-1deg]' },
    { text: 'duties', size: `${tertiarySize}`, rotate: 'rotate-[2deg]' },
    { text: 'politics', size: `${secondarySize} font-bold`, rotate: 'rotate-[-2deg]' },
    { text: 'governance', size: `${tertiarySize} font-semibold`, rotate: 'rotate-[1deg]' },
  ];

  const fullText = `In ancient Greece, the term "idiot" (ἰδιώτης) (idiōtēs) had a very different meaning from what it does today. It originally referred to a private individual, someone who was not involved in public affairs or the governance of the city-state (polis). The word derives from "idios," meaning "private" or "one's own." An "idiot" in ancient Greek society was essentially a person who focused on their private life and interests, rather than participating in public life, politics, or civic duties. This term carried a negative connotation because the Greeks highly valued active participation in public affairs and viewed it as a key aspect of citizenship and contributing to the common good. Therefore, an "idiot" was seen as someone who was disengaged and uninvolved in the civic and communal responsibilities of society.`;

  /**
   * @param {string} text
   */
  function glowStyle(word) {
    if (!glowingWords.includes(word)) return '';
    const pos = glowPositions[word];
    return `text-shadow: ${pos.x}px ${pos.y}px 15px var(--color-primary)`;
  }

  function applySpecificSizes(
    text,
    defaultSize = 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'
  ) {
    // Split by spaces but preserve parentheses and punctuation
    const tokens = text.split(/(\s+|\(|\)|,)/g);
    const specialWordsMap = new Map(specialWords.map((w) => [w.text.toLowerCase(), w]));
    const rotations = ['rotate-[-1deg]', 'rotate-[1deg]', 'rotate-0'];
    let index = 0;
    /**
     * @type {{ text: string; size: string; rotate: string; hasParens?: undefined; } | { text: string; size: string; rotate: string; hasParens: boolean; } | null | undefined}
     */
    let currentSpecial = null;

    return tokens
      .map((token) => {
        // Handle opening parenthesis
        if (token === '(') {
          const nextToken = tokens[tokens.indexOf(token) + 1];
          if (nextToken) {
            const cleanNextToken = nextToken
              .replace(/[^a-zA-Z0-9\u0370-\u03FF\u1F00-\u1FFF]/g, '')
              .toLowerCase();
            currentSpecial = specialWordsMap.get(cleanNextToken);
            if (currentSpecial?.hasParens) {
              return `<span class="${currentSpecial.size} inline-block">(</span>`;
            }
          }
          return token;
        }

        // Handle closing parenthesis
        if (token === ')') {
          if (currentSpecial?.hasParens) {
            const size = currentSpecial.size;
            currentSpecial = null;
            return `<span class="${size} inline-block">)</span>`;
          }
          return token;
        }

        // If it's whitespace, add more space
        if (/^\s+$/.test(token)) {
          return ' \u00A0'; // Single non-breaking space
        }

        // If it's a comma, add space after it
        if (token === ',') {
          return ', ';
        }

        // Remove quotes and other punctuation for comparison, but keep the original token
        const cleanToken = token
          .replace(/[^a-zA-Z0-9\u0370-\u03FF\u1F00-\u1FFF]/g, '')
          .toLowerCase();
        const special = specialWordsMap.get(cleanToken);
        const size = special?.size || defaultSize;
        const rotate = special?.rotate || rotations[index % rotations.length];
        const glowingStyle = special?.glow ? `style="${glowStyle(cleanToken)}"` : '';

        index++;
        return `<span class="${size} word inline-block transform ${rotate} mx-0.5 sm:mx-1" ${glowingStyle}>${token}</span>`;
      })
      .join('');
  }

  const sizedFullText = applySpecificSizes(
    fullText,
    'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'
  );
</script>

<div
  class="word-container absolute inset-0 flex flex-wrap content-start items-start justify-start p-1 leading-tight opacity-20 sm:p-2 md:p-3 lg:p-4"
>
  {@html sizedFullText}
</div>

<!-- Modern Greek-Inspired Button -->
<div class="relative z-10 flex flex-col items-center">
  <!-- Main Button Container -->
  <div class="modern-button-container group cursor-pointer" on:click={toggleContainer}>
    <!-- Subtle Glow Effect -->
    <div
      class="absolute inset-0 scale-110 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
    ></div>

    <!-- Main Button -->
    <div
      class="relative transform rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] dark:border-white/10 dark:bg-black/20 md:p-12"
    >
      <!-- Subtle Greek Pattern -->
      <div
        class="absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
      ></div>
      <div
        class="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
      ></div>

      <!-- Content -->
      <div class="relative text-center">
        <!-- Minimal Greek Icon -->
        <div
          class="mb-4 text-4xl opacity-60 transition-opacity duration-300 group-hover:opacity-80"
        >
          🏛️
        </div>

        <!-- Main Question -->
        <h1 class="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          <span
            class="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-amber-200 dark:to-white"
          >
            Are You The
          </span>
          <br />
          <span
            class="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text font-black tracking-tight text-transparent transition-all duration-300 group-hover:tracking-wide"
          >
            IDIOT
          </span>
          <span
            class="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-amber-200 dark:to-white"
          >
            ?
          </span>
        </h1>

        <!-- Greek Translation - Subtle -->
        <div
          class="mb-6 text-lg font-light italic text-slate-600 opacity-70 transition-opacity duration-300 group-hover:opacity-100 dark:text-slate-400 md:text-xl"
        >
          εἰσὶ σὺ ὁ ἰδιώτης;
        </div>

        <!-- Modern CTA -->
        <div
          class="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 group-hover:scale-105 group-hover:shadow-xl"
        >
          <span>Test Your Knowledge</span>
          <svg
            class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </div>

        <!-- Subtle Tagline -->
        <div
          class="mt-4 text-sm text-slate-500 opacity-60 transition-opacity duration-300 group-hover:opacity-80 dark:text-slate-400"
        >
          From ancient Athens to modern democracy
        </div>
      </div>

      <!-- Minimal Corner Accents -->
      <div
        class="absolute left-4 top-4 h-3 w-3 rounded-tl-lg border-l-2 border-t-2 border-amber-400/30"
      ></div>
      <div
        class="absolute right-4 top-4 h-3 w-3 rounded-tr-lg border-r-2 border-t-2 border-amber-400/30"
      ></div>
      <div
        class="absolute bottom-4 left-4 h-3 w-3 rounded-bl-lg border-b-2 border-l-2 border-amber-400/30"
      ></div>
      <div
        class="absolute bottom-4 right-4 h-3 w-3 rounded-br-lg border-b-2 border-r-2 border-amber-400/30"
      ></div>
    </div>

    <!-- Click Ripple Effect -->
    <div class="absolute inset-0 overflow-hidden rounded-3xl">
      <div class="modern-ripple-effect"></div>
    </div>
  </div>

  <!-- Subtle Floating Elements -->
  <div class="absolute -left-8 -top-8 animate-pulse text-2xl opacity-20">⚖️</div>
  <div class="absolute -right-8 -top-8 animate-pulse text-2xl opacity-20 delay-1000">📜</div>
</div>

<style>
  .modern-button-container {
    position: relative;
    display: inline-block;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  }

  .modern-button-container:hover {
    filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25));
  }

  /* Modern Ripple Effect */
  .modern-ripple-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .modern-button-container:active .modern-ripple-effect {
    width: 400px;
    height: 400px;
    opacity: 0;
  }

  /* Subtle Pulse Animation */
  @keyframes subtle-pulse {
    0%,
    100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }

  .animate-pulse {
    animation: subtle-pulse 3s ease-in-out infinite;
  }

  .delay-1000 {
    animation-delay: 1s;
  }

  /* Smooth Transitions */
  * {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
