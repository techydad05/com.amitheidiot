<script>
import Quiz from '$lib/Quiz.svelte';
import { scale, fade, fly } from 'svelte/transition';
import { cubicOut, elasticOut } from 'svelte/easing';
import { onMount, tick } from 'svelte';
import QRCode from "@bonosoft/sveltekit-qrcode"

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

async function handleQuizComplete(event) {
  const { score, totalQuestions } = event.detail;
  const formData = new FormData();
  formData.append('score', score);
  formData.append('totalQuestions', totalQuestions);

  try {
    const response = await fetch('?/saveQuizResult', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    if (result.success) {
      console.log('Quiz result saved successfully');
    } else {
      console.error('Failed to save quiz result:', result.error);
    }
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
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
  const words = text.replace(/[^a-zA-Z0-9\s\u0370-\u03FF\u1F00-\u1FFF]/g, '').split(' ');
  const specialWordsMap = new Map(specialWords.map(w => [w.text.toLowerCase(), w]));

  return words.map((word, index) => {
    const size = specialWordsMap.get(word.toLowerCase())?.size || defaultSize;
    return `<span id="word-${index}" class="${size} word ml-[5px]">${word}</span>`;
  }).join('');
}

const sizedFullText = applySpecificSizes(fullText, 'text-2xl md:text-4xl');

let buttonVisible = true;
let showNewContainer = false;

function toggleContainer(reset = false) {
  if (reset) {
    showNewContainer = false;
    setTimeout(() => {
      buttonVisible = true;
    }, 1000);
  } else {
    buttonVisible = false;
    setTimeout(() => {
      showNewContainer = true;
    }, 1000);
  }
}

function startAutoScroll() {
  const scrollContainer = document.querySelector('.scroll-container');
  const scrollHeight = scrollContainer?.scrollHeight;
  const duration = 15000;
  const delay = 3000;
  const startTime = performance.now() + delay;

  function scrollStep(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    scrollContainer?.scrollTo({ top: progress * (scrollHeight - scrollContainer.clientHeight), behavior: 'auto' });
    if (progress < 1) requestAnimationFrame(scrollStep);
  }

  requestAnimationFrame(scrollStep);
}

onMount(async () => {
  if (showNewContainer) startAutoScroll();
});
</script>

<div class="relative h-screen overflow-hidden bg-base-200 flex flex-col justify-center items-center">
  {#if !showNewContainer}
    <div class="absolute inset-0 flex flex-wrap content-start opacity-30 p-2 md:p-4 word-container">
      {@html sizedFullText}
    </div>
  {/if}
  
  {#if buttonVisible}
    <div 
      class="relative z-10"
      in:fade={{ duration: 300 }} 
      out:fade={{ duration: 1000 }}
    >
      <button 
        class="btn btn-outline btn-primary !bg-transparent !text-primary"
        on:click={() => toggleContainer()}
        in:scale={{ duration: 300, easing: elasticOut }}
        out:scale={{ duration: 1000, easing: cubicOut }}
      >
        Are you the idiot?
      </button>
    </div>
  {/if}

  {#if showNewContainer}
    <div 
      class="absolute inset-0 bg-base-100 flex flex-col justify-center items-center z-20"
      in:scale={{ duration: 800, start: 0.3, opacity: 0, easing: elasticOut }}
      out:scale={{ duration: 500, start: 0.5, opacity: 0, easing: cubicOut }}
    >
      <div class="scroll-container overflow-y-auto h-1/3 w-full p-4 text-lg md:text-xl">
        <p>{@html fullText}</p>
      </div>
      <Quiz
        {questions}
        timeLimit={8}
        numQuestions={1}
        on:quizComplete={handleQuizComplete}
      />
      <button class="btn btn-outline btn-secondary mt-4" on:click={() => toggleContainer(true)}>Go Back</button>
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
    height: 33.33%;
    width: 100%;
    padding: 1rem;
    font-size: 1.25rem;
  }
  .word-container {
    z-index: 1;
  }
</style>