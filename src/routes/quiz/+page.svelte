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
  let timeLeft = 30; // 30 seconds per question
  let timerInterval;
  let timerActive = false;

  const questions = [
    {
      question: "🏛️ What did the Greek word 'idiotes' originally mean?",
      options: [
        "A foolish person who couldn't think straight",
        "A private citizen who avoided public life",
        "A wise philosopher with deep thoughts",
        "A government official with power"
      ],
      correct: 1,
      explanation: "Plot twist! 'Idiotes' just meant someone who minded their own business instead of getting involved in politics. Basically, ancient Greek for 'I don't want to deal with this drama.'"
    },
    {
      question: "🤔 Why did ancient Greeks side-eye the 'idiotes'?",
      options: [
        "They thought they were naturally unintelligent",
        "They refused to pay their taxes",
        "They avoided participating in democracy",
        "They were always foreigners and outsiders"
      ],
      correct: 2,
      explanation: "Greeks were democracy fanatics! They believed everyone should participate in civic life. Staying home was like being that friend who never shows up to group projects."
    },
    {
      question: "🏺 Where did the real democratic action happen in Athens?",
      options: [
        "The Parthenon (fancy temple vibes)",
        "Private homes (secret meetings)",
        "The agora (public square)",
        "The gymnasium (while working out)"
      ],
      correct: 2,
      explanation: "The agora was ancient Athens' main character! It was part marketplace, part debate club, part social media - where all the civic tea was spilled."
    },
    {
      question: "🔄 How did 'idiot' go from 'private person' to 'dummy'?",
      options: [
        "It actually became more positive over time",
        "It evolved from 'private citizen' to 'foolish person'",
        "The meaning stayed exactly the same",
        "It became a term of respect and honor"
      ],
      correct: 1,
      explanation: "Over 2,000+ years, the word took a wild journey! From 'person who avoids politics' to 'complete fool.' Language evolution is messy - like a 2,000-year game of telephone!"
    },
    {
      question: "🎯 BONUS: What's the real lesson here?",
      options: [
        "Ancient Greeks were just mean to introverts",
        "Words can completely change meaning over time",
        "Democracy has always been exactly the same",
        "Only smart people should participate in politics"
      ],
      correct: 1,
      explanation: "Bingo! This whole story shows how language evolves and how context matters. What seems obvious today might have meant something totally different in the past. Mind = blown! 🤯"
    }
  ];

  function selectAnswer(index) {
    selectedAnswer = index;
  }

  function startTimer() {
    timeLeft = 30;
    timerActive = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        // Auto-submit with no answer if time runs out
        if (selectedAnswer === null) {
          selectedAnswer = -1; // Mark as no answer
        }
        nextQuestion();
      }
    }, 1000);
  }

  function stopTimer() {
    timerActive = false;
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  }

  function nextQuestion() {
    stopTimer();
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    answers.push({
      question: currentQuestion,
      selected: selectedAnswer,
      correct: isCorrect,
      timeUsed: 30 - timeLeft
    });
    
    if (isCorrect) score++;
    
    showResult = true;
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        selectedAnswer = null;
        showResult = false;
        startTimer();
      } else {
        quizComplete = true;
      }
    }, 2000);
  }

  function restartQuiz() {
    stopTimer();
    currentQuestion = 0;
    selectedAnswer = null;
    showResult = false;
    score = 0;
    answers = [];
    quizComplete = false;
    startTimer();
  }

  function getScoreMessage() {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're definitely not the idiot! 🎉";
    if (percentage >= 75) return "Great job! You know your history! 👏";
    if (percentage >= 50) return "Not bad! You're learning! 📚";
    return "Time to review the history lesson! 🤔";
  }

  onMount(() => {
    startTimer(); // Start timer when quiz begins
    
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        stopTimer();
        goto('/learn');
      }
      if (e.key >= '1' && e.key <= '4' && !showResult && !quizComplete) {
        selectAnswer(parseInt(e.key) - 1);
      }
      if (e.key === 'Enter' && selectedAnswer !== null && !showResult) {
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      stopTimer();
      window.removeEventListener('keydown', handleKeydown);
    };
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
          <!-- Cool Timer -->
          <div class="relative group">
            <div class="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden">
              <!-- Background circle -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-700"></div>
              
              <!-- Animated progress circle -->
              <svg class="w-16 h-16 transform -rotate-90 absolute" viewBox="0 0 64 64">
                <circle 
                  cx="32" 
                  cy="32" 
                  r="28" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="4" 
                  stroke-dasharray="175.93" 
                  stroke-dashoffset="{175.93 - (175.93 * timeLeft / 30)}"
                  class="transition-all duration-1000 {timeLeft <= 5 ? 'text-red-400 drop-shadow-lg' : timeLeft <= 10 ? 'text-yellow-400' : 'text-green-400'}"
                  style="filter: drop-shadow(0 0 8px currentColor);"
                />
              </svg>
              
              <!-- Timer number with pulsing effect -->
              <div class="text-white font-bold text-lg z-10 {timeLeft <= 5 ? 'animate-pulse text-red-300' : ''}">
                {timeLeft}
              </div>
              
              <!-- Glow effect when time is running out -->
              {#if timeLeft <= 5}
                <div class="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
              {/if}
            </div>
            
            <!-- Tooltip -->
            <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {timeLeft}s left
            </div>
          </div>
          
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
        <!-- Progress Bar -->
        <div class="w-full max-w-2xl mx-auto mb-8 px-4">
          <div class="bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
              style="width: {((currentQuestion + 1) / questions.length) * 100}%"
            ></div>
          </div>
          <div class="text-center text-white/60 text-sm mt-2">
            Progress: {currentQuestion + 1} of {questions.length}
          </div>
        </div>

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