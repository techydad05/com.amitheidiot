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

<!-- Epic Interactive Button with Greek Temple Design -->
<div class="relative z-10 flex flex-col items-center">
  <!-- Floating Greek Columns Animation -->
  <div class="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-30">
    <div class="flex space-x-8 animate-float">
      <div class="column-pillar">🏛️</div>
      <div class="column-pillar delay-1">🏛️</div>
      <div class="column-pillar delay-2">🏛️</div>
    </div>
  </div>

  <!-- Main Epic Button -->
  <div class="epic-button-container group cursor-pointer" on:click={toggleContainer}>
    <!-- Glowing Aura -->
    <div class="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-all duration-700 scale-110 animate-pulse-glow"></div>
    
    <!-- Ancient Scroll Background -->
    <div class="relative bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-amber-900 dark:via-yellow-800 dark:to-amber-700 rounded-2xl p-8 shadow-2xl border-4 border-amber-300 dark:border-amber-600 transform group-hover:scale-105 transition-all duration-500 group-hover:rotate-1">
      
      <!-- Ancient Greek Border Pattern -->
      <div class="absolute inset-2 border-2 border-amber-400 dark:border-amber-500 rounded-xl opacity-50" style="border-image: repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px) 2;"></div>
      
      <!-- Floating Laurel Wreaths -->
      <div class="absolute -top-4 -left-4 text-3xl animate-spin-slow opacity-70">🏆</div>
      <div class="absolute -top-4 -right-4 text-3xl animate-spin-slow-reverse opacity-70">🏆</div>
      
      <!-- Main Question Text -->
      <div class="relative text-center">
        <div class="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 tracking-widest uppercase">
          Ancient Greek Challenge
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 bg-clip-text text-transparent mb-4 leading-tight">
          <span class="inline-block transform group-hover:scale-110 transition-transform duration-300">Are</span>
          <span class="inline-block transform group-hover:scale-110 transition-transform duration-300 delay-75">You</span>
          <span class="inline-block transform group-hover:scale-110 transition-transform duration-300 delay-150">The</span>
          <span class="inline-block transform group-hover:scale-125 transition-transform duration-300 delay-225 text-red-600 dark:text-red-400 drop-shadow-lg">IDIOT</span>
          <span class="inline-block transform group-hover:scale-110 transition-transform duration-300 delay-300">?</span>
        </h1>
        
        <!-- Greek Translation -->
        <div class="text-lg md:text-xl text-amber-700 dark:text-amber-300 font-medium mb-4 italic">
          εἰσὶ σὺ ὁ ἰδιώτης;
        </div>
        
        <!-- Subtitle -->
        <div class="text-base md:text-lg text-amber-600 dark:text-amber-400 mb-6 max-w-md mx-auto leading-relaxed">
          Test your knowledge of democracy and citizenship like the ancient Greeks intended
        </div>
        
        <!-- Interactive Elements -->
        <div class="flex justify-center items-center space-x-4 mb-4">
          <div class="animate-bounce text-2xl">⚡</div>
          <div class="px-4 py-2 bg-amber-200 dark:bg-amber-800 rounded-full text-sm font-semibold text-amber-800 dark:text-amber-200 group-hover:bg-amber-300 dark:group-hover:bg-amber-700 transition-colors duration-300">
            Click to Begin Your Trial
          </div>
          <div class="animate-bounce text-2xl delay-300">⚡</div>
        </div>
        
        <!-- Floating Wisdom Quote -->
        <div class="text-xs md:text-sm text-amber-600 dark:text-amber-400 italic opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          "The unexamined life is not worth living" - Socrates
        </div>
      </div>
      
      <!-- Corner Decorations -->
      <div class="absolute top-2 left-2 text-amber-500 text-xl opacity-50">🌿</div>
      <div class="absolute top-2 right-2 text-amber-500 text-xl opacity-50">🌿</div>
      <div class="absolute bottom-2 left-2 text-amber-500 text-xl opacity-50">🌿</div>
      <div class="absolute bottom-2 right-2 text-amber-500 text-xl opacity-50">🌿</div>
    </div>
    
    <!-- Ripple Effect on Click -->
    <div class="absolute inset-0 rounded-2xl overflow-hidden">
      <div class="ripple-effect"></div>
    </div>
  </div>
  
  <!-- Floating Ancient Symbols -->
  <div class="absolute top-10 left-10 text-2xl animate-float opacity-40">🏺</div>
  <div class="absolute top-20 right-10 text-2xl animate-float delay-1 opacity-40">📜</div>
  <div class="absolute bottom-10 left-20 text-2xl animate-float delay-2 opacity-40">⚖️</div>
  <div class="absolute bottom-20 right-20 text-2xl animate-float delay-3 opacity-40">🗿</div>
</div>

<style>
  .epic-button-container {
    position: relative;
    display: inline-block;
    filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3));
  }

  .column-pillar {
    font-size: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  .column-pillar.delay-1 {
    animation-delay: 0.5s;
  }

  .column-pillar.delay-2 {
    animation-delay: 1s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes animate-float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(3deg);
    }
  }

  .animate-float {
    animation: animate-float 4s ease-in-out infinite;
  }

  .animate-float.delay-1 {
    animation-delay: 1s;
  }

  .animate-float.delay-2 {
    animation-delay: 2s;
  }

  .animate-float.delay-3 {
    animation-delay: 3s;
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-slow-reverse {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }

  .animate-spin-slow-reverse {
    animation: spin-slow-reverse 8s linear infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1.1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .ripple-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: all 0.6s ease-out;
  }

  .epic-button-container:active .ripple-effect {
    width: 300px;
    height: 300px;
    opacity: 0;
  }

  /* Hover effects for the main container */
  .epic-button-container:hover {
    transform: translateY(-5px);
  }

  /* Greek border pattern animation */
  @keyframes border-dance {
    0% {
      border-image-source: repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px);
    }
    50% {
      border-image-source: repeating-linear-gradient(45deg, currentColor, currentColor 10px, transparent 10px, transparent 20px);
    }
    100% {
      border-image-source: repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px);
    }
  }

  .epic-button-container:hover .absolute.inset-2 {
    animation: border-dance 2s ease-in-out infinite;
  }
</style>
