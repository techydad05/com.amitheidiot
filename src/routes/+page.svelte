<script>
  // @ts-nocheck

  import Quiz from '../components/Quiz.svelte';
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Main from '../components/Main.svelte';
  import Menu from '../components/Menu.svelte';
  import AdminMenu from '../components/AdminMenu.svelte';
  import WordHistory from '../components/WordHistory.svelte';
  import DifficultySelect from '../components/DifficultySelect.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let questions = [];
  let error = data.error;
  let loading = true;
  let quizSettings = data.settings || { num_questions: 3, time_limit: 60 };

  try {
    if (!error && Array.isArray(data.questions)) {
      questions = data.questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctIndex: q.correct_index,
      }));
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
  let showDifficultySelect = false;
  let currentQuizSettings = quizSettings;

  function startQuiz() {
    showLearnMoreContent = false;
    showDifficultySelect = true;
    showNewContainer = false;
  }

  function handleDifficultySelect(settings) {
    currentQuizSettings = settings;
    showDifficultySelect = false;
    showQuizContainer = true;
    // Apply theme if provided
    if (settings.theme) {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
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

</script>



<div
  class="relative flex h-[100dvh] touch-manipulation select-none flex-col items-center justify-center overflow-hidden bg-base-200 px-4 md:px-20"
>
  <AdminMenu settings={quizSettings} />
  {#if !showNewContainer}
    <Main {toggleContainer} />
  {:else}
    <Menu {startQuiz} {showLearnMore} {goBackToStart} />
  {/if}

  {#if showLearnMoreContent}
    <WordHistory
      show={showLearnMoreContent}
      onClose={() => {
        showLearnMoreContent = false;
        showNewContainer = true;
      }}
      onStartQuiz={startQuiz}
    />
  {/if}

  {#if showDifficultySelect}
    <DifficultySelect
      onSelect={handleDifficultySelect}
      onBack={() => {
        showDifficultySelect = false;
        showNewContainer = true;
      }}
      {questions}
    />
  {/if}

  {#if showQuizContainer}
    <div
      class="absolute inset-0 z-30 flex flex-col items-center justify-center overscroll-contain bg-base-100 p-4"
      in:fly={{ y: 1000, duration: 200 }}
      out:fly={{ y: 1000, duration: 200 }}
    >
      <div class="w-full max-w-2xl">
        <Quiz
          {questions}
          timeLimit={currentQuizSettings.time_limit}
          numQuestions={currentQuizSettings.num_questions}
          buttonClass="btn glass text-primary-content border-primary-content"
          on:escape={goBackToInfo}
        />
      </div>
    </div>
  {/if}
</div>
