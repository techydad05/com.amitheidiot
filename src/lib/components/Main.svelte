<script>
  import { onMount } from 'svelte';
  export let toggleContainer;

  // Responsive text sizes optimized for space filling
  const primarySize = 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl';
  const secondarySize = 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl';
  const tertiarySize = 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl';
  const specialCharSize = 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl';
  const defaultSize = 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl';

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

  function applySpecificSizes(text, defaultSize = 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl') {
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

  const sizedFullText = applySpecificSizes(fullText, 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl');
</script>

<div class="word-container absolute inset-0 flex flex-wrap content-start justify-start items-start p-1 sm:p-2 md:p-3 lg:p-4 opacity-20 leading-tight">
  {@html sizedFullText}
</div>

<div class="relative z-10">
  <button
    class="btn variant-filled-primary btn-xl"
    on:click={toggleContainer}
  >
    <span class="shimmer-text text-2xl">Are you the idiot?</span>
  </button>
</div>

<style>
  .shimmer-text {
    position: relative;
    display: inline-block;
    font-weight: 400;
    background: linear-gradient(90deg, currentColor 0%, #fff8 50%, currentColor 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shimmer 3s infinite 2s;
    -webkit-text-fill-color: transparent;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>
