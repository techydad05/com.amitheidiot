<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let questions = [];
	export let timeLimit = 30;

	let currentQuestion = writable(0);
	let score = writable(0);
	let timer = writable(timeLimit);
	let interval;

	const startTimer = () => {
		clearInterval(interval);
		timer.set(timeLimit);
		interval = setInterval(() => {
			timer.update((n) => {
				if (n > 1) {
					return n - 1;
				} else {
					nextQuestion();
					return timeLimit;
				}
			});
		}, 1000);
	};

	const nextQuestion = () => {
		currentQuestion.update((n) => n + 1);
		if ($currentQuestion < questions.length) {
			startTimer();
		} else {
			clearInterval(interval);
		}
	};

	const answerQuestion = (index) => {
		if (index === questions[$currentQuestion].correct) {
			score.update((n) => n + 1);
		}
		nextQuestion();
	};

	onMount(() => {
		startTimer();
	});
</script>

<div class="container mx-auto p-4">
	{#if $currentQuestion < questions.length}
		<div class="question-box">
			<div class="question">
				<h2>{questions[$currentQuestion].question}</h2>
			</div>
			<div class="answers grid grid-cols-2 gap-4">
				{#each questions[$currentQuestion].answers as answer, i}
					<button class="btn btn-primary" on:click={() => answerQuestion(i)}>{answer}</button>
				{/each}
			</div>
			<div class="timer w-full bg-gray-200">
				<div class="h-4 bg-blue-500" style="width: {($timer / timeLimit) * 100}%"></div>
			</div>
		</div>
	{:else}
		<div class="results text-center">
			<h2>Quiz Completed!</h2>
			<p>Your score is {$score} out of {questions.length}</p>
			{#if $score / questions.length >= 0.75}
				<p>Congratulations! You scored above 75%.</p>
			{:else}
				<p>Keep practicing and try again!</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.timer div {
		transition: width 0.3s ease;
	}
	.timer div::after {
		content: '';
		position: absolute;
		top: -10px;
		left: 0;
		right: 0;
		height: 4px;
		background: red;
		animation: grow 30s linear;
	}
	@keyframes grow {
		0% {
			width: 100%;
			height: 100%;
		}
		100% {
			width: 300%;
			height: 300%;
		}
	}
</style>
<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let showQuiz = false;
  let currentQuestionIndex = 0;
  let selectedAnswer = null;

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctIndex: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctIndex: 0
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctIndex: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctIndex: 3
    },
    {
      question: "Which of these is not a primary color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctIndex: 2
    }
  ];

  function startQuiz() {
    showQuiz = true;
  }

  function handleSubmit() {
    // Handle form submission (to be implemented)
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
  {#if !showQuiz}
    <button class="btn btn-primary btn-lg" on:click={startQuiz} transition:fade>
      Begin
    </button>
  {:else}
    <div class="card w-96 bg-base-100 shadow-xl" transition:fade>
      <form on:submit|preventDefault={handleSubmit} class="card-body">
        <h2 class="card-title mb-4">{questions[currentQuestionIndex].question}</h2>
        {#each questions[currentQuestionIndex].options as option, index}
          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="answer"
                class="radio"
                bind:group={selectedAnswer}
                value={index}
              />
              <span class="label-text ml-2">{option}</span>
            </label>
          </div>
        {/each}
        <div class="card-actions justify-end mt-4">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  {/if}
</div>
