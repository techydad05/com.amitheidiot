<script>
    // @ts-nocheck
	import { fade, fly } from 'svelte/transition';
	import { onMount, createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let questions = [];
	export let timeLimit = 30; // in seconds
	export let numQuestions = questions.length;

	const dispatch = createEventDispatcher();

	let showConfirmation = false;
	let showQuiz = false;
	let showResults = false;
	let currentQuestionIndex = 0;
	let selectedAnswer = null;
	let score = 0;
	let userAnswers = [];
	let timer;
	let remainingTime;
	let progress;

	$: progress = (currentQuestionIndex / numQuestions) * 100;

	const timerSize = tweened(100, {
		duration: timeLimit * 1000,
		easing: cubicOut
	});

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function showConfirmationCard() {
		showConfirmation = true;
	}

	function startQuiz() {
		showConfirmation = false;
		showQuiz = true;
		shuffleArray(questions);
		questions = questions.slice(0, numQuestions);
		startTimer();
	}

	function startTimer() {
		remainingTime = timeLimit;
		timerSize.set(100);
		timer = setInterval(() => {
			remainingTime--;
			timerSize.set(100 + (timeLimit - remainingTime) * (200 / timeLimit));
			if (remainingTime <= 0) {
				clearInterval(timer);
				handleSubmit();
			}
		}, 1000);
	}

	function handleSubmit() {
		clearInterval(timer);
		userAnswers[currentQuestionIndex] = selectedAnswer;
		if (selectedAnswer === questions[currentQuestionIndex].correctIndex) {
			score++;
		}
		selectedAnswer = null;

		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
			startTimer();
		} else {
			showResults = true;
			showQuiz = false;
			dispatch('quizComplete', { score, totalQuestions: questions.length });
		}
	}

	function restartQuiz() {
		showResults = false;
		showConfirmation = false;
		showQuiz = false;
		currentQuestionIndex = 0;
		score = 0;
		userAnswers = [];
		dispatch('restartQuiz');
	}
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
	<div class="w-full max-w-lg p-4">
		{#if !showConfirmation && !showQuiz && !showResults}
			<button class="btn btn-primary btn-lg w-full" on:click={showConfirmationCard} transition:fade>
				Begin
			</button>
		{:else if showConfirmation}
			<div class="card bg-base-100 shadow-xl" transition:fly={{ y: 200, duration: 500 }}>
				<div class="card-body">
					<h2 class="card-title mb-4">Are you sure?</h2>
					<p>You are about to start the quiz. Are you ready?</p>
					<div class="card-actions mt-4 justify-end">
						<button class="btn btn-primary" on:click={startQuiz}>Yes!</button>
					</div>
				</div>
			</div>
		{:else if showQuiz}
			<div class="card bg-base-100 shadow-xl" transition:fly={{ y: 200, duration: 500 }}>
				<div class="card-body">
					<div class="flex justify-between items-center mb-4">
						<div class="text-2xl font-bold" style="font-size: {$timerSize}%">
							{remainingTime}s
						</div>
						<div class="text-xl">
							Question {currentQuestionIndex + 1}/{questions.length}
						</div>
					</div>
					<progress class="progress progress-primary w-full mb-4" value={progress} max="100" />
					<h2 class="card-title mb-4">{questions[currentQuestionIndex].question}</h2>
					<form on:submit|preventDefault={handleSubmit}>
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
						<div class="card-actions mt-4 justify-end">
							<button type="submit" class="btn btn-primary" disabled={selectedAnswer === null}>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		{:else if showResults}
			<div class="card bg-base-100 shadow-xl" transition:fly={{ y: 200, duration: 500 }}>
				<div class="card-body">
					<h2 class="card-title mb-4">Quiz Results</h2>
					<p class="text-xl mb-4">Your score: {score}/{questions.length}</p>
					<div class="space-y-2">
						{#each questions as question, index}
							<div class="p-2 rounded {userAnswers[index] === question.correctIndex ? 'bg-success text-success-content' : 'bg-error text-error-content'}">
								<p class="font-semibold">{question.question}</p>
								<p>Your answer: {question.options[userAnswers[index]]}</p>
								<p>Correct answer: {question.options[question.correctIndex]}</p>
							</div>
						{/each}
					</div>
					<div class="card-actions mt-4 justify-end">
						<button class="btn btn-primary" on:click={restartQuiz}>Restart Quiz</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
