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


function startQuiz() {
  showLearnMoreContent = false;
  showQuizContainer = true;
  showNewContainer = false;

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



const learnMoreContent = [
  {
    title: "Origins in Ancient Greece",
    text: "The word 'idiot' comes from the ancient Greek 'ἰδιώτης' (idiōtēs), which originally meant a private citizen, someone who did not participate in public life.",
    highlight: ["ἰδιώτης", "idiōtēs", "private citizen"],
    size: "text-xl md:text-3xl",
    funFact: "In ancient Athens, citizens were expected to participate in the democratic process. Those who didn't were viewed with suspicion!",
    icon: "🏛️"
  },
  {
    title: "Private vs Public Life",
    text: "In ancient Greek society, active participation in public affairs was highly valued. Those who focused solely on private matters were seen as not fulfilling their civic duty.",
    highlight: ["public affairs", "civic duty"],
    size: "text-lg md:text-2xl",
    funFact: "The Athenian democracy was so participatory that they even had a process called 'ostracism' where citizens could vote to exile powerful individuals!",
    icon: "⚖️"
  },
  {
    title: "Evolution of Meaning",
    text: "Over time, the meaning shifted from describing someone uninvolved in public affairs to its modern usage, showing how language evolves with society.",
    highlight: ["evolved", "modern usage"],
    size: "text-lg md:text-2xl",
    funFact: "The transformation of 'idiot' from 'private citizen' to its modern meaning took over 2000 years of language evolution!",
    icon: "🔄"
  },
  {
    title: "Modern Democracy",
    text: "Today, being an informed and active citizen is more important than ever. The complexity of modern issues requires educated participation.",
    highlight: ["informed", "active citizen", "educated participation"],
    size: "text-lg md:text-2xl",
    funFact: "Studies show that higher levels of education correlate with increased political participation and better democratic outcomes!",
    icon: "🗳️"
  }
];

let selectedFact = null;
let showFact = false;

function toggleFact(fact) {
  if (selectedFact === fact) {
    showFact = !showFact;
  } else {
    selectedFact = fact;
    showFact = true;
  }
}

function formatLearnMoreText(item) {
  let formattedText = item.text;
  item.highlight.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    formattedText = formattedText.replace(regex, `<span class="font-bold text-primary">$1</span>`);
  });
  return formattedText;
}
</script>

<div class="relative h-[100dvh] overflow-hidden bg-base-200 flex flex-col justify-center items-center touch-manipulation select-none">
  {#if !showNewContainer}
    <Main {toggleContainer} />
  {:else}
    <Menu {startQuiz} {showLearnMore} {goBackToStart} />
  {/if}

  {#if showLearnMoreContent}
    <div
      class="fixed inset-0 bg-base-300 bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto overscroll-contain"
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-h-[70vh] overflow-y-auto p-2">
          {#each learnMoreContent as section}
            <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 h-full flex flex-col">
              <div class="flex items-center gap-4 mb-4">
                <span class="text-4xl">{section.icon}</span>
                <h3 class="text-xl sm:text-2xl md:text-4xl font-bold text-secondary">
                  {section.title}
                </h3>
              </div>
              <p class="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                {@html formatLearnMoreText(section)}
              </p>
              <button
                class="btn btn-ghost btn-sm text-info hover:text-info-content transition-colors duration-200"
                on:click={() => toggleFact(section)}
              >
                {selectedFact === section && showFact ? 'Hide Fun Fact' : 'Show Fun Fact'}
              </button>
              {#if selectedFact === section && showFact}
                <div
                  class="mt-4 p-4 bg-info bg-opacity-10 rounded-lg text-info-content"
                  in:fly={{y: 20, duration: 300}}
                  out:fade
                >
                  <p class="text-sm sm:text-base italic">{section.funFact}</p>
                </div>
              {/if}
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
      class="absolute inset-0 bg-base-100 flex flex-col justify-center items-center z-30 p-4 overscroll-contain"
      in:fly={{ y: 1000, duration: 500 }}
      out:fly={{ y: 1000, duration: 500 }}
    >
      <div class="w-full max-w-2xl">

          <Quiz
            {questions}
            timeLimit={60}
            numQuestions={155}
            buttonClass="btn glass text-primary-content border-primary-content"
            on:escape={goBackToInfo}
          />
      </div>
    </div>
  {/if}
</div>

<style>
  /* Default styles for larger screens */
  .container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    .container {
      width: 100%;
      padding: 16px;
      touch-action: manipulation;
    }

    /* Hide scrollbars but keep functionality */
    ::-webkit-scrollbar {
      display: none;
    }

    /* Mobile-optimized text sizes */
    .text-3xl {
      font-size: 1.5rem;
    }

    .text-2xl {
      font-size: 1.25rem;
    }

    /* Add mobile touch feedback */
    button:active {
      transform: scale(0.98);
    }
  }

  /* Custom scrollbar for desktop */
  @media (min-width: 769px) {
    .overflow-y-auto {
      scrollbar-width: thin;
      scrollbar-color: theme('colors.primary') transparent;
    }

    .overflow-y-auto::-webkit-scrollbar {
      width: 6px;
      display: block;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
      background: transparent;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: theme('colors.primary');
      border-radius: 3px;
    }
  }
</style>