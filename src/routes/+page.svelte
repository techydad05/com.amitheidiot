<script>
import Quiz from '$lib/Quiz.svelte';

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
		question: "Which element has the chemical symbol 'O'?",
		options: ['Gold', 'Silver', 'Oxygen', 'Iron'],
		correctIndex: 2
	}
];

/**
 * @param {{ detail: { score: any; totalQuestions: any; }; }} event
 */
function handleQuizComplete(event) {
	console.log(`Quiz completed! Score: ${event.detail.score}/${event.detail.totalQuestions}`);
}

function handleRestartQuiz() {
	console.log('Quiz restarted');
}

const words = [
    { text: "idiot", size: "text-8xl" },
    { text: "ἰδιώτης", size: "text-7xl" },
    { text: "idiōtēs", size: "text-6xl" },
    { text: "private", size: "text-7xl" },
    { text: "public", size: "text-7xl" },
    { text: "affairs", size: "text-6xl" },
    { text: "polis", size: "text-5xl" },
    { text: "citizenship", size: "text-6xl" },
    { text: "society", size: "text-7xl" },
  ];

  const fullText = `In ancient Greece, the term "idiot" (ἰδιώτης, idiōtēs) had a very different meaning from what it does today. It originally referred to a private individual, someone who was not involved in public affairs or the governance of the city-state (polis). The word derives from "idios," meaning "private" or "one's own." An "idiot" in ancient Greek society was essentially a person who focused on their private life and interests, rather than participating in public life, politics, or civic duties. This term carried a negative connotation because the Greeks highly valued active participation in public affairs and viewed it as a key aspect of citizenship and contributing to the common good. Therefore, an "idiot" was seen as someone who was disengaged and uninvolved in the civic and communal responsibilities of society.`;
</script>

<main>
	<div class="flex items-center justify-center">
		<!-- <Quiz
			{questions}
			timeLimit={20}
			numQuestions={5}
			on:quizComplete={handleQuizComplete}
			on:restartQuiz={handleRestartQuiz}
		/> -->
		<!-- <p class="absolute top-0 text-[1.5rem] p-4">
			In ancient Greece, the term "idiot" (ἰδιώτης, idiōtēs) had a very different meaning from what
			it does today. It originally referred to a private individual, someone who was not involved in
			public affairs or the governance of the city-state (polis). The word derives from "idios,"
			meaning "private" or "one's own." An "idiot" in ancient Greek society was essentially a person
			who focused on their private life and interests, rather than participating in public life,
			politics, or civic duties. This term carried a negative connotation because the Greeks highly
			valued active participation in public affairs and viewed it as a key aspect of citizenship and
			contributing to the common good. Therefore, an "idiot" was seen as someone who was disengaged
			and uninvolved in the civic and communal responsibilities of society.
		</p> -->
	</div>
</main>

<div class="relative min-h-screen overflow-hidden bg-gray-200">
  <!-- Background text -->
  <div class="absolute inset-0 flex flex-wrap content-start overflow-hidden opacity-20 p-4">
    {#each fullText.split(' ') as word}
      <span class="m-1 text-gray-800">
        {#if words.some(w => w.text.toLowerCase() === word.toLowerCase().replace(/[.,]/g, ''))}
          <span class={words.find(w => w.text.toLowerCase() === word.toLowerCase().replace(/[.,]/g, ''))?.size ?? 'text-3xl' + " font-bold"}>
            {word}
          </span>
        {:else}
          <span class="text-[2.1rem]">
            {word}
          </span>
        {/if}
      </span>
    {/each}
  </div>

  <!-- Main content -->
  <div class="relative z-10 min-h-screen flex items-center justify-center p-8">
    <div class="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl">
      <h1 class="text-4xl font-bold mb-4">The Ancient Greek Concept of "Idiot"</h1>
      <p class="text-xl">
        {fullText}
      </p>
    </div>
  </div>
</div>