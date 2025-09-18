<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';

  // Quiz state
  let quizState = 'setup'; // setup -> playing -> reviewing -> finished
  let currentQuestionIndex = 0;
  let selectedAnswer = null;
  let userAnswers = [];
  let score = 0;
  let timeLeft = 0;
  let timer = null;
  let questions = [];
  let loading = false;
  let error = null;

  // Quiz settings
  let selectedCategory = 'citizenship';
  let selectedDifficulty = 'easy';
  let numQuestions = 10;
  let timeLimit = 300; // 5 minutes

  // UI state
  let showConfetti = false;
  let streakCount = 0;
  let currentStreak = 0;

  $: currentQuestion = questions[currentQuestionIndex];
  $: progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  $: timeProgress = timeLimit > 0 ? (timeLeft / timeLimit) * 100 : 100;

  const categories = [
    { value: 'citizenship', label: '🏛️ Citizenship Basics', description: 'Core civics knowledge' },
    { value: 'current_politics', label: '🗳️ Current Politics', description: 'Recent political events' }
  ];

  const difficulties = [
    { value: 'easy', label: '🟢 Easy', description: 'Basic knowledge' },
    { value: 'medium', label: '🟡 Medium', description: 'Intermediate level' },
    { value: 'hard', label: '🔴 Hard', description: 'Advanced topics' }
  ];

  async function startQuiz() {
    loading = true;
    error = null;
    
    try {
      const response = await fetch(`/api/quiz-questions?category=${selectedCategory}&difficulty=${selectedDifficulty}&limit=${numQuestions}`);
      const data = await response.json();
      
      if (data.success) {
        questions = data.questions;
        quizState = 'playing';
        currentQuestionIndex = 0;
        selectedAnswer = null;
        userAnswers = [];
        score = 0;
        streakCount = 0;
        currentStreak = 0;
        
        // Start timer
        timeLeft = timeLimit;
        startTimer();
      } else {
        error = data.error || 'Failed to load questions';
      }
    } catch (err) {
      error = 'Network error. Please try again.';
      console.error('Quiz loading error:', err);
    } finally {
      loading = false;
    }
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        finishQuiz();
      }
    }, 1000);
  }

  function handleAnswer(answerIndex) {
    if (selectedAnswer !== null || quizState !== 'playing') return;
    
    selectedAnswer = answerIndex;
    const isCorrect = answerIndex === currentQuestion.correct;
    
    userAnswers.push({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correct,
      isCorrect,
      options: currentQuestion.options
    });

    if (isCorrect) {
      score++;
      currentStreak++;
      if (currentStreak > streakCount) {
        streakCount = currentStreak;
      }
    } else {
      currentStreak = 0;
    }

    quizState = 'reviewing';
    
    // Auto-advance after showing result
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 2000);
  }

  function nextQuestion() {
    currentQuestionIndex++;
    selectedAnswer = null;
    quizState = 'playing';
  }

  function finishQuiz() {
    if (timer) clearInterval(timer);
    quizState = 'finished';
    
    // Show confetti for good scores
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
      showConfetti = true;
      setTimeout(() => showConfetti = false, 3000);
    }
  }

  function restartQuiz() {
    quizState = 'setup';
    questions = [];
    loading = false;
    error = null;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function getScoreMessage() {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🏆 Perfect! You're ready for citizenship!";
    if (percentage >= 90) return "🎉 Excellent! Outstanding civic knowledge!";
    if (percentage >= 80) return "👏 Great job! You know your civics!";
    if (percentage >= 70) return "👍 Good work! Keep studying!";
    if (percentage >= 60) return "📚 Not bad! Review the basics.";
    return "🤔 Time to hit the books! Democracy needs informed citizens.";
  }

  function getDifficultyColor(difficulty) {
    switch(difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  }

  onMount(() => {
    const handleKeydown = (e) => {
      if (quizState === 'playing' && selectedAnswer === null) {
        if (e.key >= '1' && e.key <= '4') {
          handleAnswer(parseInt(e.key) - 1);
        }
      }
      if (e.key === 'Escape') {
        goto('/crisis');
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      if (timer) clearInterval(timer);
    };
  });
</script>

<svelte:head>
  <title>American Citizenship Quiz - Am I The Idiot?</title>
  <meta name="description" content="Test your knowledge of American civics and citizenship with this engaging quiz." />
</svelte:head>

<div
  class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
>
  <!-- Confetti Animation -->
  {#if showConfetti}
    <div class="fixed inset-0 pointer-events-none z-50">
      {#each Array(50) as _, i}
        <div
          class="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-bounce"
          style="
            left: {Math.random() * 100}%;
            top: {Math.random() * 100}%;
            animation-delay: {Math.random() * 2}s;
            animation-duration: {1 + Math.random()}s;
          "
        ></div>
      {/each}
    </div>
  {/if}

  <!-- Header -->
  <header class="relative z-20 p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <button
        on:click={() => goto('/crisis')}
        class="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
      >
        <svg
          class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="hidden sm:inline">Back to Crisis</span>
        <span class="sm:hidden">Back</span>
      </button>

      <div class="text-center">
        <h1 class="text-lg font-bold text-white sm:text-xl lg:text-2xl">Citizenship Quiz</h1>
        <p class="text-xs text-white/60 sm:text-sm">Test your civic knowledge</p>
      </div>

      {#if quizState === 'playing' || quizState === 'reviewing'}
        <div class="text-right">
          <div class="text-sm font-bold text-white">Score: {score}/{questions.length}</div>
          <div class="text-xs text-white/60">⏱️ {formatTime(timeLeft)}</div>
        </div>
      {:else}
        <div class="w-16"></div>
      {/if}
    </div>
  </header>

  <!-- Main Content -->
  <main class="relative z-10 flex min-h-[80vh] items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-4xl">
      
      <!-- Quiz Setup -->
      {#if quizState === 'setup'}
        <div in:fade={{ duration: 500 }} class="text-center">
          <div class="mb-8">
            <h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">🇺🇸 Ready to Test Your Civic Knowledge?</h2>
            <p class="text-xl text-slate-300">Take the American citizenship quiz and see how well you know your country!</p>
          </div>

          <div class="mx-auto max-w-2xl space-y-6">
            <!-- Category Selection -->
            <div class="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
              <h3 class="mb-4 text-xl font-semibold text-white">Choose Your Challenge</h3>
              <div class="grid gap-3 sm:grid-cols-2">
                {#each categories as category}
                  <button
                    on:click={() => selectedCategory = category.value}
                    class="rounded-2xl border p-4 text-left transition-all duration-300 {selectedCategory === category.value 
                      ? 'border-blue-500 bg-blue-500/20 text-white' 
                      : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'}"
                  >
                    <div class="text-lg font-medium">{category.label}</div>
                    <div class="text-sm opacity-70">{category.description}</div>
                  </button>
                {/each}
              </div>
            </div>

            <!-- Difficulty Selection -->
            <div class="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
              <h3 class="mb-4 text-xl font-semibold text-white">Difficulty Level</h3>
              <div class="grid gap-3 sm:grid-cols-3">
                {#each difficulties as difficulty}
                  <button
                    on:click={() => selectedDifficulty = difficulty.value}
                    class="rounded-2xl border p-4 text-center transition-all duration-300 {selectedDifficulty === difficulty.value 
                      ? 'border-green-500 bg-green-500/20 text-white' 
                      : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'}"
                  >
                    <div class="text-lg font-medium">{difficulty.label}</div>
                    <div class="text-sm opacity-70">{difficulty.description}</div>
                  </button>
                {/each}
              </div>
            </div>

            <!-- Quiz Settings -->
            <div class="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
              <h3 class="mb-4 text-xl font-semibold text-white">Quiz Settings</h3>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-white/80 mb-2">Number of Questions</label>
                  <select bind:value={numQuestions} class="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl">
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                    <option value={20}>20 Questions</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-white/80 mb-2">Time Limit</label>
                  <select bind:value={timeLimit} class="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl">
                    <option value={180}>3 Minutes</option>
                    <option value={300}>5 Minutes</option>
                    <option value={600}>10 Minutes</option>
                    <option value={0}>No Limit</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Start Button -->
            <button
              on:click={startQuiz}
              disabled={loading}
              class="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
            >
              {#if loading}
                <div class="flex items-center justify-center gap-2">
                  <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Loading Questions...
                </div>
              {:else}
                🚀 Start Quiz
              {/if}
            </button>

            {#if error}
              <div class="rounded-2xl border border-red-500/50 bg-red-500/20 p-4 text-red-200">
                ❌ {error}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Quiz Playing -->
      {#if quizState === 'playing' || quizState === 'reviewing'}
        <div class="space-y-6">
          <!-- Progress Bars -->
          <div class="space-y-3">
            <!-- Question Progress -->
            <div class="flex items-center justify-between text-sm text-white/80">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>Streak: {currentStreak} 🔥</span>
            </div>
            <div class="h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style="width: {progress}%;"
              ></div>
            </div>
            
            <!-- Time Progress -->
            {#if timeLimit > 0}
              <div class="h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  class="h-full rounded-full transition-all duration-1000 {timeLeft < 30 ? 'bg-red-500' : timeLeft < 60 ? 'bg-yellow-500' : 'bg-green-500'}"
                  style="width: {timeProgress}%;"
                ></div>
              </div>
            {/if}
          </div>

          {#key currentQuestionIndex}
            <div in:fly={{ y: 30, duration: 400, easing: quintOut }} class="space-y-6">
              <!-- Question -->
              <div class="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl text-center">
                <div class="mb-2 text-sm {getDifficultyColor(currentQuestion.difficulty)} font-medium">
                  {currentQuestion.difficulty.toUpperCase()} • {currentQuestion.category.toUpperCase()}
                </div>
                <h2 class="text-2xl font-bold text-white sm:text-3xl">
                  {currentQuestion.question}
                </h2>
              </div>

              <!-- Answer Options -->
              <div class="grid gap-3 sm:grid-cols-2">
                {#each currentQuestion.options as option, index}
                  <button
                    on:click={() => handleAnswer(index)}
                    disabled={quizState === 'reviewing'}
                    class="group relative rounded-2xl border p-4 text-left transition-all duration-300 {
                      quizState === 'reviewing' 
                        ? selectedAnswer === index
                          ? index === currentQuestion.correct
                            ? 'border-green-500 bg-green-500/20 text-green-100'
                            : 'border-red-500 bg-red-500/20 text-red-100'
                          : index === currentQuestion.correct
                            ? 'border-green-500 bg-green-500/20 text-green-100'
                            : 'border-white/20 bg-white/5 text-white/60'
                        : 'border-white/20 bg-white/5 text-white hover:border-blue-500 hover:bg-blue-500/20 hover:scale-105 cursor-pointer'
                    }"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-full border border-current text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div class="flex-1 text-lg">{option}</div>
                      {#if quizState === 'reviewing'}
                        {#if index === currentQuestion.correct}
                          <div class="text-green-400">✓</div>
                        {:else if selectedAnswer === index}
                          <div class="text-red-400">✗</div>
                        {/if}
                      {/if}
                    </div>
                  </button>
                {/each}
              </div>

              <!-- Keyboard Hint -->
              {#if quizState === 'playing'}
                <div class="text-center text-sm text-white/40">
                  Press 1-4 or click to answer
                </div>
              {/if}
            </div>
          {/key}
        </div>
      {/if}

      <!-- Quiz Results -->
      {#if quizState === 'finished'}
        <div in:scale={{ duration: 500, easing: elasticOut }} class="text-center">
          <div class="mb-8">
            <div class="mb-4 text-6xl">
              {#if (score / questions.length) >= 0.9}🏆
              {:else if (score / questions.length) >= 0.8}🎉
              {:else if (score / questions.length) >= 0.7}👏
              {:else if (score / questions.length) >= 0.6}👍
              {:else}📚{/if}
            </div>
            <h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">Quiz Complete!</h2>
            <p class="text-xl text-slate-300">{getScoreMessage()}</p>
          </div>

          <div class="mx-auto max-w-2xl space-y-6">
            <!-- Score Summary -->
            <div class="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
              <div class="grid gap-4 sm:grid-cols-3">
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-400">{score}</div>
                  <div class="text-sm text-white/60">Correct</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-purple-400">{Math.round((score / questions.length) * 100)}%</div>
                  <div class="text-sm text-white/60">Score</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-400">{streakCount}</div>
                  <div class="text-sm text-white/60">Best Streak</div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-3 sm:flex-row">
              <button
                on:click={restartQuiz}
                class="flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                🔄 Try Again
              </button>
              <button
                on:click={() => goto('/crisis')}
                class="flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
              >
                📚 Learn More
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </main>

  <!-- Instructions -->
  <div class="relative z-10 p-4 text-center text-sm text-white/40">
    <p>Press ESC to go back • Use keyboard numbers 1-4 to answer quickly</p>
  </div>
</div>
