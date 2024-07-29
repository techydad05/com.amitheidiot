<script>
import Quiz from '$lib/Quiz.svelte';
import { fly, scale } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import { onMount, tick } from 'svelte';
import pb from 'pocketbase';

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
    options: [`Because of the state's population', 'Because the state's geographic size', 'Because the state's economic output', 'Because of the state's location`],
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
    question: 'Who is the Governor of your state now?',
    options: ['[Current Governor]', 'Gavin Newsom', 'Greg Abbott', 'Ron DeSantis'],
    correctIndex: 0
  },
  {
    question: 'What is the capital of your state?',
    options: ['[State Capital]', 'Sacramento', 'Austin', 'Tallahassee'],
    correctIndex: 0
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

/**
 * @param {{ detail: { score: any; totalQuestions: any; }; }} event
 */
async function handleQuizComplete(event) {
  console.log(`Quiz completed! Score: ${event.detail.score}/${event.detail.totalQuestions}`);

  try {
    const record = await pb.collection('quiz_results').create({
      score: event.detail.score,
      totalQuestions: event.detail.totalQuestions,
      timestamp: new Date().toISOString()
    });
    console.log('Quiz result saved:', record);
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
}

function handleRestartQuiz() {
  console.log('Quiz restarted');
}

const specialWords = [
  { text: "idiot", size: "text-6xl md:text-8xl" },
  { text: "ἰδιώτης", size: "text-5xl md:text-7xl" },
  { text: "idiōtēs", size: "text-4xl md:text-6xl" },
  { text: "private", size: "text-5xl md:text-7xl" },
  { text: "public", size: "text-5xl md:text-7xl" },
  { text: "affairs", size: "text-4xl md:text-6xl" },
  { text: "polis", size: "text-3xl md:text-5xl" },
  { text: "citizenship", size: "text-4xl md:text-6xl" },
  { text: "society", size: "text-5xl md:text-7xl" },
];

const fullText = `In ancient Greece, the term "idiot" (ἰδιώτης, idiōtēs) had a very different meaning from what it does today. It originally referred to a private individual, someone who was not involved in public affairs or the governance of the city-state (polis). The word derives from "idios," meaning "private" or "one's own." An "idiot" in ancient Greek society was essentially a person who focused on their private life and interests, rather than participating in public life, politics, or civic duties. This term carried a negative connotation because the Greeks highly valued active participation in public affairs and viewed it as a key aspect of citizenship and contributing to the common good. Therefore, an "idiot" was seen as someone who was disengaged and uninvolved in the civic and communal responsibilities of society.`;

function applySpecificSizes(text, defaultSize='text-xl') {
  const cleanText = text.replace(/[^a-zA-Z0-9\s\u0370-\u03FF\u1F00-\u1FFF]/g, '');
  const words = cleanText.split(' ');
  const specialWordsMap = new Map(specialWords.map(w => [w.text.toLowerCase(), w]));

  const sizedWords = words.map((word, index) => {
    const lowerWord = word.toLowerCase();
    const size = specialWordsMap.has(lowerWord) ? specialWordsMap.get(lowerWord).size : defaultSize;
    return `<span id="word-${index}" class="${size} word ml-[5px]">${word}</span>`;
  });

  return sizedWords.join('');
}

function setupFlyAwayEffect() {
  const container = document.querySelector('.word-container');
  const words = document.querySelectorAll('.word');
  const radius = 150; // Adjust this value to change the effect radius

  function flyAway(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      const wordX = rect.left + rect.width / 2;
      const wordY = rect.top + rect.height / 2;

      const dx = wordX - mouseX;
      const dy = wordY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        const angle = Math.atan2(dy, dx);
        const force = (radius - distance) / radius;
        const translateX = Math.cos(angle) * force * 50;
        const translateY = Math.sin(angle) * force * 50;

        word.style.transform = `translate(${translateX}px, ${translateY}px)`;
        word.style.transition = 'transform 0.3s ease-out';
      } else {
        word.style.transform = 'translate(0, 0)';
      }
    });
  }

  container.addEventListener('mousemove', flyAway);
  container.addEventListener('touchmove', (e) => {
    e.preventDefault();
    flyAway(e.touches[0]);
  });
}

const sizedFullText = applySpecificSizes(fullText, 'text-2xl md:text-4xl');

let buttonAnimating = false;

async function toggleContainer() {
  if (buttonVisible) {
    buttonAnimating = true;
    buttonVisible = false;
    setTimeout(async () => {
      buttonAnimating = false;
      showNewContainer = true;
      await tick(); // Wait for the DOM to update
      startAutoScroll(); // Start auto-scroll when the new container is shown
    }, 1000); // Delay to allow button to animate
  } else {
    showNewContainer = false;
    setTimeout(() => {
      buttonVisible = true;
    }, 500); // Delay to show button after screen transition
  }
}

function startAutoScroll() {
  const scrollContainer = document.querySelector('.scroll-container');
  const scrollHeight = scrollContainer?.scrollHeight;
  const duration = 15000; // Duration of the scroll in milliseconds
  const delay = 3000; // Delay before starting the scroll in milliseconds
  const startTime = performance.now() + delay;

  function scrollStep(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    scrollContainer?.scrollTo({ top: progress * (scrollHeight - scrollContainer.clientHeight), behavior: 'auto' });

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

let showNewContainer = false;
let buttonVisible = true;

onMount(() => {
  if (showNewContainer) {
    startAutoScroll();
  }
});

</script>

<div class="relative h-screen overflow-hidden bg-base-200 flex flex-col justify-center items-center">
  {#if !showNewContainer}
    <div 
      class="absolute inset-0 flex flex-wrap content-start opacity-30 p-2 md:p-4 word-container"
      transition:fly={{ x: -1000, duration: 500, easing: cubicOut, delay: 300 }}
    >
      {@html sizedFullText}
    </div>
  {/if}
  
  {#if buttonVisible || buttonAnimating}
    <button 
      class="btn btn-outline btn-primary z-[999] transition-button !bg-transparent !text-primary"
      class:circular-shrink={buttonAnimating}
      on:click={toggleContainer}
    >
      Are you the idiot?
    </button>
  {/if}

  {#if showNewContainer}
    <div 
      class="absolute inset-0 bg-base-100 flex flex-col justify-center items-center"
      transition:scale={{ duration: 700, start: 0.1, easing: cubicOut }}
    >
      <div class="scroll-container overflow-y-auto h-1/3 w-full p-4 text-lg md:text-xl">
        <p>{@html fullText}</p>
      </div>
      <Quiz
        {questions}
        timeLimit={20}
        numQuestions={5}
        on:quizComplete={handleQuizComplete}
        on:restartQuiz={handleRestartQuiz}
      />
      <button class="btn btn-outline btn-secondary mt-4" on:click={toggleContainer}>Go Back</button>
    </div>
  {/if}
</div>

<style>
  .word {
    display: inline-block;
    transition: transform 0.3s ease-out;
  }
  .scroll-container {
    overflow-y: auto;
    height: 33.33%; /* Top third of the container */
    width: 100%;
    padding: 1rem;
    font-size: 1.25rem; /* Increase text size */
  }
  .transition-button {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .circular-shrink {
    animation: circular-shrink 1s ease-in-out forwards;
  }
  @keyframes circular-shrink {
    0% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: rotate(90deg) translate(50px) rotate(-90deg) scale(0.75);
    }
    50% {
      transform: rotate(180deg) translate(50px) rotate(-180deg) scale(0.5);
    }
    75% {
      transform: rotate(270deg) translate(50px) rotate(-270deg) scale(0.25);
    }
    100% {
      transform: rotate(360deg) translate(50px) rotate(-360deg) scale(0);
    }
  }
</style>