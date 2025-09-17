<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let questions = [
    {
      question: "🏛️ What did the Greek word 'idiotes' originally mean?",
      options: [
        "A foolish person who couldn't think straight",
        'A private citizen who avoided public life',
        'A wise philosopher with deep thoughts',
        'A government official with power',
      ],
      correct: 1,
      explanation:
        "Correct! 'Idiotes' just meant someone who minded their own business instead of getting involved in politics.",
    },
    {
      question: "🤔 Why did ancient Greeks side-eye the 'idiotes'?",
      options: [
        'They thought they were naturally unintelligent',
        'They refused to pay their taxes',
        'They avoided participating in democracy',
        'They were always foreigners and outsiders',
      ],
      correct: 2,
      explanation:
        'Exactly! Greeks were democracy fanatics. Avoiding civic life was like ghosting your entire community.',
    },
    {
      question: '🏺 Where did the real democratic action happen in Athens?',
      options: [
        'The Parthenon (fancy temple vibes)',
        'Private homes (secret meetings)',
        'The agora (public square)',
        'The gymnasium (while working out)',
      ],
      correct: 2,
      explanation:
        "You got it! The agora was ancient Athens' main character—part marketplace, part debate club, all civic action.",
    },
    {
      question: "🔄 How did 'idiot' go from 'private person' to 'dummy'?",
      options: [
        'It actually became more positive over time',
        "It evolved from 'private citizen' to 'foolish person'",
        'The meaning stayed exactly the same',
        'It became a term of respect and honor',
      ],
      correct: 1,
      explanation:
        'Right again! Over 2,000+ years, the word took a wild journey. Language evolution is a messy game of telephone!',
    },
    {
      question: "🎯 BONUS: What's the real lesson here?",
      options: [
        'Ancient Greeks were just mean to introverts',
        'Words can completely change meaning over time',
        'Democracy has always been exactly the same',
        'Only smart people should participate in politics',
      ],
      correct: 1,
      explanation:
        'Bingo! This whole story shows how language evolves and how context matters. Mind = blown! 🤯',
    },
  ];

  let quizState = 'playing'; // playing -> reviewing -> finished
  let currentQuestionIndex = 0;
  let selectedAnswer = null;
  let userAnswers = [];
  let score = 0;

  $: currentQuestion = questions[currentQuestionIndex];
  $: progress = (currentQuestionIndex / questions.length) * 100;

  function handleAnswer(answerIndex) {
    if (quizState !== 'playing') return;

    selectedAnswer = answerIndex;
    quizState = 'reviewing';

    const isCorrect = answerIndex === currentQuestion.correct;
    if (isCorrect) {
      score++;
    }
    userAnswers[currentQuestionIndex] = { selected: answerIndex, correct: currentQuestion.correct };

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        selectedAnswer = null;
        quizState = 'playing';
      } else {
        quizState = 'finished';
      }
    }, 2500); // Time to review the explanation
  }

  function restartQuiz() {
    quizState = 'playing';
    currentQuestionIndex = 0;
    selectedAnswer = null;
    userAnswers = [];
    score = 0;
  }

  function getScoreMessage() {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect Score! You're a true civic historian! 🏆";
    if (percentage >= 80) return "Excellent! You've been paying attention! 🎉";
    if (percentage >= 60) return 'Great job! You know your history! 👏';
    if (percentage >= 40) return "Not bad! A little more reading and you'll be an expert.";
    return 'A good start! The history lesson is always there to review.';
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (quizState === 'playing') {
        if (e.key >= '1' && e.key <= '4') {
          handleAnswer(parseInt(e.key) - 1);
        }
      }
      if (e.key === 'Escape') {
        goto('/crisis');
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>Quiz: The History of 'Idiot'</title>
</svelte:head>

<div
  class="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6"
>
  <!-- Header -->
  <header class="z-10 mx-auto w-full max-w-5xl">
    <div class="flex items-center justify-between">
      <button
        on:click={() => goto('/crisis')}
        class="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Back to Crisis</span>
      </button>
      <div class="text-white/70">Score: {score} / {questions.length}</div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex w-full flex-1 items-center justify-center">
    {#if quizState !== 'finished'}
      <div class="mx-auto w-full max-w-3xl">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="mb-2 text-center text-white/80">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div class="h-3 w-full overflow-hidden rounded-full border border-white/10 bg-black/20">
            <div
              class="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500 ease-out"
              style="width: {progress}%;"
            ></div>
          </div>
        </div>

        {#key currentQuestionIndex}
          <div in:fly={{ y: 50, duration: 500, easing: quintOut }} class="text-center">
            <!-- Question -->
            <h1 class="mb-10 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              {currentQuestion.question}
            </h1>

            <!-- Answer Options -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {#each currentQuestion.options as option, index}
                <button
                  on:click={() => handleAnswer(index)}
                  disabled={quizState === 'reviewing'}
                  class="relative transform-gpu rounded-2xl border p-5 text-left text-lg text-white transition-all duration-300 {quizState ===
                  'playing'
                    ? 'cursor-pointer hover:-translate-y-1 hover:bg-white/10'
                    : 'cursor-wait'} {selectedAnswer === index && quizState === 'reviewing'
                    ? 'border-blue-400'
                    : 'border-white/20'} {quizState === 'reviewing' &&
                  index === currentQuestion.correct
                    ? 'border-green-500 bg-green-500/20'
                    : ''} {quizState === 'reviewing' &&
                  selectedAnswer === index &&
                  index !== currentQuestion.correct
                    ? 'border-red-500 bg-red-500/20'
                    : ''}"
                >
                  <span class="mr-4 font-mono">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>

                  {#if quizState === 'reviewing'}
                    <div class="absolute right-3 top-3 text-2xl">
                      {#if index === currentQuestion.correct}✅
                      {:else if selectedAnswer === index}❌
                      {/if}
                    </div>
                  {/if}
                </button>
              {/each}
            </div>

            <!-- Explanation -->
            {#if quizState === 'reviewing'}
              <div in:fly={{ y: 20, duration: 400, delay: 300 }} class="mt-8 text-center">
                <div
                  class="inline-block rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
                >
                  <p class="text-lg text-white/90">{currentQuestion.explanation}</p>
                </div>
              </div>
            {/if}
          </div>
        {/key}
      </div>
    {:else}
      <!-- Quiz Complete -->
      <div
        in:fly={{ y: 50, duration: 500, easing: quintOut }}
        class="rounded-3xl border border-white/10 bg-black/20 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
      >
        <div class="mb-6 text-7xl">{score / questions.length >= 0.8 ? '🏆' : '🎉'}</div>
        <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">Quiz Complete!</h1>
        <p class="mb-6 text-xl text-white/80">{getScoreMessage()}</p>
        <div class="mb-10 text-6xl font-bold">
          <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {score} / {questions.length}
          </span>
        </div>
        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            on:click={restartQuiz}
            class="w-full rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:w-auto"
          >
            Try Again
          </button>
          <button
            on:click={() => goto('/learn')}
            class="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 sm:w-auto"
          >
            Review History
          </button>
        </div>
      </div>
    {/if}
  </main>
</div>
