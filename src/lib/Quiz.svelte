<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let showConfirmation = false;
	let showQuiz = false;
	let currentQuestionIndex = 0;
	let selectedAnswer = null;

	const questions = [
		{
			question: 'What is the capital of France?',
			options: ['London', 'Berlin', 'Paris', 'Madrid'],
			correctIndex: 2
		},
		{
			question: 'Which planet is known as the Red Planet?',
			options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
			correctIndex: 0
		},
		{
			question: 'Who painted the Mona Lisa?',
			options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
			correctIndex: 1
		},
		{
			question: 'What is the largest ocean on Earth?',
			options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
			correctIndex: 3
		},
		{
			question: 'Which of these is not a primary color?',
			options: ['Red', 'Blue', 'Green', 'Yellow'],
			correctIndex: 2
		}
	];

	function showConfirmationCard() {
		showConfirmation = true;
	}

	function startQuiz() {
		showConfirmation = false;
		showQuiz = true;
	}

	function handleSubmit() {
		// Handle form submission (to be implemented)
	}
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center">
	<div transition:fade>
		{#if !showConfirmation && !showQuiz}
			<button class="btn btn-primary btn-lg" on:click={showConfirmationCard}> Begin </button>
		{:else if showConfirmation}
			<div class="card bg-base-100 w-96 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-4">Are you sure?</h2>
					<p>You are about to start the quiz. Are you ready?</p>
					<div class="card-actions mt-4 justify-end">
						<button class="btn btn-primary" on:click={startQuiz}>Yes!</button>
					</div>
				</div>
			</div>
		{:else}
			<div class="card bg-base-100 w-96 shadow-xl">
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
					<div class="card-actions mt-4 justify-end">
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</form>
			</div>
		{/if}
	</div>
</div>
