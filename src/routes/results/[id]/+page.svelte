<script>
  export let data;
  const { result } = data;

  function calculateGrade(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    let grade = '';

    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else grade = 'F';

    return { percentage, grade };
  }

  const { percentage, grade } = calculateGrade(result.score, result.total_questions);

  function retryQuiz() {
    window.location.href = '/';
  }
</script>

<div class="flex flex-col items-center mt-8 px-4">
  <div class="card w-full max-w-lg bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-xl">
    <div class="card-body">
      <h1 class="card-title text-4xl font-bold">Certificate of Achievement</h1>
      <p class="text-lg">This certifies that</p>
      <h2 class="text-2xl font-semibold">{result.name}</h2>
      <p class="text-lg">has successfully completed the quiz with a score of</p>
      <h3 class="text-xl font-medium">{result.score}/{result.total_questions}</h3>
      <p class="text-lg">which is a percentage of</p>
      <h3 class="text-xl font-medium">{percentage.toFixed(2)}%</h3>
      <p class="text-lg">and a grade of</p>
      <h3 class="text-xl font-medium">{grade}</h3>
      <p class="mt-4 text-lg">True patriotism is activism for a better America. Thank you for caring about the country you live in.</p>
      <p class="mt-2 text-lg">Your dedication and hard work in completing this quiz is commendable. Keep striving for excellence!</p>
    </div>
  </div>

  {#if result.missedQuestions && result.missedQuestions.length > 0}
    <div class="card w-full max-w-lg bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-xl mt-8">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">Missed Questions</h2>
        <ul class="list-disc list-inside">
          {#each result.missedQuestions as question}
            <li class="text-lg">{question}</li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  {#if percentage < 100}
    <button on:click={retryQuiz} class="btn btn-primary mt-4">Retry Quiz</button>
  {/if}
</div>

<style>
  .card-title {
    margin-bottom: 1rem;
  }

  @media (max-width: 640px) {
    .card-body {
      padding: 1rem;
    }

    .card-title {
      font-size: 1.5rem;
    }

    .text-lg {
      font-size: 1rem;
    }

    .text-2xl {
      font-size: 1.25rem;
    }

    .text-xl {
      font-size: 1.125rem;
    }
  }
</style>