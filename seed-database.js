// seed-database.js - Script to populate the database with sample questions
import Database from 'better-sqlite3';

const db = new Database('amitheidiot.db');

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize database schema
function initializeDatabase() {
  // Create citizenship_questions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS citizenship_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_answer INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create quiz_settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      num_questions INTEGER NOT NULL DEFAULT 3,
      time_limit INTEGER NOT NULL DEFAULT 60,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create quiz_results table
  db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id TEXT PRIMARY KEY,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      time_taken INTEGER NOT NULL,
      answers TEXT NOT NULL,
      username TEXT,
      is_verified BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default quiz settings if none exist
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM quiz_settings').get();
  if (settingsCount.count === 0) {
    db.prepare('INSERT INTO quiz_settings (num_questions, time_limit) VALUES (?, ?)').run(3, 60);
  }

  console.log('✅ SQLite database initialized successfully!');
}

// Initialize the database first
initializeDatabase();

// Sample citizenship questions
const sampleQuestions = [
  {
    question: 'What is the supreme law of the land?',
    options: JSON.stringify([
      'The Constitution',
      'The Bill of Rights',
      'The Declaration of Independence',
      'Federal Law',
    ]),
    correct_answer: 0,
  },
  {
    question: 'What does the Constitution do?',
    options: JSON.stringify([
      'Sets up the government',
      'Defines the government',
      'Protects basic rights of Americans',
      'All of the above',
    ]),
    correct_answer: 3,
  },
  {
    question:
      'The idea of self-government is in the first three words of the Constitution. What are these words?',
    options: JSON.stringify([
      'We the People',
      'We the Citizens',
      'We the Americans',
      'We the Nation',
    ]),
    correct_answer: 0,
  },
  {
    question: 'What is an amendment?',
    options: JSON.stringify([
      'A change to the Constitution',
      'An addition to the Constitution',
      'Both A and B',
      'A law passed by Congress',
    ]),
    correct_answer: 2,
  },
  {
    question: 'What do we call the first ten amendments to the Constitution?',
    options: JSON.stringify([
      'The Bill of Rights',
      'The First Amendments',
      'The Constitutional Rights',
      'The Basic Laws',
    ]),
    correct_answer: 0,
  },
  {
    question: 'What is one right or freedom from the First Amendment?',
    options: JSON.stringify(['Speech', 'Religion', 'Assembly', 'All of the above']),
    correct_answer: 3,
  },
  {
    question: 'How many amendments does the Constitution have?',
    options: JSON.stringify(['25', '26', '27', '28']),
    correct_answer: 2,
  },
  {
    question: 'What did the Declaration of Independence do?',
    options: JSON.stringify([
      'Announced our independence from Great Britain',
      'Declared our independence from Great Britain',
      'Said that the United States is free from Great Britain',
      'All of the above',
    ]),
    correct_answer: 3,
  },
  {
    question: 'What are two rights in the Declaration of Independence?',
    options: JSON.stringify([
      'Life and liberty',
      'Liberty and the pursuit of happiness',
      'Life, liberty, and the pursuit of happiness',
      'Freedom and justice',
    ]),
    correct_answer: 2,
  },
  {
    question: 'What is freedom of religion?',
    options: JSON.stringify([
      'You can practice any religion',
      'You can practice any religion, or not practice a religion',
      'You must practice a religion',
      'You cannot practice a religion',
    ]),
    correct_answer: 1,
  },
];

try {
  // Check if questions already exist
  const existingQuestions = db.prepare('SELECT COUNT(*) as count FROM citizenship_questions').get();

  if (existingQuestions.count === 0) {
    console.log('Seeding database with sample questions...');

    const insertQuestion = db.prepare(`
      INSERT INTO citizenship_questions (question, options, correct_answer)
      VALUES (?, ?, ?)
    `);

    const insertMany = db.transaction((questions) => {
      for (const question of questions) {
        insertQuestion.run(question.question, question.options, question.correct_answer);
      }
    });

    insertMany(sampleQuestions);

    console.log(`✅ Successfully inserted ${sampleQuestions.length} sample questions!`);
  } else {
    console.log(`Database already contains ${existingQuestions.count} questions. Skipping seed.`);
  }
} catch (error) {
  console.error('Error seeding database:', error);
} finally {
  db.close();
}
