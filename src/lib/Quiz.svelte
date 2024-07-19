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
<script>
  import { fade } from 'svelte/transition';

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
    if (selectedAnswer !== null) {
      currentQuestionIndex++;
      selectedAnswer = null;
    }
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
