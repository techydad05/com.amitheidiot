// populate-questions.js
import Database from 'better-sqlite3';

const testQuestions = [
  {
    question: "What is the supreme law of the land?",
    options: ["The Constitution", "The Bill of Rights", "The Declaration of Independence", "Federal Law"],
    correct_answer: 0
  },
  {
    question: "What does the Constitution do?",
    options: ["Protects basic rights of Americans", "Sets up the government", "Defines the government", "All of the above"],
    correct_answer: 3
  },
  {
    question: "The idea of self-government is in the first three words of the Constitution. What are these words?",
    options: ["We the People", "Life, Liberty, and", "In God We", "United We Stand"],
    correct_answer: 0
  },
  {
    question: "What is an amendment?",
    options: ["A law", "A change to the Constitution", "A court decision", "A presidential order"],
    correct_answer: 1
  },
  {
    question: "What do we call the first ten amendments to the Constitution?",
    options: ["The Preamble", "The Articles", "The Bill of Rights", "The Federalist Papers"],
    correct_answer: 2
  },
  {
    question: "What is one right or freedom from the First Amendment?",
    options: ["Right to bear arms", "Freedom of speech", "Right to vote", "Right to trial by jury"],
    correct_answer: 1
  },
  {
    question: "How many amendments does the Constitution have?",
    options: ["10", "15", "25", "27"],
    correct_answer: 3
  },
  {
    question: "What did the Declaration of Independence do?",
    options: ["Created the Constitution", "Announced our independence from Great Britain", "Established the Bill of Rights", "Created the first government"],
    correct_answer: 1
  },
  {
    question: "What are two rights in the Declaration of Independence?",
    options: ["Life and liberty", "Freedom and justice", "Peace and prosperity", "Honor and duty"],
    correct_answer: 0
  },
  {
    question: "What is freedom of religion?",
    options: ["You must practice a religion", "You can practice any religion", "You can practice any religion, or not practice a religion", "You cannot practice religion"],
    correct_answer: 2
  },
  {
    question: "What is the economic system in the United States?",
    options: ["Socialist economy", "Communist economy", "Capitalist economy", "Mixed economy"],
    correct_answer: 2
  },
  {
    question: "What is the 'rule of law'?",
    options: ["Everyone must follow the law", "Leaders must obey the law", "Government must obey the law", "All of the above"],
    correct_answer: 3
  },
  {
    question: "Name one branch or part of the government.",
    options: ["Congress", "Legislative", "Executive", "All of the above"],
    correct_answer: 3
  },
  {
    question: "What stops one branch of government from becoming too powerful?",
    options: ["The Constitution", "Checks and balances", "The Bill of Rights", "The Supreme Court"],
    correct_answer: 1
  },
  {
    question: "Who is in charge of the executive branch?",
    options: ["The Congress", "The Supreme Court", "The President", "The Vice President"],
    correct_answer: 2
  },
  {
    question: "Who makes federal laws?",
    options: ["The President", "The Supreme Court", "Congress", "The Cabinet"],
    correct_answer: 2
  },
  {
    question: "What are the two parts of the U.S. Congress?",
    options: ["Senate and House of Representatives", "Senate and Supreme Court", "House and Cabinet", "Congress and Parliament"],
    correct_answer: 0
  },
  {
    question: "How many U.S. Senators are there?",
    options: ["50", "100", "435", "538"],
    correct_answer: 1
  },
  {
    question: "We elect a U.S. Senator for how many years?",
    options: ["2", "4", "6", "8"],
    correct_answer: 2
  },
  {
    question: "Who is one of your state's U.S. Senators now?",
    options: ["This depends on your state", "Joe Biden", "Nancy Pelosi", "John Roberts"],
    correct_answer: 0
  },
  {
    question: "The House of Representatives has how many voting members?",
    options: ["100", "435", "50", "538"],
    correct_answer: 1
  },
  {
    question: "We elect a President for how many years?",
    options: ["2", "4", "6", "8"],
    correct_answer: 1
  },
  {
    question: "In what month do we vote for President?",
    options: ["October", "November", "December", "January"],
    correct_answer: 1
  },
  {
    question: "What is the name of the President of the United States now?",
    options: ["This depends on current president", "Donald Trump", "Barack Obama", "George Bush"],
    correct_answer: 0
  },
  {
    question: "What is the name of the Vice President of the United States now?",
    options: ["This depends on current VP", "Mike Pence", "Kamala Harris", "Joe Biden"],
    correct_answer: 0
  },
  {
    question: "If the President can no longer serve, who becomes President?",
    options: ["The Speaker of the House", "The Vice President", "The Secretary of State", "The Chief Justice"],
    correct_answer: 1
  },
  {
    question: "Who is the Commander in Chief of the military?",
    options: ["The Secretary of Defense", "The Chairman of Joint Chiefs", "The President", "The Vice President"],
    correct_answer: 2
  },
  {
    question: "Who signs bills to become laws?",
    options: ["The Vice President", "The Speaker of the House", "The President", "The Chief Justice"],
    correct_answer: 2
  },
  {
    question: "Who vetoes bills?",
    options: ["The President", "The Vice President", "The Speaker of the House", "The Senate Majority Leader"],
    correct_answer: 0
  },
  {
    question: "What does the President's Cabinet do?",
    options: ["Makes laws", "Advises the President", "Interprets laws", "Commands the military"],
    correct_answer: 1
  }
];

function populateDatabase() {
  const db = new Database('amitheidiot.db');
  
  // Clear existing questions
  db.prepare('DELETE FROM citizenship_questions').run();
  
  // Insert test questions
  const insertQuestion = db.prepare(`
    INSERT INTO citizenship_questions (question, options, correct_answer)
    VALUES (?, ?, ?)
  `);
  
  testQuestions.forEach(q => {
    insertQuestion.run(q.question, JSON.stringify(q.options), q.correct_answer);
  });
  
  console.log(`✅ Inserted ${testQuestions.length} test questions into the database`);
  
  // Verify insertion
  const count = db.prepare('SELECT COUNT(*) as count FROM citizenship_questions').get();
  console.log(`📊 Total questions in database: ${count.count}`);
  
  db.close();
}

populateDatabase();