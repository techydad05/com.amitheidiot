<script>
import Quiz from './Quiz.svelte';
import { fly, fade } from 'svelte/transition';
import { onMount } from 'svelte';

const questions = [
  {
    question: 'What is the supreme law of the land?',
    options: ['The Constitution', 'The Declaration of Independence', 'The Articles of Confederation', 'The Bill of Rights'],
    correctIndex: 0
  },
  {
    question: 'What does the Constitution do?',
    options: ['Sets up the government', 'Defines the government', 'Protects basic rights of Americans', 'All of the above'],
    correctIndex: 3
  },
  {
    question: 'The idea of self-government is in the first three words of the Constitution. What are these words?',
    options: ['We the People', 'We the Citizens', 'We the Government', 'We the Americans'],
    correctIndex: 0
  },
  {
    question: 'What is an amendment?',
    options: ['A change to the Constitution', 'A preamble to the Constitution', 'A law passed by Congress', 'A declaration of independence'],
    correctIndex: 0
  },
  {
    question: 'What do we call the first ten amendments to the Constitution?',
    options: ['The Bill of Rights', 'The Articles of Confederation', 'The Declaration of Independence', 'The Federalist Papers'],
    correctIndex: 0
  },
  {
    question: 'What is one right or freedom from the First Amendment?',
    options: ['Speech', 'Right to bear arms', 'Vote', 'Travel'],
    correctIndex: 0
  },
  {
    question: 'How many amendments does the Constitution have?',
    options: ['27', '13', '10', '7'],
    correctIndex: 0
  },
  {
    question: 'What did the Declaration of Independence do?',
    options: ['Announced our independence', 'Declared our independence', 'Said that the United States is free', 'All of the above'],
    correctIndex: 3
  },
  {
    question: 'What are two rights in the Declaration of Independence?',
    options: ['Life and liberty', 'Life and the pursuit of happiness', 'Liberty and property', 'Life and property'],
    correctIndex: 1
  },
  {
    question: 'What is freedom of religion?',
    options: ['You can practice any religion, or not practice a religion', 'You must practice a religion', 'You cannot practice a religion', 'The government chooses your religion'],
    correctIndex: 0
  },
  {
    question: 'What is the economic system in the United States?',
    options: ['Capitalist economy', 'Communist economy', 'Mixed economy', 'Socialist economy'],
    correctIndex: 0
  },
  {
    question: 'What is the "rule of law"?',
    options: ['Everyone must follow the law', 'Leaders must obey the law', 'Government must obey the law', 'All of the above'],
    correctIndex: 3
  },
  {
    question: 'Name one branch or part of the government.',
    options: ['Congress', 'Army', 'President', 'Supreme Court'],
    correctIndex: 0
  },
  {
    question: 'What stops one branch of government from becoming too powerful?',
    options: ['Checks and balances', 'Separation of powers', 'Federalism', 'Both a and b'],
    correctIndex: 3
  },
  {
    question: 'Who is in charge of the executive branch?',
    options: ['The President', 'The Speaker of the House', 'The Chief Justice', 'The Vice President'],
    correctIndex: 0
  },
  {
    question: 'Who makes federal laws?',
    options: ['Congress', 'The President', 'The Supreme Court', 'The states'],
    correctIndex: 0
  },
  {
    question: 'What are the two parts of the U.S. Congress?',
    options: ['The Senate and House of Representatives', 'The Senate and the Cabinet', 'The House of Representatives and the Supreme Court', 'The Supreme Court and the Cabinet'],
    correctIndex: 0
  },
  {
    question: 'How many U.S. Senators are there?',
    options: ['100', '50', '435', '200'],
    correctIndex: 0
  },
  {
    question: 'We elect a U.S. Senator for how many years?',
    options: ['6', '4', '2', '8'],
    correctIndex: 0
  },
  {
    question: 'Who does a U.S. Senator represent?',
    options: ['All people of the state', 'The state legislature', 'The Governor', 'The President'],
    correctIndex: 0
  },
  {
    question: 'Why do some states have more Representatives than other states?',
    options: [`'Because of the state's population', 'Because the state's geographic size', 'Because the state's economic output', 'Because of the state's location'`],
    correctIndex: 0
  },
  {
    question: 'We elect a President for how many years?',
    options: ['4', '2', '6', '8'],
    correctIndex: 0
  },
  {
    question: 'In what month do we vote for President?',
    options: ['November', 'January', 'October', 'December'],
    correctIndex: 0
  },
  {
    question: 'What is the name of the President of the United States now?',
    options: ['Joe Biden', 'Donald Trump', 'Barack Obama', 'George Bush'],
    correctIndex: 0
  },
  {
    question: 'What is the name of the Vice President of the United States now?',
    options: ['Kamala Harris', 'Mike Pence', 'Nancy Pelosi', 'Chuck Schumer'],
    correctIndex: 0
  },
  {
    question: 'If the President can no longer serve, who becomes President?',
    options: ['The Vice President', 'The Speaker of the House', 'The Chief Justice', 'The Secretary of State'],
    correctIndex: 0
  },
  {
    question: 'Who is the Commander in Chief of the military?',
    options: ['The President', 'The Vice President', 'The Secretary of Defense', 'The Attorney General'],
    correctIndex: 0
  },
  {
    question: 'Who signs bills to become laws?',
    options: ['The President', 'The Vice President', 'The Speaker of the House', 'The Chief Justice'],
    correctIndex: 0
  },
  {
    question: 'Who vetoes bills?',
    options: ['The President', 'The Vice President', 'The Speaker of the House', 'The Chief Justice'],
    correctIndex: 0
  },
  {
    question: `What does the President's Cabinet do?`,
    options: ['Advises the President', 'Makes laws', 'Commands the military', 'Controls the Treasury'],
    correctIndex: 0
  },
  {
    question: 'What are two Cabinet-level positions?',
    options: ['Secretary of State and Secretary of Labor', 'Secretary of the Interior and Secretary of History', 'Attorney General and Secretary of Economics', 'Secretary of Agriculture and Secretary of Energy'],
    correctIndex: 0
  },
  {
    question: 'What does the judicial branch do?',
    options: ['Reviews laws', 'Resolves disputes', 'Decides if a law goes against the Constitution', 'All of the above'],
    correctIndex: 3
  },
  {
    question: 'What is the highest court in the United States?',
    options: ['The Supreme Court', 'The Federal Court', 'The District Court', 'The Appellate Court'],
    correctIndex: 0
  },
  {
    question: 'How many justices are on the Supreme Court?',
    options: ['9', '7', '11', '13'],
    correctIndex: 0
  },
  {
    question: 'Who is the Chief Justice of the United States now?',
    options: ['John Roberts', 'Clarence Thomas', 'Ruth Bader Ginsburg', 'Stephen Breyer'],
    correctIndex: 0
  },
  {
    question: 'Under our Constitution, some powers belong to the federal government. What is one power of the federal government?',
    options: ['To print money', 'To create an army', 'To make treaties', 'All of the above'],
    correctIndex: 3
  },
  {
    question: 'Under our Constitution, some powers belong to the states. What is one power of the states?',
    options: ['Provide schooling and education', 'Print money', 'Make treaties', 'Create an army'],
    correctIndex: 0
  },
  {
    question: 'What is the capital of the United States?',
    options: ['Washington, D.C.', 'New York City', 'Los Angeles', 'Chicago'],
    correctIndex: 0
  },
  {
    question: 'Which of these is NOT a U.S. state capital?',
    options: ['Albany', 'Sacramento', 'Miami', 'Austin'],
    correctIndex: 2
  },
  {
    question: 'Which state is known as the "Sunshine State"?',
    options: ['Florida', 'California', 'Hawaii', 'Arizona'],
    correctIndex: 0
  },
  {
    question: 'Which state is the largest by land area?',
    options: ['Alaska', 'Texas', 'California', 'Montana'],
    correctIndex: 0
  },
  {
    question: 'Which state is known for its production of maple syrup?',
    options: ['Vermont', 'Maine', 'New Hampshire', 'All of the above'],
    correctIndex: 3
  },
  {
    question: 'What are the two major political parties in the United States?',
    options: ['Democratic and Republican', 'Liberal and Conservative', 'Independent and Green', 'Libertarian and Socialist'],
    correctIndex: 0
  },
  {
    question: 'What is the political party of the President now?',
    options: ['Democratic Party', 'Republican Party', 'Independent', 'Green Party'],
    correctIndex: 0
  }
];

const primarySize = "text-3xl md:text-8xl";
const secondarySize = "text-2xl md:text-4xl";
const tertiarySize = "text-2xl md:text-5xl";
const specialCharSize = "text-2xl md:text-5xl"; // Size for words with special characters
const defaultSize = "text-2xl md:text-4xl";

const specialWords = [
  { text: "idiot", size: `${primarySize} font-bold`, rotate: "rotate-[-3deg]" },
  { text: "ἰδιώτης", size: `${specialCharSize} font-semibold`, rotate: "rotate-[2deg]", hasParens: true },
  { text: "idiōtēs", size: `${specialCharSize}`, rotate: "rotate-[-2deg]", hasParens: true },
  { text: "private", size: `${primarySize} font-bold`, rotate: "rotate-[1deg]" },
  { text: "public", size: `${primarySize} font-bold`, rotate: "rotate-[-1deg]" },
  { text: "affairs", size: `${secondarySize} font-semibold`, rotate: "rotate-[2deg]" },
  { text: "polis", size: `${tertiarySize} font-bold`, rotate: "rotate-[-3deg]", hasParens: true },
  { text: "citizenship", size: `${secondarySize}`, rotate: "rotate-[1deg]" },
  { text: "society", size: `${primarySize} font-semibold`, rotate: "rotate-[-2deg]" },
  { text: "Greece", size: `${secondarySize} font-bold`, rotate: "rotate-[3deg]" },
  { text: "civic", size: `${tertiarySize} font-semibold`, rotate: "rotate-[-1deg]" },
  { text: "duties", size: `${tertiarySize}`, rotate: "rotate-[2deg]" },
  { text: "politics", size: `${secondarySize} font-bold`, rotate: "rotate-[-2deg]" },
  { text: "governance", size: `${tertiarySize} font-semibold`, rotate: "rotate-[1deg]" },
];

const fullText = `In ancient Greece, the term "idiot" (ἰδιώτης) (idiōtēs) had a very different meaning from what it does today. It originally referred to a private individual, someone who was not involved in public affairs or the governance of the city-state (polis). The word derives from "idios," meaning "private" or "one's own." An "idiot" in ancient Greek society was essentially a person who focused on their private life and interests, rather than participating in public life, politics, or civic duties. This term carried a negative connotation because the Greeks highly valued active participation in public affairs and viewed it as a key aspect of citizenship and contributing to the common good. Therefore, an "idiot" was seen as someone who was disengaged and uninvolved in the civic and communal responsibilities of society.`;

function applySpecificSizes(text, defaultSize='text-2xl md:text-4xl') {
  // Split by spaces but preserve parentheses and punctuation
  const tokens = text.split(/(\s+|\(|\)|,)/g);
  const specialWordsMap = new Map(specialWords.map(w => [w.text.toLowerCase(), w]));
  const rotations = ['rotate-[-1deg]', 'rotate-[1deg]', 'rotate-0'];
  let index = 0;
  let currentSpecial = null;

  return tokens.map(token => {
    // Handle opening parenthesis
    if (token === '(') {
      const nextToken = tokens[tokens.indexOf(token) + 1];
      if (nextToken) {
        const cleanNextToken = nextToken.replace(/[^a-zA-Z0-9\u0370-\u03FF\u1F00-\u1FFF]/g, '').toLowerCase();
        currentSpecial = specialWordsMap.get(cleanNextToken);
        if (currentSpecial?.hasParens) {
          return `<span class="${currentSpecial.size} inline-block">(</span>`;
        }
      }
      return token;
    }

    // Handle closing parenthesis
    if (token === ')') {
      if (currentSpecial?.hasParens) {
        const size = currentSpecial.size;
        currentSpecial = null;
        return `<span class="${size} inline-block">)</span>`;
      }
      return token;
    }

    // If it's whitespace, add more space
    if (/^\s+$/.test(token)) {
      return ' \u00A0'; // Single non-breaking space
    }

    // If it's a comma, add space after it
    if (token === ',') {
      return ', ';
    }

    // Remove quotes and other punctuation for comparison, but keep the original token
    const cleanToken = token.replace(/[^a-zA-Z0-9\u0370-\u03FF\u1F00-\u1FFF]/g, '').toLowerCase();
    const special = specialWordsMap.get(cleanToken);
    const size = special?.size || defaultSize;
    const rotate = special?.rotate || rotations[index % rotations.length];

    index++;
    return `<span class="${size} word inline-block transform ${rotate} mx-1">${token}</span>`;
  }).join('');
}

const sizedFullText = applySpecificSizes(fullText, 'text-2xl md:text-4xl');

let showNewContainer = false;
let showQuizContainer = false;
let showLearnMoreContent = false;
let quizStarted = false;
let countdownProgress = 0;
let countdownInterval;

function startQuiz() {
  showLearnMoreContent = false;
  showQuizContainer = true;
  showNewContainer = false;
  countdownProgress = 0;
  quizStarted = false;

  // Start countdown
  countdownInterval = setInterval(() => {
    countdownProgress += 0.1;
    if (countdownProgress >= 1) {
      clearInterval(countdownInterval);
      quizStarted = true;
    }
  }, 100);
}

function showLearnMore() {
  showLearnMoreContent = true;
  showNewContainer = false;
}

function toggleContainer() {
  showNewContainer = true;
}

function goBackToInfo() {
  showQuizContainer = false;
  showLearnMoreContent = false;
  showNewContainer = true;
}

function goBackToStart() {
  showNewContainer = false;
  showQuizContainer = false;
  showLearnMoreContent = false;
}

onMount(() => {
  return () => {
    clearInterval(countdownInterval);
  };
});

const learnMoreContent = [
  {
    title: "Origins in Ancient Greece",
    text: "The word 'idiot' comes from the ancient Greek 'ἰδιώτης' (idiōtēs), which originally meant a private citizen, someone who did not participate in public life.",
    highlight: ["ἰδιώτης", "idiōtēs", "private citizen"],
    size: "text-xl md:text-3xl"
  },
  {
    title: "Private vs Public Life",
    text: "In ancient Greek society, active participation in public affairs was highly valued. Those who focused solely on private matters were seen as not fulfilling their civic duty.",
    highlight: ["public affairs", "civic duty"],
    size: "text-lg md:text-2xl"
  },
  {
    title: "Evolution of Meaning",
    text: "Over time, the meaning shifted from describing someone uninvolved in public affairs to its modern usage, showing how language evolves with society.",
    highlight: ["evolved", "modern usage"],
    size: "text-lg md:text-2xl"
  }
];

function formatLearnMoreText(item) {
  let formattedText = item.text;
  item.highlight.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    formattedText = formattedText.replace(regex, `<span class="font-bold text-primary">$1</span>`);
  });
  return formattedText;
}
</script>

<div class="relative h-[100dvh] overflow-hidden bg-base-200 flex flex-col justify-center items-center">
  {#if !showNewContainer}
    <div class="absolute inset-0 flex flex-wrap content-start opacity-20 p-2 md:p-4 word-container">
      {@html sizedFullText}
    </div>

    <div class="relative z-10">
      <button
        class="btn glass bg-secondary btn-primary btn-lg text-primary-content border-primary-content"
        on:click={toggleContainer}
      >
        <span class="shimmer-text text-2xl">Are you the idiot?</span>
      </button>
    </div>
  {:else}
    <div
      class="fixed inset-0 bg-base-300 bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
      transition:fade
    >
      <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-3xl p-4 sm:p-8 space-y-6 sm:space-y-8 relative my-2 sm:my-4">
        <!-- Close button -->
        <button
          class="absolute top-2 right-2 sm:top-4 sm:right-4 btn btn-circle btn-ghost btn-sm sm:btn-md"
          on:click={goBackToStart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Title -->
        <div class="text-center mt-6 sm:mt-0">
          <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-primary">Choose Your Path</h2>
          <p class="text-lg sm:text-xl md:text-2xl text-base-content opacity-80 px-2">
            Discover the fascinating journey of how a word about civic duty became a modern insult
          </p>
        </div>

        <!-- Buttons in cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-8">
          <!-- Learn More Card -->
          <div class="card bg-primary text-primary-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">Learn More</h3>
              <p class="text-sm sm:text-base mb-4">Explore the historical journey of the word "idiot" through ancient Greece.</p>
              <div class="card-actions w-full">
                <button
                  class="btn glass btn-primary btn-sm sm:btn-md md:btn-lg w-full text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content"
                  on:click={showLearnMore}
                >
                  Discover →
                </button>
              </div>
            </div>
          </div>

          <!-- Take the Quiz Card -->
          <div class="card bg-secondary text-secondary-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">Take the Quiz</h3>
              <p class="text-sm sm:text-base mb-4">Test your knowledge about the historical meaning and modern usage.</p>
              <div class="card-actions w-full">
                <button
                  class="btn glass btn-secondary btn-sm sm:btn-md md:btn-lg w-full text-secondary-content border-secondary-content hover:bg-primary hover:border-primary-content"
                  on:click={startQuiz}
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          </div>

          <!-- Coming Soon Card -->
          <div class="card bg-accent text-accent-content shadow-xl">
            <div class="card-body items-center text-center p-4 sm:p-6">
              <h3 class="card-title text-xl sm:text-2xl font-bold mb-2">Coming Soon</h3>
              <p class="text-sm sm:text-base mb-4">More features and content are on the way. Stay tuned!</p>
              <div class="card-actions w-full">
                <button
                  class="btn glass btn-accent btn-sm sm:btn-md md:btn-lg w-full text-accent-content border-accent-content hover:bg-secondary hover:border-secondary-content"
                  disabled
                >
                  Soon →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if showLearnMoreContent}
    <div
      class="fixed inset-0 bg-base-300 bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
      transition:fade
    >
      <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-3xl p-4 sm:p-6 space-y-6 sm:space-y-8 relative my-2 sm:my-4">
        <!-- Close button -->
        <button
          class="absolute top-2 right-2 sm:top-4 sm:right-4 btn btn-circle btn-ghost btn-sm sm:btn-md"
          on:click={() => {
            showLearnMoreContent = false;
            showNewContainer = true;
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Title -->
        <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4 sm:mb-8 text-primary mt-6 sm:mt-0">
          The History of "Idiot"
        </h2>

        <!-- Content sections -->
        <div class="space-y-8 sm:space-y-12">
          {#each learnMoreContent as section}
            <div>
              <h3 class="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4 text-secondary">
                {section.title}
              </h3>
              <p class="text-base sm:text-lg md:text-xl leading-relaxed">
                {@html formatLearnMoreText(section)}
              </p>
            </div>
          {/each}
        </div>

        <!-- Navigation buttons -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 mt-6 sm:mt-8">
          <button
            class="btn glass btn-primary btn-sm sm:btn-md w-full sm:w-auto text-primary-content border-primary-content hover:bg-secondary hover:border-secondary-content"
            on:click={() => {
              showLearnMoreContent = false;
              showNewContainer = true;
            }}
          >
            Back to Home
          </button>
          <button
            class="btn glass btn-secondary btn-sm sm:btn-md w-full sm:w-auto text-secondary-content border-secondary-content hover:bg-primary hover:border-primary-content"
            on:click={startQuiz}
          >
            Take the Quiz →
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showQuizContainer}
    <div
      class="absolute inset-0 bg-base-100 flex flex-col justify-center items-center z-30 p-4"
      in:fly={{ y: 1000, duration: 500 }}
      out:fly={{ y: 1000, duration: 500 }}
    >
      <div class="w-full max-w-2xl">
        {#if !quizStarted}
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold mb-4">Quiz starting in {Math.ceil(10 - countdownProgress * 10)} seconds</h2>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                class="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-linear"
                style="width: {countdownProgress * 100}%"
              ></div>
            </div>
          </div>
        {:else}
          <Quiz
            {questions}
            timeLimit={6}
            numQuestions={25}
            buttonClass="btn glass text-primary-content border-primary-content"
          />
        {/if}
        <button class="btn glass btn-outline btn-secondary mt-4 w-full" on:click={goBackToInfo}>Go Back</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .word {
    display: inline-block;
  }
  .word-container {
    z-index: 1;
  }

  .shimmer-text {
    position: relative;
    display: inline-block;
    font-weight: 400;
    background: linear-gradient(
      90deg,
      currentColor 0%,
      #fff8 50%,
      currentColor 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shimmer 3s infinite 2s;
    -webkit-text-fill-color: transparent;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>