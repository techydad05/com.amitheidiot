<script>
  // @ts-nocheck
  import { fade, fly, scale, blur } from 'svelte/transition';
  import { createEventDispatcher, onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { confetti } from '@neoconfetti/svelte';
  import { page } from '$app/stores';
  import { elasticOut, quintOut } from 'svelte/easing';
  import QRCode from './QRCode.svelte';

  export let questions = [];
  export let timeLimit = 30; // in seconds
  export let numQuestions = 1;

  let activeQuestions = [];
  let currentQuestion = null;

  function initializeQuestions() {
    if (questions.length > 0) {
      // Create a new copy of questions and shuffle them
      const shuffledQuestions = [...questions];
      shuffleArray(shuffledQuestions);
      // Select only the number of questions we need
      activeQuestions = shuffledQuestions.slice(
        0,
        Math.min(numQuestions, shuffledQuestions.length)
      );
      currentQuestion = activeQuestions[currentQuestionIndex] || null;
    }
  }

  $: if (questions.length > 0 && activeQuestions.length === 0) {
    initializeQuestions();
  }

  $: currentQuestion = activeQuestions[currentQuestionIndex] || null;
  export let buttonClass =
    'btn glass text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content';

  const dispatch = createEventDispatcher();

  let currentState = 'countdown';
  let currentQuestionIndex = 0;
  let selectedAnswer = null;
  let score = 0;
  let timer;
  let remainingTime;
  let qrCodeSvg = '';
  let showAward = false;
  let missedQuestions = [];
  let url = '';
  let showConfetti = false;
  let result = { verificationToken: null };
let isSaving = false;
  let userAnswers = [];

  const passingScore = 0.8; // 80% to pass

  // Fun emoji reactions based on score
  function getEmojiReaction(percentage) {
    if (percentage < 0.2) return '🤦‍♂️';
    if (percentage < 0.4) return '😬';
    if (percentage < 0.6) return '🤔';
    if (percentage < 0.8) return '📚';
    if (percentage < 0.9) return '🎓';
    return '🧠✨';
  }

  // Fun facts about education and democracy
  const funFacts = [
    "Did you know? In ancient Athens, citizens who didn't participate in democracy were called 'idiotes' - that's where we get the word 'idiot'!",
    'Fun fact: The U.S. ranks 31st in global education. Maybe we should fix that? 🤔',
    "Interesting: Studies show that informed citizens make better decisions. Who would've thought? 😉",
    'Did you know? The more educated a population is, the stronger their democracy becomes. Science! 🔬',
    "Fun fact: You're more likely to be fooled by fake news if you can't pass basic civics tests. Just saying! 📱",
  ];

  function getRandomFunFact() {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
  }

  // Snarky streak messages
  function getStreakMessage(correct) {
    if (correct) {
      return [
        'Not bad, keep it up! 👍',
        "You're on fire! 🔥",
        'Okay, we see you! 👀',
        'Knowledge is power! 💪',
      ][Math.floor(Math.random() * 4)];
    }
    return [
      'Oops! Time to hit the books! 📚',
      "That's... interesting... 🤨",
      "Really? That's your answer? 😅",
      'Maybe Google it next time? 🔍',
    ][Math.floor(Math.random() * 4)];
  }

  let correctStreak = 0;
  let showStreakMessage = '';
  let streakTimeout;
  let progress = 0;
  
  $: {
    // Calculate progress based on current question
    if (currentState === 'quiz' && activeQuestions.length > 0) {
      progress = (currentQuestionIndex / activeQuestions.length) * 100;
    }
  }

  function updateStreak(isCorrect) {
    if (isCorrect) {
      correctStreak++;
      showStreakMessage = getStreakMessage(true);
    } else {
      correctStreak = 0;
      showStreakMessage = getStreakMessage(false);
    }
    clearTimeout(streakTimeout);
    streakTimeout = setTimeout(() => (showStreakMessage = ''), 2000);
  }

  function getFeedbackMessage(percentage) {
    if (percentage < 0.2) {
      return {
        message:
          "Your level of ignorance is actively contributing to society's problems. This isn't just about being uninformed - you're part of why democracy struggles. Start educating yourself immediately.",
        class: 'text-error font-bold',
      };
    } else if (percentage < 0.3) {
      return {
        message:
          'Seriously concerning. Your lack of basic knowledge makes you vulnerable to manipulation and misinformation. You need to start taking education seriously.',
        class: 'text-error',
      };
    } else if (percentage < 0.4) {
      return {
        message:
          "This is pretty bad. You're exactly who politicians love - uninformed and easily swayed. Time to wake up and start learning.",
        class: 'text-error',
      };
    } else if (percentage < 0.5) {
      return {
        message:
          "You're below average, and that's saying something. America's education system might be struggling, but you're not helping. Do better.",
        class: 'text-warning font-bold',
      };
    } else if (percentage < 0.6) {
      return {
        message:
          "Mediocre at best. You're floating by with minimal understanding. Is this really the best you can do?",
        class: 'text-warning',
      };
    } else if (percentage < 0.7) {
      return {
        message:
          "Getting there, but still not great. You're showing signs of awareness, but you need to push harder.",
        class: 'text-warning',
      };
    } else if (percentage < 0.8) {
      return {
        message:
          "Almost there. You're better than most, but that's a low bar. Keep pushing yourself to learn more.",
        class: 'text-info',
      };
    } else if (percentage < 0.9) {
      return {
        message:
          "Good job! You're actually informed. Now help educate others - we need more people like you.",
        class: 'text-success',
      };
    } else {
      return {
        message:
          "Exceptional! You're the kind of informed citizen democracy needs. Keep learning and help combat ignorance in others.",
        class: 'text-success font-bold',
      };
    }
  }

  $: progress = (currentQuestionIndex / numQuestions) * 100;

  // function generateRandomString(length) {
  //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     let result = '';
  //     for (let i = 0; i < length; i++) {
  //         result += characters.charAt(Math.floor(Math.random() * characters.length));
  //     }
  //     return result;
  // }

  // Handle quiz result submission using SvelteKit action
  async function handleQuizSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.type === 'success' && result.id) {
        // Generate QR code
        const baseUrl = window.location.origin;
        const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
        const finalBaseUrl = isLocalhost ? baseUrl : 'https://amitheidiot.com';
        const resultUrl = `${finalBaseUrl}/result/${result.id}`;

        // Create QR code
        const qr = new QRCode({
          content: resultUrl,
          padding: 4,
          width: 256,
          height: 256,
          color: '#000000',
          background: '#ffffff',
          ecl: 'M',
        });

        qrCodeSvg = qr.svg();
        showAward = true;
        showConfetti = true;
        setTimeout(() => (showConfetti = false), 5000);
      }
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
  }
  //         // For production, use amitheidiot.com
  //         const finalBaseUrl = isLocalhost ? baseUrl : 'https://amitheidiot.com';

  //         const resultUrl = `${finalBaseUrl}/result/${quizId}`;
  //         url = resultUrl;

  //         const qr = new QRCode({
  //             content: resultUrl,
  //             padding: 2,
  //             width: 256,
  //             height: 256,
  //             color: '#000000',
  //             background: '#ffffff',
  //             ecl: 'M' // Error correction level: L, M, Q, H
  //         });
  //         qrCodeSvg = qr.svg();
  //     }
  //     return quizId;
  // }

  let countdownTime = 5;
  let countdownTimer;

  function startCountdown() {
    countdownTime = 5;
    countdownTimer = setInterval(() => {
      countdownTime--;
      if (countdownTime < 0) {
        clearInterval(countdownTimer);
        setTimeout(() => {
          currentState = 'quiz';
          startTimer();
        }, 300); // Make quiz appear faster after GO!
      }
    }, 1000);
  }

  onMount(() => {
    if (questions.length === 0) {
      alert('No questions available. Please try again later.');
      return;
    }
    initializeQuestions();
    startCountdown();
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startTimer() {
    remainingTime = timeLimit;
    timer = setInterval(() => {
      remainingTime--;
      if (remainingTime <= 0) {
        clearInterval(timer);
        handleSubmit();
      }
    }, 1000);
  }

  // Handle submitting an answer
  async function handleSubmit() {
    clearInterval(timer);
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;

    // Update score and streak
    if (!isCorrect) {
      missedQuestions.push(currentQuestion.question);
      updateStreak(false);
    } else {
      score++;
      updateStreak(true);
    }

    selectedAnswer = null;

    // Move to next question or end quiz
    if (currentQuestionIndex < activeQuestions.length - 1) {
      currentQuestionIndex++;
      startTimer();
    } else {
      currentState = 'results';
    }
  }

  function generateQRCode(token) {
    if (!token) {
      console.error('No token provided for QR code');
      return;
    }

    // Ensure token is a string
    const tokenString = String(token);
    console.log('Generating QR code for token:', tokenString);

    // Create URL that will open results page with verification code
    const origin = $page.url.origin; // This will automatically use the correct host
    const resultsUrl = `${origin}/results?verify=${tokenString}`;
    console.log('Generated results URL:', resultsUrl);

    // Generate QR code with the results URL
    const qr = new QRCode({
      content: resultsUrl,
      padding: 4,
      width: 256,
      height: 256,
      color: '#000000',
      background: '#ffffff',
      ecl: 'H', // Highest error correction for better scanning
    });

    qrCodeSvg = qr.svg();
    url = resultsUrl; // Store URL for display
  }

  function restartQuiz() {
    // Reset all quiz state
    currentState = 'countdown';
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    missedQuestions = [];
    selectedAnswer = null;
    showAward = false;
    qrCodeSvg = '';
    url = '';
    result = { verificationToken: null };
    showConfetti = false;
    correctStreak = 0;
    showStreakMessage = '';
    clearTimeout(streakTimeout);
    // Re-initialize questions to get a new random set
    initializeQuestions();
    dispatch('restartQuiz');
    startCountdown();
  }

  // Handle form submission result
  function handleSave() {
    isSaving = true;
    return async ({ result: actionResult, error }) => {
      console.log('Action result:', actionResult);
      console.log('Action error:', error);
      isSaving = false;

      if (error) {
        console.error('Failed to save quiz results:', error);
        alert('Failed to save quiz results. Please try again.');
        return;
      }

      // Handle nested response from SvelteKit
      const data = actionResult?.data || actionResult;
      console.log('Processing response data:', data);

      if (!data?.verificationToken) {
        console.error('No verification token in response:', data);
        alert('Failed to get verification token. Please try again.');
        return;
      }

      result = {
        type: 'success',
        id: data.id,
        verificationToken: data.verificationToken,
      };
      console.log('Setting result:', result);
      generateQRCode(result.verificationToken);
      showAward = true;
      showConfetti = true;
      setTimeout(() => (showConfetti = false), 5000);
    };
  }
</script>

<div class="card relative mx-auto w-full max-w-md bg-base-100 shadow-xl">
  {#if !showAward}
    <div class="card-body p-6">
      {#if currentState === 'countdown'}
        <div class="relative flex h-48 flex-col items-center justify-center gap-4">
          <h2 class="text-3xl font-bold">Get Ready!</h2>
          <div class="flex items-center justify-center">
            <p class="text-8xl font-bold {countdownTime > 0 ? 'text-primary' : 'text-success'}">
              {countdownTime > 0 ? countdownTime : 'GO!'}
            </p>
          </div>
          <button
            class="btn btn-ghost btn-sm font-normal normal-case hover:btn-error"
            on:click={() => dispatch('escape')}
          >
            <span class="flex items-center gap-1"> 🏃‍♂️ I need more time to study! </span>
          </button>
        </div>
      {:else if currentState === 'quiz'}

        <div class="mb-2 flex items-center justify-between text-sm">
          <div class="flex items-center gap-4">
            <button class="btn btn-ghost btn-sm gap-1" on:click={() => dispatch('escape')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Menu
            </button>
          </div>
          <div class="flex items-center gap-4">
            <div class="badge badge-neutral">
              Question {currentQuestionIndex + 1}/{activeQuestions.length}
            </div>
            {#if remainingTime > 0}
              <div 
                class="badge {remainingTime <= 5 ? 'badge-error text-lg' : remainingTime <= 10 ? 'badge-warning' : 'badge-primary'} transition-all duration-300"
                style="transform: scale({remainingTime <= 5 ? 1.5 : 1}); {remainingTime <= 5 ? 'animation: pulse 1s infinite;' : ''}"
              >
                {remainingTime}s
              </div>
            {/if}
          </div>
        </div>
        <progress class="progress progress-primary mb-4 w-full" value={progress} max="100"
        ></progress>
        {#if showStreakMessage}
          <div class="mb-2 animate-bounce text-center text-lg font-semibold">
            {showStreakMessage}
          </div>
        {/if}
        {#if correctStreak >= 3}
          <div class="mb-2 text-center text-sm text-primary">
            🔥 {correctStreak} Correct in a row! 🔥
          </div>
        {/if}
        {#if currentQuestion}
          <div class="mb-3 flex w-full items-center justify-between"
            in:fly={{y: 20, duration: 400, delay: 200}}
            out:fly={{y: -20, duration: 200}}
          >
            <h3 class="text-lg font-semibold">{currentQuestion.question}</h3>
            {#if correctStreak >= 3}
              <div class="badge badge-accent animate-bounce" in:scale>
                🔥 {correctStreak} streak!
              </div>
            {/if}
          </div>
          <div class="mb-4 space-y-2">
            {#each currentQuestion.options as option, index}
              <label
                class="hover:scale-102 flex transform cursor-pointer items-center rounded-lg p-2 transition-all duration-200 hover:bg-base-200"
                in:fly={{ y: 20, duration: 400, delay: 300 + index * 100 }}
                out:fly={{ y: 20, duration: 200, delay: index * 50 }}
              >
                <input
                  type="radio"
                  name="answer"
                  class="radio-primary radio radio-sm mr-2"
                  bind:group={selectedAnswer}
                  value={index}
                />
                <span class="text-sm">{option}</span>
              </label>
            {/each}
          </div>
        {:else}
          <div class="p-4 text-center">
            <p>Loading question...</p>
          </div>
        {/if}
        <button class={buttonClass} on:click={handleSubmit} disabled={selectedAnswer === null}>
          Submit
        </button>
      {:else if currentState === 'results'}
        <h2 class="card-title mb-4 text-xl">Quiz Results</h2>
        <div class="stats mb-6 w-full shadow">
          <div class="stat">
            <div class="stat-title">Your Score</div>
            <div class="stat-value flex items-center justify-center gap-2">
              {score}/{activeQuestions.length}
              <span class="text-4xl">{getEmojiReaction(score / activeQuestions.length)}</span>
            </div>
            <div class="stat-desc">{Math.round((score / activeQuestions.length) * 100)}%</div>
          </div>
        </div>
        <div class="mb-4 text-center text-sm italic text-base-content/70">{getRandomFunFact()}</div>
        {@const feedback = getFeedbackMessage(score / activeQuestions.length)}
        <div class="mb-6 rounded-lg bg-base-200 p-4">
          <p class="{feedback.class} text-lg leading-relaxed">{feedback.message}</p>
        </div>

        {#if score / activeQuestions.length >= 0.8}
          <form method="POST" action="?/saveQuiz" use:enhance={handleSave} class="w-full">
            <input type="hidden" name="score" value={score} />
            <input type="hidden" name="totalQuestions" value={activeQuestions.length} />
            <input type="hidden" name="missedQuestions" value={JSON.stringify(missedQuestions)} />

            <button type="submit" class="{buttonClass} mb-4 w-full" disabled={isSaving}>
              {#if isSaving}
                <span class="loading loading-spinner loading-sm mr-2"></span>
                Generating Certificate...
              {:else}
                Add to Leaderboard
              {/if}
            </button>
          </form>
        {/if}

        <div class="flex gap-4">
          <button class={buttonClass} on:click={restartQuiz}> Try Again </button>
          <button class={buttonClass} on:click={() => dispatch('escape')}> Exit </button>
        </div>
      {/if}
    </div>
  {:else}
    <div class="card-body bg-gradient-to-br from-yellow-300 to-yellow-500 p-6" transition:fade>
      <div class="text-center">
        <button 
          class="btn btn-sm absolute top-2 left-2" 
          on:click={() => showAward = false}
        >
          ←
        </button>
        <h2 class="mb-4 text-3xl font-bold text-white">Certificate of Completion</h2>
        <p class="mb-6 text-xl text-white">
          This certifies that you have completed the "Am I The Idiot?" quiz
        </p>
        <div class="mb-6">
          <p class="text-2xl font-bold text-white">Score: {score}/{activeQuestions.length}</p>
        </div>
        {#if result?.verificationToken}
          <div class="flex flex-col items-center gap-6">
            <div class="alert alert-info max-w-sm border-none bg-white/20 text-white">
              <div class="flex w-full flex-col items-center">
                <p class="mb-2 text-lg font-bold">Your Verification Code</p>
                <p
                  class="w-full select-all rounded bg-white/10 p-3 text-center font-mono text-xl tracking-wider"
                >
                  {result.verificationToken}
                </p>
                <p class="mt-2 text-sm">Use this code to claim your result on the leaderboard</p>
              </div>
            </div>

            {#if qrCodeSvg}
              <div class="text-center">
                <p class="mb-2 text-white">Scan to add name to results:</p>
                <div class="inline-block rounded-lg bg-white p-4 shadow-lg">
                  {@html qrCodeSvg}
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

{#if showConfetti}
  <div class="pointer-events-none fixed inset-0">
    <canvas use:confetti></canvas>
  </div>
{/if}

<style>
  @keyframes pulse {
    0% {
      transform: scale(1.5);
    }
    50% {
      transform: scale(1.7);
    }
    100% {
      transform: scale(1.5);
    }
  }

  .streak-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 0.8;
    pointer-events: none;
    text-align: center;
    width: 100%;
    z-index: 10;
  }

  .timer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: hsl(var(--p));
    transition: width 1s linear;
  }
</style>
