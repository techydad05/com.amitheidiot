<script>
    // @ts-nocheck
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher, onMount } from 'svelte';
    import QRCode from 'qrcode-svg';

    export let questions = [];
    export let timeLimit = 30; // in seconds
    export let numQuestions = 1;

    let activeQuestions = [];
    let currentQuestion = null;
    
    $: {
        if (questions.length > 0 && activeQuestions.length === 0) {
            activeQuestions = [...questions];
            shuffleArray(activeQuestions);
            activeQuestions = activeQuestions.slice(0, Math.min(numQuestions, activeQuestions.length));
        }
        currentQuestion = activeQuestions[currentQuestionIndex] || null;
    }
    export let buttonClass = "btn glass text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content";

    const dispatch = createEventDispatcher();

    let currentState = 'quiz';
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let score = 0;
    let userAnswers = [];
    let timer;
    let remainingTime;
    let resultId = '';
    let qrCodeSvg = '';
    let quizResult = {};
    let showAward = false;
    let showSaveDropdown = false;
    let missedQuestions = [];
    let url = '';

    const passingScore = 0.8; // 80% to pass

    $: progress = (currentQuestionIndex / numQuestions) * 100;


    // function generateRandomString(length) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * characters.length));
    //     }
    //     return result;
    // }

    async function saveQuizResult(score, totalQuestions, missedQuestions) {
        const formData = new FormData();
        formData.append('score', score);
        formData.append('totalQuestions', totalQuestions);
        formData.append('missedQuestions', JSON.stringify(missedQuestions));

        const response = await fetch('?/saveQuizResult', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log("saveQuizResult response:", result); // Add logging here
        return result;
    }

    onMount(() => {
        if (questions.length === 0) {
            alert("No questions available. Please try again later.");
            return;
        }
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

    async function handleSubmit() {
        clearInterval(timer);
        userAnswers[currentQuestionIndex] = selectedAnswer;
        if (selectedAnswer !== currentQuestion.correctIndex) {
            missedQuestions.push(currentQuestion.question);
        } else {
            score++;
        }
        selectedAnswer = null;

        if (currentQuestionIndex < activeQuestions.length - 1) {
            currentQuestionIndex++;
            startTimer();
        } else {
            currentState = 'results';
            const percentageScore = (score / questions.length) * 100;

            if (percentageScore >= 80) { // B- or better
                const result = await saveQuizResult(score, questions.length, missedQuestions);
                if (result.type === 'success') {
                    console.log("result:", JSON.parse(result.data));
                    generateQRCode(JSON.parse(result.data)[6]);
                } else {
                    console.error('Failed to save quiz result:', result.error);
                }
            } else if (percentageScore >= 70) { // C- to B-
                showSaveDropdown = true;
            }
        }
    }

    function generateQRCode(id) {
        resultId = id;
        url = `https://amitheidiot.com/results/${id}`;
        const qr = new QRCode({
            content: url,
            padding: 4,
            width: 256,
            height: 256,
            color: "#000000",
            background: "#ffffff",
            ecl: "M"
        });
        qrCodeSvg = qr.svg();
        showAward = true;
    }

    function restartQuiz() {
        currentState = 'quiz';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        dispatch('restartQuiz');
        startTimer();
    }

    async function handleSave() {
        showSaveDropdown = false;
        const formData = new FormData();
        formData.append('score', score);
        formData.append('totalQuestions', activeQuestions.length);
        formData.append('missedQuestions', JSON.stringify(missedQuestions.map(q => q.question)));

        const response = await fetch('?/saveQuizResult', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log("Save result:", result);

        if (result.type === 'success') {
            generateQRCode(JSON.parse(result.data)[6]);
        } else {
            console.error('Failed to save quiz result:', result.error);
        }
    }

    function handleCancel() {
        showSaveDropdown = false;
    }
</script>

<div class="card w-full max-w-md mx-auto bg-base-100 shadow-xl relative">
    {#if !showAward}
        <div class="card-body p-6">
            {#if currentState === 'quiz'}
                <div class="timer {remainingTime <= 5 ? 'grow' : ''}">{remainingTime}s</div>
                <div class="flex justify-between items-center mb-2 text-sm">
                    <span>Question {currentQuestionIndex + 1}/{activeQuestions.length}</span>
                </div>
                <progress class="progress progress-primary w-full mb-4" value={progress} max="100"></progress>
                {#if currentQuestion}
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
                {:else}
                    <div class="text-center p-4">
                        <p>Loading question...</p>
                    </div>
                {/if}
                <button class={buttonClass} on:click={handleSubmit} disabled={selectedAnswer === null}>
                    Submit
                </button>
            {:else if currentState === 'results'}
                <h2 class="card-title text-xl mb-4">Quiz Results</h2>
                <p class="text-lg mb-4">Your score: <span class="font-bold">{score}/{activeQuestions.length}</span></p>
                {#if score / activeQuestions.length >= passingScore}
                    <p class="text-lg text-success mb-4">Congratulations! You passed the quiz.</p>
                {:else}
                    <p class="text-lg text-error mb-4">Sorry, you did not pass the quiz. Better luck next time!</p>
                {/if}
            {/if}
        </div>
    {:else}
        <div class="card-body p-6 bg-gradient-to-br from-yellow-300 to-yellow-500" transition:fade>
            <div class="text-center">
                <h2 class="text-3xl font-bold mb-4 text-white">Certificate of Completion</h2>
                <p class="text-xl mb-6 text-white">This certifies that you have completed the "Am I The Idiot?" quiz</p>
                <div class="mb-6">
                    <p class="text-2xl font-bold text-white">Score: {score}/{questions.length}</p>
                </div>
                {url}
                {#if qrCodeSvg}
                    <div class="mb-6 bg-white p-4 rounded-lg inline-block">
                        {@html qrCodeSvg}
                    </div>
                {/if}
                <p class="text-sm text-white">Scan the QR code to view your results online</p>
            </div>
        </div>
    {/if}
    {#if showSaveDropdown}
        <div class="dropdown-background" on:click={handleCancel}>
            <div class="dropdown-content" in:fly={{ y: 200 }} out:fly={{ y: 200 }} on:click|stopPropagation>
                <h2 class="text-xl font-bold mb-4">Save Your Results?</h2>
                <p class="mb-4">Your score is between C- and B-. Do you want to save your results?</p>
                <div class="flex justify-end space-x-4">
                    <button class={buttonClass} on:click={handleCancel}>Cancel</button>
                    <button class={buttonClass} on:click={handleSave}>Save</button>
                </div>
            </div>
        </div>
    {/if}
</div>

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
    .dropdown-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 50;
    }
    .dropdown-content {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>