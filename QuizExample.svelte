<script>
    import Quiz from './Quiz.svelte';

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
            question: "Which element has the chemical symbol 'O'?",
            options: ["Gold", "Silver", "Oxygen", "Iron"],
            correctIndex: 2
        }
    ];

    function handleQuizComplete(event) {
        console.log(`Quiz completed! Score: ${event.detail.score}/${event.detail.totalQuestions}`);
    }

    function handleRestartQuiz() {
        console.log("Quiz restarted");
    }
</script>

<main>
    <h1>Quiz Example</h1>
    <Quiz 
        questions={questions}
        timeLimit={20}
        numQuestions={5}
        on:quizComplete={handleQuizComplete}
        on:restartQuiz={handleRestartQuiz}
    />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
