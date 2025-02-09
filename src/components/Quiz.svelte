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

    function initializeQuestions() {
        if (questions.length > 0) {
            // Create a new copy of questions and shuffle them
            const shuffledQuestions = [...questions];
            shuffleArray(shuffledQuestions);
            // Select only the number of questions we need
            activeQuestions = shuffledQuestions.slice(0, Math.min(numQuestions, shuffledQuestions.length));
            currentQuestion = activeQuestions[currentQuestionIndex] || null;
        }
    }

    $: if (questions.length > 0 && activeQuestions.length === 0) {
        initializeQuestions();
    }

    $: currentQuestion = activeQuestions[currentQuestionIndex] || null;
    export let buttonClass = "btn glass text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content";

    const dispatch = createEventDispatcher();

    let currentState = 'countdown';
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
let showQRModal = false;
    let showSaveDropdown = false;
    let missedQuestions = [];
    let url = '';

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
        "Fun fact: The U.S. ranks 31st in global education. Maybe we should fix that? 🤔",
        "Interesting: Studies show that informed citizens make better decisions. Who would've thought? 😉",
        "Did you know? The more educated a population is, the stronger their democracy becomes. Science! 🔬",
        "Fun fact: You're more likely to be fooled by fake news if you can't pass basic civics tests. Just saying! 📱"
    ];

    function getRandomFunFact() {
        return funFacts[Math.floor(Math.random() * funFacts.length)];
    }

    // Snarky streak messages
    function getStreakMessage(correct) {
        if (correct) {
            return [
                "Not bad, keep it up! 👍",
                "You're on fire! 🔥",
                "Okay, we see you! 👀",
                "Knowledge is power! 💪"
            ][Math.floor(Math.random() * 4)];
        }
        return [
            "Oops! Time to hit the books! 📚",
            "That's... interesting... 🤨",
            "Really? That's your answer? 😅",
            "Maybe Google it next time? 🔍"
        ][Math.floor(Math.random() * 4)];
    }

    let correctStreak = 0;
    let showStreakMessage = '';
    let streakTimeout;

    function updateStreak(isCorrect) {
        if (isCorrect) {
            correctStreak++;
            showStreakMessage = getStreakMessage(true);
        } else {
            correctStreak = 0;
            showStreakMessage = getStreakMessage(false);
        }
        clearTimeout(streakTimeout);
        streakTimeout = setTimeout(() => showStreakMessage = '', 2000);
    }

    function getFeedbackMessage(percentage) {
        if (percentage < 0.2) {
            return {
                message: "Your level of ignorance is actively contributing to society's problems. This isn't just about being uninformed - you're part of why democracy struggles. Start educating yourself immediately.",
                class: "text-error font-bold"
            };
        } else if (percentage < 0.3) {
            return {
                message: "Seriously concerning. Your lack of basic knowledge makes you vulnerable to manipulation and misinformation. You need to start taking education seriously.",
                class: "text-error"
            };
        } else if (percentage < 0.4) {
            return {
                message: "This is pretty bad. You're exactly who politicians love - uninformed and easily swayed. Time to wake up and start learning.",
                class: "text-error"
            };
        } else if (percentage < 0.5) {
            return {
                message: "You're below average, and that's saying something. America's education system might be struggling, but you're not helping. Do better.",
                class: "text-warning font-bold"
            };
        } else if (percentage < 0.6) {
            return {
                message: "Mediocre at best. You're floating by with minimal understanding. Is this really the best you can do?",
                class: "text-warning"
            };
        } else if (percentage < 0.7) {
            return {
                message: "Getting there, but still not great. You're showing signs of awareness, but you need to push harder.",
                class: "text-warning"
            };
        } else if (percentage < 0.8) {
            return {
                message: "Almost there. You're better than most, but that's a low bar. Keep pushing yourself to learn more.",
                class: "text-info"
            };
        } else if (percentage < 0.9) {
            return {
                message: "Good job! You're actually informed. Now help educate others - we need more people like you.",
                class: "text-success"
            };
        } else {
            return {
                message: "Exceptional! You're the kind of informed citizen democracy needs. Keep learning and help combat ignorance in others.",
                class: "text-success font-bold"
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

    async function saveQuizResult(score, totalQuestions, missedQuestions) {
        const formData = new FormData();
        formData.append('score', score);
        formData.append('totalQuestions', totalQuestions);
        formData.append('missedQuestions', JSON.stringify(missedQuestions));

        const response = await fetch('?/saveQuizResult', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log("Save response:", result);

        if (result.type === 'error') {
            console.error('Failed to save quiz result:', result.error);
            return;
        }

        const quizId = result;
        if (quizId) {
            // Generate QR code with the full URL
            const baseUrl = window.location.origin;
            const pathname = window.location.pathname;

            // Check if we're on localhost
            const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

            // For localhost, use the local URL
            // For production, use amitheidiot.com
            const finalBaseUrl = isLocalhost ? baseUrl : 'https://amitheidiot.com';

            const resultUrl = `${finalBaseUrl}/result/${quizId}`;
            url = resultUrl;

            const qr = new QRCode({
                content: resultUrl,
                padding: 2,
                width: 256,
                height: 256,
                color: '#000000',
                background: '#ffffff',
                ecl: 'M' // Error correction level: L, M, Q, H
            });
            qrCodeSvg = qr.svg();
        }

        return quizId;
    }

    let countdownTime = 5;
    let countdownTimer;

    function startCountdown() {
        countdownTime = 5;
        countdownTimer = setInterval(() => {
            countdownTime--;
            if (countdownTime <= 0) {
                clearInterval(countdownTimer);
                currentState = 'quiz';
                startTimer();
            }
        }, 1000);
    }

    onMount(() => {
        if (questions.length === 0) {
            alert("No questions available. Please try again later.");
            return;
        }
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

    async function handleSubmit() {
        clearInterval(timer);
        userAnswers[currentQuestionIndex] = selectedAnswer;
        const isCorrect = selectedAnswer === currentQuestion.correctIndex;
        if (!isCorrect) {
            missedQuestions.push(currentQuestion.question);
            updateStreak(false);
        } else {
            score++;
            updateStreak(true);
        }
        selectedAnswer = null;

        if (currentQuestionIndex < activeQuestions.length - 1) {
            currentQuestionIndex++;
            startTimer();
        } else {
            currentState = 'results';
            const percentageScore = (score / activeQuestions.length) * 100;
            console.log("activeQuestions:", activeQuestions.length);
            console.log("percentageScore:", percentageScore);

            if (percentageScore >= 80) { // B- or better
                console.log('Saving quiz result:', { score, totalQuestions: activeQuestions.length, missedQuestions });
                const quizId = await saveQuizResult(score, activeQuestions.length, missedQuestions);
                if (quizId) {
                    console.log("Save successful, quiz ID:", quizId);
                    generateQRCode(quizId);
                } else {
                    console.error('Failed to save quiz result');
                }
            } else if (percentageScore >= 70) { // C- to B-
                showSaveDropdown = true;
            }
        }
    }

    function generateQRCode(id) {
        if (!id) {
            console.error('No ID provided to generateQRCode');
            return;
        }
        resultId = id;
        const baseUrl = window.location.origin;
        const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
        const finalBaseUrl = isLocalhost ? baseUrl : 'https://amitheidiot.com';
        url = `${finalBaseUrl}/result/${id}`;
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
        // Reset all quiz state
        currentState = 'countdown';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        missedQuestions = [];
        correctStreak = 0;
        showStreakMessage = '';
        // Re-initialize questions to get a new random set
        initializeQuestions();
        dispatch('restartQuiz');
        startCountdown();
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
        console.log("Raw save result:", result);

        // Add detailed logging
        if (result.type === 'success') {
            console.log('Success response received');
            if (result.data) {
                console.log('Data object present:', result.data);
                if (result.data.id) {
                    console.log('ID found:', result.data.id);
                    generateQRCode(result.data.id);
                } else {
                    console.error('No ID in data object:', result.data);
                }
            } else {
                console.error('No data object in response');
            }
        } else {
            console.error('Failed to save quiz result:', result.error || 'No ID returned');
        }
    }

    function handleCancel() {
        showSaveDropdown = false;
    }
</script>

<div class="card w-full max-w-md mx-auto bg-base-100 shadow-xl relative">
    {#if !showAward}
        <div class="card-body p-6">
            {#if currentState === 'countdown'}
                <div class="flex flex-col items-center justify-center h-48 relative">
                    <h2 class="text-3xl font-bold mb-4">Get Ready!</h2>
                    <p class="text-6xl font-bold text-primary">{countdownTime}</p>
                    <button
                        class="btn btn-sm btn-ghost hover:btn-error mt-8 normal-case font-normal"
                        on:click={() => dispatch('escape')}
                    >
                        <span class="flex items-center gap-1">
                            🏃‍♂️ I need more time to study!
                        </span>
                    </button>
                </div>
            {:else if currentState === 'quiz'}
                <div class="timer {remainingTime <= 5 ? 'grow' : ''}">{remainingTime}s</div>
                <div class="flex justify-between items-center mb-2 text-sm">
                    <span>Question {currentQuestionIndex + 1}/{activeQuestions.length}</span>
                </div>
                <progress class="progress progress-primary w-full mb-4" value={progress} max="100"></progress>
                {#if showStreakMessage}
                    <div class="text-center mb-2 text-lg font-semibold animate-bounce">
                        {showStreakMessage}
                    </div>
                {/if}
                {#if correctStreak >= 3}
                    <div class="text-center mb-2 text-sm text-primary">
                        🔥 {correctStreak} Correct in a row! 🔥
                    </div>
                {/if}
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
                <div class="stats shadow w-full mb-6">
                    <div class="stat">
                        <div class="stat-title">Your Score</div>
                        <div class="stat-value flex items-center justify-center gap-2">
                            {score}/{activeQuestions.length}
                            <span class="text-4xl">{getEmojiReaction(score / activeQuestions.length)}</span>
                        </div>
                        <div class="stat-desc">{Math.round((score / activeQuestions.length) * 100)}%</div>
                    </div>
                </div>
                <div class="text-sm italic text-base-content/70 mb-4 text-center">{getRandomFunFact()}</div>
                {@const feedback = getFeedbackMessage(score / activeQuestions.length)}
                <div class="p-4 rounded-lg bg-base-200 mb-6">
                    <p class="{feedback.class} text-lg leading-relaxed">{feedback.message}</p>
                </div>
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
                {#if url}
                    <div class="mb-4">
                        <p class="text-sm text-white bg-white/10 p-2 rounded break-all">{url}</p>
                    </div>
                {/if}
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
        <div class="dropdown-background" role="button" tabindex="0" on:click={handleCancel} on:keydown={e => e.key === 'Escape' && handleCancel()}>
            <div class="dropdown-content" role="dialog" aria-modal="true" in:fly={{ y: 200 }} out:fly={{ y: 200 }} on:click|stopPropagation>
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