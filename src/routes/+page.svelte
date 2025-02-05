<script>
// @ts-nocheck

import Quiz from '../components/Quiz.svelte';
import { fly, fade } from 'svelte/transition';
import { onMount } from 'svelte';
	import Main from '../components/Main.svelte';
	import Menu from '../components/Menu.svelte';

/** @type {import('./$types').PageData} */
export let data;

let questions = [];
let error = data.error;
let loading = true;

try {
  if (!error && Array.isArray(data.questions)) {
    console.log(`Processing ${data.questions.length} questions`);
    questions = data.questions.map(q => ({
      question: q.question,
      options: q.options,
      correctIndex: q.correct_index
    }));
    console.log(`Processed ${questions.length} questions`);
  } else {
    console.error('Invalid questions data:', data);
    error = 'Failed to load questions';
  }
} catch (err) {
  console.error('Error processing questions:', err);
  error = 'Failed to process questions';
} finally {
  loading = false;
}

let showNewContainer = false;
let showQuizContainer = false;
let showLearnMoreContent = false;
let quizStarted = false;
let countdownProgress = 0;
let countdownInterval;

function startQuiz() {
  showLearnMoreContent = false;
  showQuizContainer = true;
  showNewContainer = false;
  countdownProgress = 0;
  quizStarted = false;

  // Start countdown
  countdownInterval = setInterval(() => {
    countdownProgress += 0.1;
    if (countdownProgress >= 1) {
      clearInterval(countdownInterval);
      quizStarted = true;
    }
  }, 100);
}

function showLearnMore() {
  showLearnMoreContent = true;
  showNewContainer = false;
}

function toggleContainer() {
  showNewContainer = true;
}

function goBackToInfo() {
  showQuizContainer = false;
  showLearnMoreContent = false;
  showNewContainer = true;
}

function goBackToStart() {
  showNewContainer = false;
  showQuizContainer = false;
  showLearnMoreContent = false;
}

onMount(() => {
  return () => {
    clearInterval(countdownInterval);
  };
});

const learnMoreContent = [
  {
    title: "Origins in Ancient Greece",
    text: "The word 'idiot' comes from the ancient Greek 'ἰδιώτης' (idiōtēs), which originally meant a private citizen, someone who did not participate in public life.",
    highlight: ["ἰδιώτης", "idiōtēs", "private citizen"],
    size: "text-xl md:text-3xl"
  },
  {
    title: "Private vs Public Life",
    text: "In ancient Greek society, active participation in public affairs was highly valued. Those who focused solely on private matters were seen as not fulfilling their civic duty.",
    highlight: ["public affairs", "civic duty"],
    size: "text-lg md:text-2xl"
  },
  {
    title: "Evolution of Meaning",
    text: "Over time, the meaning shifted from describing someone uninvolved in public affairs to its modern usage, showing how language evolves with society.",
    highlight: ["evolved", "modern usage"],
    size: "text-lg md:text-2xl"
  }
];

function formatLearnMoreText(item) {
  let formattedText = item.text;
  item.highlight.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    formattedText = formattedText.replace(regex, `<span class="font-bold text-primary">$1</span>`);
  });
  return formattedText;
}
</script>

<div class="relative h-[100dvh] overflow-hidden bg-base-200 flex flex-col justify-center items-center">
  {#if !showNewContainer}
    <Main {toggleContainer} />
  {:else}
    <Menu {startQuiz} {showLearnMore} {goBackToStart} />
  {/if}

  {#if showLearnMoreContent}
    <div
      class="fixed inset-0 bg-base-300 bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
      transition:fade
    >
      <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-3xl p-4 sm:p-6 space-y-6 sm:space-y-8 relative my-2 sm:my-4">
        <!-- Close button -->
        <button
          class="absolute top-2 right-2 sm:top-4 sm:right-4 btn btn-circle btn-ghost btn-sm sm:btn-md"
          on:click={() => {
            showLearnMoreContent = false;
            showNewContainer = true;
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Title -->
        <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4 sm:mb-8 text-primary mt-6 sm:mt-0">
          The History of "Idiot"
        </h2>

        <!-- Content sections -->
        <div class="space-y-8 sm:space-y-12">
          {#each learnMoreContent as section}
            <div>
              <h3 class="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4 text-secondary">
                {section.title}
              </h3>
              <p class="text-base sm:text-lg md:text-xl leading-relaxed">
                {@html formatLearnMoreText(section)}
              </p>
            </div>
          {/each}
        </div>

        <!-- Navigation buttons -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 mt-6 sm:mt-8">
          <button
            class="btn glass btn-primary btn-sm sm:btn-md w-full sm:w-auto text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content"
            on:click={() => {
              showLearnMoreContent = false;
              showNewContainer = true;
            }}
          >
            Back to Home
          </button>
          <button
            class="btn glass btn-secondary btn-sm sm:btn-md w-full sm:w-auto text-secondary-content border-secondary-content hover:bg-primary hover:border-primary-content"
            on:click={startQuiz}
          >
            Take the Quiz →
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showQuizContainer}
    <div
      class="absolute inset-0 bg-base-100 flex flex-col justify-center items-center z-30 p-4"
      in:fly={{ y: 1000, duration: 500 }}
      out:fly={{ y: 1000, duration: 500 }}
    >
      <div class="w-full max-w-2xl">
        {#if !quizStarted}
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold mb-4">Quiz starting in {Math.ceil(10 - countdownProgress * 10)} seconds</h2>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                class="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-linear"
                style="width: {countdownProgress * 100}%"
              ></div>
            </div>
          </div>
        {:else}
          <Quiz
            {questions}
            timeLimit={6}
            numQuestions={1}
            buttonClass="btn glass text-primary-content border-primary-content"
          />
        {/if}
        <button class="btn glass btn-outline btn-secondary mt-4 w-full" on:click={goBackToInfo}>Go Back</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .word {
    display: inline-block;
  }
  .word-container {
    z-index: 1;
  }

</style>