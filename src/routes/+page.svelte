<script>
import Quiz from '$lib/Quiz.svelte';
import { fly, scale } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import { onMount, tick } from 'svelte';

const questions = [
	{
		question: 'What is the capital of France?',
		options: ['London', 'Berlin', 'Paris', 'Madrid'],
		correctIndex: 2
	},
	{
		question: 'Which planet is known as the Red Planet?',
		options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
		correctIndex: 0
	},
	{
		question: 'Who painted the Mona Lisa?',
		options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
		correctIndex: 1
	},
	{
		question: 'What is the largest ocean on Earth?',
		options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
		correctIndex: 3
	},
	{
		question: "Which element has the chemical symbol 'O'?",
		options: ['Gold', 'Silver', 'Oxygen', 'Iron'],
		correctIndex: 2
	}
];

/**
 * @param {{ detail: { score: any; totalQuestions: any; }; }} event
 */
function handleQuizComplete(event) {
	console.log(`Quiz completed! Score: ${event.detail.score}/${event.detail.totalQuestions}`);
}

function handleRestartQuiz() {
	console.log('Quiz restarted');
}

const specialWords = [
    { text: "idiot", size: "text-6xl md:text-8xl" },
    { text: "ἰδιώτης", size: "text-5xl md:text-7xl" },
    { text: "idiōtēs", size: "text-4xl md:text-6xl" },
    { text: "private", size: "text-5xl md:text-7xl" },
    { text: "public", size: "text-5xl md:text-7xl" },
    { text: "affairs", size: "text-4xl md:text-6xl" },
    { text: "polis", size: "text-3xl md:text-5xl" },
    { text: "citizenship", size: "text-4xl md:text-6xl" },
    { text: "society", size: "text-5xl md:text-7xl" },
  ];

  const fullText = `In ancient Greece, the term "idiot" (ἰδιώτης, idiōtēs) had a very different meaning from what it does today. It originally referred to a private individual, someone who was not involved in public affairs or the governance of the city-state (polis). The word derives from "idios," meaning "private" or "one's own." An "idiot" in ancient Greek society was essentially a person who focused on their private life and interests, rather than participating in public life, politics, or civic duties. This term carried a negative connotation because the Greeks highly valued active participation in public affairs and viewed it as a key aspect of citizenship and contributing to the common good. Therefore, an "idiot" was seen as someone who was disengaged and uninvolved in the civic and communal responsibilities of society.`;

  function applySpecificSizes(text, defaultSize='text-xl') {
    const cleanText = text.replace(/[^a-zA-Z0-9\s\u0370-\u03FF\u1F00-\u1FFF]/g, '');
    const words = cleanText.split(' ');
    const specialWordsMap = new Map(specialWords.map(w => [w.text.toLowerCase(), w]));

    const sizedWords = words.map((word, index) => {
      const lowerWord = word.toLowerCase();
      const size = specialWordsMap.has(lowerWord) ? specialWordsMap.get(lowerWord).size : defaultSize;
      return `<span id="word-${index}" class="${size} word ml-[5px]">${word}</span>`;
    });

    return sizedWords.join('');
  }

  function setupFlyAwayEffect() {
    const container = document.querySelector('.word-container');
    const words = document.querySelectorAll('.word');
    const radius = 150; // Adjust this value to change the effect radius

    function flyAway(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2;
        const wordY = rect.top + rect.height / 2;

        const dx = wordX - mouseX;
        const dy = wordY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const angle = Math.atan2(dy, dx);
          const force = (radius - distance) / radius;
          const translateX = Math.cos(angle) * force * 50;
          const translateY = Math.sin(angle) * force * 50;

          word.style.transform = `translate(${translateX}px, ${translateY}px)`;
          word.style.transition = 'transform 0.3s ease-out';
        } else {
          word.style.transform = 'translate(0, 0)';
        }
      });
    }

    container.addEventListener('mousemove', flyAway);
    container.addEventListener('touchmove', (e) => {
      e.preventDefault();
      flyAway(e.touches[0]);
    });
  }

  const sizedFullText = applySpecificSizes(fullText, 'text-2xl md:text-4xl');

async function toggleContainer() {
  if (buttonVisible) {
    buttonVisible = false;
    setTimeout(async () => {
      showNewContainer = true;
      await tick(); // Wait for the DOM to update
      startAutoScroll(); // Start auto-scroll when the new container is shown
    }, 300); // Delay to allow button to shrink first
  } else {
    showNewContainer = false;
    setTimeout(() => {
      buttonVisible = true;
    }, 500); // Delay to show button after screen transition
  }
}

function startAutoScroll() {
  const scrollContainer = document.querySelector('.scroll-container');
  const scrollHeight = scrollContainer?.scrollHeight;
  const duration = 15000; // Duration of the scroll in milliseconds
  const delay = 3000; // Delay before starting the scroll in milliseconds
  const startTime = performance.now() + delay;

  function scrollStep(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    scrollContainer?.scrollTo({ top: progress * (scrollHeight - scrollContainer.clientHeight), behavior: 'auto' });

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

let showNewContainer = false;
let buttonVisible = true;

onMount(() => {
  if (showNewContainer) {
    startAutoScroll();
  }
});

</script>

<div class="relative h-screen overflow-hidden bg-base-200 flex flex-col justify-center items-center">
  {#if !showNewContainer}
    <div 
      class="absolute inset-0 flex flex-wrap content-start opacity-30 p-2 md:p-4 word-container"
      transition:fly={{ x: -1000, duration: 500, easing: cubicOut, delay: 300 }}
    >
      {@html sizedFullText}
    </div>
  {/if}
  
  {#if buttonVisible}
    <button 
      class="btn btn-outline btn-primary z-[999]" 
      on:click={toggleContainer}
      transition:scale={{ duration: 300, start: 1, end: 0, easing: cubicOut }}
    >
      Am I the idiot?
    </button>
  {/if}

  {#if showNewContainer}
    <div 
      class="absolute inset-0 bg-base-100 flex flex-col justify-center items-center"
      transition:scale={{ duration: 700, start: 0.1, easing: cubicOut }}
    >
      <div class="scroll-container overflow-y-auto h-1/3 w-full p-4 text-lg md:text-xl">
        <p>{@html fullText}</p>
      </div>
      <Quiz
        {questions}
        timeLimit={20}
        numQuestions={5}
        on:quizComplete={handleQuizComplete}
        on:restartQuiz={handleRestartQuiz}
      />
      <button class="btn btn-outline btn-secondary mt-4" on:click={toggleContainer}>Go Back</button>
    </div>
  {/if}
</div>

<style>
  .word {
    display: inline-block;
    transition: transform 0.3s ease-out;
  }
  .scroll-container {
    overflow-y: auto;
    height: 33.33%; /* Top third of the container */
    width: 100%;
    padding: 1rem;
    font-size: 1.25rem; /* Increase text size */
  }
</style>