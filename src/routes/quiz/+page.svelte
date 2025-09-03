<script>
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let currentQuestion = 0;
  let selectedAnswer = null;
  let showResult = false;
  let score = 0;
  let answers = [];
  let quizComplete = false;

  const questions = [
    {
      question: "What did the Greek word 'idiotes' originally mean?",
      options: [
        "A foolish person",
        "A private citizen who avoided public life",
        "A wise philosopher",
        "A government official"
      ],
      correct: 1,
      explanation: "In ancient Greece, 'idiotes' meant a private citizen who chose personal matters over civic duty."
    },
    {
      question: "Why did ancient Greeks view 'idiotes' negatively?",
      options: [
        "They were considered unintelligent",
        "They didn't pay taxes",
        "They avoided participating in democracy",
        "They were foreigners"
      ],
      correct: 2,
      explanation: "Greeks believed civic participation was essential for a healthy democracy."
    },
    {
      question: "Where did democratic discussions take place in ancient Athens?",
      options: [
        "The Parthenon",
        "Private homes",
        "The agora (public square)",
        "The gymnasium"
      ],
      correct: 2,
      explanation: "The agora was the heart of Athenian democracy where citizens gathered to debate."
    },
    {
      question: "How did the meaning of 'idiot' change over time?",
      options: [
        "It became more positive",
        "It evolved from 'private citizen' to 'foolish person'",
        "It maintained its original meaning",
        "It became a term of respect"
      ],
      correct: 1,
      explanation: "The word gradually shifted from describing civic disengagement to general foolishness."
    }
  ];

  function selectAnswer(index) {
    selectedAnswer = index;
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    answers.push({
      question: currentQuestion,
      selected: selectedAnswer,
      correct: isCorrect
    });
    
    if (isCorrect) score++;
    
    showResult = true;
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        selectedAnswer = null;
        showResult = false;
      } else {
        quizComplete = true;
      }
    }, 2000);
  }

  function restartQuiz() {
    currentQuestion = 0;
    selectedAnswer = null;
    showResult = false;
    score = 0;
    answers = [];
    quizComplete = false;
  }

  function getScoreMessage() {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're definitely not the idiot! 🎉";
    if (percentage >= 75) return "Great job! You know your history! 👏";
    if (percentage >= 50) return "Not bad! You're learning! 📚";
    return "Time to review the history lesson! 🤔";
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') goto('/learn');
      if (e.key >= '1' && e.key <= '4' && !showResult && !quizComplete) {
        selectAnswer(parseInt(e.key) - 1);
      }
      if (e.key === 'Enter' && selectedAnswer !== null && !showResult) {
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <title>Quiz - Am I The Idiot?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
  <!-- Background Animation -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
  </div>

  <!-- Navigation -->
  <div class="relative z-20 p-6">
    <div class="flex items-center justify-between">
      <button
        on:click={() => goto('/learn')}
        class="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 text-white/80 hover:text-white transition-all duration-300"
      >
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Learn
      </button>

      {#if !quizComplete}
        <div class="flex items-center gap-4">
          <div class="text-white/60 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div class="text-white/60 text-sm">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-4xl">
      
      {#if !quizComplete}
        <!-- Question -->
        <div class="text-center mb-8 sm:mb-12 px-4">
          <div class="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🧠</div>
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            {questions[currentQuestion].question}
          </h1>
        </div>

        <!-- Answer Options -->
        <div class="grid gap-3 sm:gap-4 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          {#each questions[currentQuestion].options as option, index}
            <button
              on:click={() => selectAnswer(index)}
              disabled={showResult}
              class="group p-4 sm:p-6 text-left bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white transition-all duration-300 {selectedAnswer === index ? 'ring-2 ring-blue-400 bg-blue-500/20' : ''} {showResult && index === questions[currentQuestion].correct ? 'ring-2 ring-green-400 bg-green-500/20' : ''} {showResult && selectedAnswer === index && index !== questions[currentQuestion].correct ? 'ring-2 ring-red-400 bg-red-500/20' : ''}"
            >
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div class="text-sm sm:text-base md:text-lg flex-1">{option}</div>
                {#if showResult && index === questions[currentQuestion].correct}
                  <div class="ml-auto text-green-400 flex-shrink-0">✓</div>
                {:else if showResult && selectedAnswer === index && index !== questions[currentQuestion].correct}
                  <div class="ml-auto text-red-400 flex-shrink-0">✗</div>
                {/if}
              </div>
            </button>
          {/each}
        </div>

        <!-- Result Explanation -->
        {#if showResult}
          <div in:fade={{ duration: 300 }} class="max-w-2xl mx-auto text-center">
            <div class="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white">
              <div class="text-lg mb-2">
                {selectedAnswer === questions[currentQuestion].correct ? '🎉 Correct!' : '❌ Incorrect'}
              </div>
              <p class="text-white/80">{questions[currentQuestion].explanation}</p>
            </div>
          </div>
        {:else if selectedAnswer !== null}
          <div class="text-center">
            <button
              on:click={nextQuestion}
              class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 rounded-2xl text-white font-bold transition-all duration-300"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        {/if}

        <!-- Keyboard Hints -->
        {#if !showResult}
          <div class="mt-12 text-center text-sm text-white/40 space-y-1">
            <div>Press 1-4 to select answers</div>
            <div>Press Enter to continue</div>
          </div>
        {/if}

      {:else}
        <!-- Quiz Complete -->
        <div in:fly={{ y: 50, duration: 500 }} class="text-center">
          <div class="text-8xl mb-8">
            {score === questions.length ? '🏆' : score >= questions.length * 0.75 ? '🎉' : score >= questions.length * 0.5 ? '👍' : '🤔'}
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Quiz Complete!
          </h1>
          
          <div class="text-2xl text-white/80 mb-8">
            {getScoreMessage()}
          </div>
          
          <div class="text-6xl font-bold mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {score}/{questions.length}
            </span>
          </div>
          
          <div class="flex items-center justify-center gap-4">
            <button
              on:click={restartQuiz}
              class="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white transition-all duration-300"
            >
              Try Again
            </button>
            
            <button
              on:click={() => goto('/learn')}
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 rounded-2xl text-white font-bold transition-all duration-300"
            >
              Review History
            </button>
            
            <button
              on:click={() => goto('/start')}
              class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 rounded-2xl text-white font-bold transition-all duration-300"
            >
              Start Over
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>