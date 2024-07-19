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
