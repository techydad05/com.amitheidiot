<script>
    // @ts-nocheck
    import { fade, slide } from 'svelte/transition';
    import { createEventDispatcher, onMount } from 'svelte';

    export let questions = [];
    export let timeLimit = 30; // in seconds
    export let numQuestions = questions.length;

    const dispatch = createEventDispatcher();

    let currentState = 'quiz';
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let score = 0;
    let userAnswers = [];
    let timer;
    let remainingTime;

    const passingScore = 0.8; // 80% to pass

    $: progress = (currentQuestionIndex / numQuestions) * 100;
    $: currentQuestion = questions[currentQuestionIndex];

    onMount(() => {
        if (questions.length === 0) {
            alert("No questions available. Please try again later.");
            return;
        }
        shuffleArray(questions);
        questions = questions.slice(0, Math.min(numQuestions, questions.length));
        startTimer();
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

    function handleSubmit() {
        clearInterval(timer);
        userAnswers[currentQuestionIndex] = selectedAnswer;
        if (selectedAnswer === currentQuestion.correctIndex) {
            score++;
        }
        selectedAnswer = null;

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            startTimer();
        } else {
            currentState = 'results';
            dispatch('quizComplete', { score, totalQuestions: questions.length });
        }
    }

    function restartQuiz() {
        currentState = 'quiz';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        dispatch('restartQuiz');
        startTimer();
    }
</script>

<style>
    .timer {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1rem;
        transition: font-size 0.5s ease;
    }
    .timer.grow {
        font-size: 3rem;
    }
</style>

<div class="card w-full max-w-md mx-auto bg-base-100 shadow-xl relative">
    <div class="card-body p-6">
        {#if currentState === 'quiz'}
            <div class="timer {remainingTime <= 5 ? 'grow' : ''}">{remainingTime}s</div>
            <div class="flex justify-between items-center mb-2 text-sm">
                <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
            </div>
            <progress class="progress progress-primary w-full mb-4" value={progress} max="100"></progress>
            <h3 class="text-lg font-semibold mb-3">{currentQuestion.question}</h3>
            <div class="space-y-2 mb-4">
                {#each currentQuestion.options as option, index}
                    <label class="flex items-center p-2 rounded-lg hover:bg-base-200 cursor-pointer">
                        <input type="radio" name="answer" class="radio radio-primary radio-sm mr-2" 
                               bind:group={selectedAnswer} value={index} />
                        <span class="text-sm">{option}</span>
                    </label>
                {/each}
            </div>
            <button class="btn btn-primary btn-sm w-full" on:click={handleSubmit} disabled={selectedAnswer === null}>
                Submit
            </button>
        {:else if currentState === 'results'}
            <h2 class="card-title text-xl mb-4">Quiz Results</h2>
            <p class="text-lg mb-4">Your score: <span class="font-bold">{score}/{questions.length}</span></p>
            {#if score / questions.length >= passingScore}
                <p class="text-lg text-success mb-4">Congratulations! You passed the quiz.</p>
            {:else}
                <p class="text-lg text-error mb-4">Sorry, you did not pass the quiz. Better luck next time!</p>
            {/if}
            <button class="btn btn-primary btn-sm w-full" on:click={restartQuiz}>Try Again</button>
        {/if}
    </div>
</div>