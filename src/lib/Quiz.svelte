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
		if (questions.length === 0) {
			alert("No questions available. Please try again later.");
			return;
		}
		showConfirmation = false;
		showQuiz = true;
		shuffleArray(questions);
		questions = questions.slice(0, Math.min(numQuestions, questions.length));
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

<div class="bg-base-200 flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md">
		{#if !showConfirmation && !showQuiz && !showResults}
			<button class="btn btn-primary btn-lg w-full text-xl py-4" on:click={showConfirmationCard} transition:fade>
				Start Quiz
			</button>
		{:else if showConfirmation}
			<div class="card bg-base-100 shadow-xl" transition:fly={{ y: 200, duration: 500 }}>
				<div class="card-body">
					<h2 class="card-title text-2xl mb-4">Ready to begin?</h2>
					<p class="text-lg mb-6">You're about to start the quiz. Good luck!</p>
					<div class="card-actions justify-center">
						<button class="btn btn-primary btn-wide text-lg" on:click={startQuiz}>Let's Go!</button>
					</div>
				</div>
			</div>
		{:else if showQuiz}
			<div class="card bg-base-100 shadow-xl" transition:fly={{ y: 200, duration: 500 }}>
				<div class="card-body p-4 sm:p-6">
					<div class="flex flex-col sm:flex-row justify-between items-center mb-4">
						<div class="text-3xl font-bold mb-2 sm:mb-0" style="font-size: {$timerSize}%">
							{remainingTime}s
						</div>
						<div class="text-xl">
							Question {currentQuestionIndex + 1}/{questions.length}
						</div>
					</div>
					<progress class="progress progress-primary w-full mb-6" value={progress} max="100" />
					{#if questions.length > 0 && questions[currentQuestionIndex]}
						<h2 class="text-2xl font-bold mb-6">{questions[currentQuestionIndex].question}</h2>
						<form on:submit|preventDefault={handleSubmit} class="space-y-4">
							{#each questions[currentQuestionIndex].options as option, index}
								<div class="form-control">
									<label class="label cursor-pointer flex items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
										<input
											type="radio"
											name="answer"
											class="radio radio-primary"
											bind:group={selectedAnswer}
											value={index}
										/>
										<span class="label-text ml-3 text-lg">{option}</span>
									</label>
								</div>
							{/each}
							<div class="card-actions mt-6 justify-center">
								<button type="submit" class="btn btn-primary btn-wide text-lg" disabled={selectedAnswer === null}>
									Submit Answer
								</button>
							</div>
						</form>
					{:else}
						<p class="text-center text-lg">No questions available. Please try again later.</p>
					{/if}
				</div>
			</div>
		{:else if showResults}
			<div class="card bg-base-100 shadow-xl" transition:fly={{ y: 200, duration: 500 }}>
				<div class="card-body p-4 sm:p-6">
					<h2 class="card-title text-3xl mb-6 text-center">Quiz Results</h2>
					<p class="text-2xl mb-6 text-center">Your score: <span class="font-bold">{score}/{questions.length}</span></p>
					<div class="space-y-4 mb-6">
						{#each questions as question, index}
							<div class="p-4 rounded-lg {userAnswers[index] === question.correctIndex ? 'bg-success/20 border-success' : 'bg-error/20 border-error'} border">
								<p class="font-semibold text-lg mb-2">{question.question}</p>
								<p class="mb-1">Your answer: <span class="{userAnswers[index] === question.correctIndex ? 'text-success' : 'text-error'} font-medium">{question.options[userAnswers[index]]}</span></p>
								<p>Correct answer: <span class="text-success font-medium">{question.options[question.correctIndex]}</span></p>
							</div>
						{/each}
					</div>
					<div class="card-actions justify-center">
						<button class="btn btn-primary btn-wide text-lg" on:click={restartQuiz}>Try Again</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
