// src/lib/server/db.js
import Database from 'better-sqlite3';

/**
 * @type {import("better-sqlite3/lib/database") | null}
 */
let db = null;

// Initialize database connection and schema
function getDatabase() {
  if (!db) {
    try {
      // Use relative path for both dev and production for now
      // In production deployment, you can set DATABASE_PATH env var
      const dbPath = process.env.DATABASE_PATH || 'amitheidiot.db';
      db = new Database(dbPath);

      // Enable WAL mode for better performance
      db.pragma('journal_mode = WAL');

      // Create tables if they don't exist
      db.exec(`
        CREATE TABLE IF NOT EXISTS citizenship_questions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question TEXT NOT NULL,
          options TEXT NOT NULL,
          correct_answer INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS quiz_settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          num_questions INTEGER NOT NULL DEFAULT 3,
          time_limit INTEGER NOT NULL DEFAULT 60,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

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
        db.prepare('INSERT INTO quiz_settings (num_questions, time_limit) VALUES (?, ?)').run(
          3,
          60
        );
      }

      console.log('✅ SQLite database initialized successfully!');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }
  return db;
}

// Database helper functions
export const dbHelpers = {
  // Get all questions
  getQuestions: () => {
    const database = getDatabase();
    return database.prepare('SELECT * FROM quiz_questions ORDER BY id').all();
  },

  // Get questions by category
  getQuestionsByCategory: (category) => {
    const database = getDatabase();
    return database.prepare('SELECT * FROM quiz_questions WHERE category = ? ORDER BY RANDOM()').all(category);
  },

  // Get questions by difficulty
  getQuestionsByDifficulty: (difficulty) => {
    const database = getDatabase();
    return database.prepare('SELECT * FROM quiz_questions WHERE difficulty = ? ORDER BY RANDOM()').all(difficulty);
  },

  // Get random questions
  getRandomQuestions: (limit = 10) => {
    const database = getDatabase();
    return database.prepare('SELECT * FROM quiz_questions ORDER BY RANDOM() LIMIT ?').all(limit);
  },

  // Get quiz settings
  getSettings: () => {
    const database = getDatabase();
    return database.prepare('SELECT * FROM quiz_settings ORDER BY id DESC LIMIT 1').get();
  },

  // Update quiz settings
  updateSettings: (/** @type {any} */ numQuestions, /** @type {any} */ timeLimit) => {
    const database = getDatabase();
    const existing = database.prepare('SELECT id FROM quiz_settings LIMIT 1').get();
    if (existing) {
      return database
        .prepare(
          'UPDATE quiz_settings SET num_questions = ?, time_limit = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        )
        .run(numQuestions, timeLimit, existing.id);
    } else {
      return database
        .prepare('INSERT INTO quiz_settings (num_questions, time_limit) VALUES (?, ?)')
        .run(numQuestions, timeLimit);
    }
  },

  // Insert quiz result
  insertQuizResult: (
    /** @type {any} */ id,
    /** @type {any} */ score,
    /** @type {any} */ totalQuestions,
    /** @type {any} */ timeTaken,
    /** @type {any} */ answers
  ) => {
    const database = getDatabase();
    return database
      .prepare(
        `
      INSERT INTO quiz_results (id, score, total_questions, time_taken, answers)
      VALUES (?, ?, ?, ?, ?)
    `
      )
      .run(id, score, totalQuestions, timeTaken, JSON.stringify(answers));
  },

  // Get quiz result by ID
  getQuizResult: (/** @type {any} */ id) => {
    const database = getDatabase();
    const result = database.prepare('SELECT * FROM quiz_results WHERE id = ?').get(id);
    if (result && result.answers) {
      result.answers = JSON.parse(result.answers);
    }
    return result;
  },

  // Get all quiz results
  getAllQuizResults: () => {
    const database = getDatabase();
    const results = database.prepare('SELECT * FROM quiz_results ORDER BY created_at DESC').all();
    return results.map((/** @type {{ answers: string; }} */ result) => {
      if (result.answers) {
        result.answers = JSON.parse(result.answers);
      }
      return result;
    });
  },

  // Check if username exists
  usernameExists: (/** @type {any} */ username, excludeId = null) => {
    const database = getDatabase();
    if (excludeId) {
      return database
        .prepare('SELECT id FROM quiz_results WHERE username = ? AND id != ?')
        .get(username, excludeId);
    }
    return database.prepare('SELECT id FROM quiz_results WHERE username = ?').get(username);
  },

  // Update quiz result with username
  updateQuizResultUsername: (/** @type {any} */ id, /** @type {any} */ username) => {
    const database = getDatabase();
    return database
      .prepare('UPDATE quiz_results SET username = ?, is_verified = TRUE WHERE id = ?')
      .run(username, id);
  },

  // Add a new question
  addQuestion: (
    /** @type {any} */ question,
    /** @type {any} */ options,
    /** @type {any} */ correct_answer
  ) => {
    const database = getDatabase();
    return database
      .prepare(
        `
      INSERT INTO citizenship_questions (question, options, correct_answer)
      VALUES (?, ?, ?)
    `
      )
      .run(question, JSON.stringify(options), correct_answer);
  },

  // Update a question
  updateQuestion: (
    /** @type {any} */ id,
    /** @type {any} */ question,
    /** @type {any} */ options,
    /** @type {any} */ correct_answer
  ) => {
    const database = getDatabase();
    return database
      .prepare(
        `
      UPDATE citizenship_questions 
      SET question = ?, options = ?, correct_answer = ?
      WHERE id = ?
    `
      )
      .run(question, JSON.stringify(options), correct_answer, id);
  },

  // Delete a question
  deleteQuestion: (/** @type {any} */ id) => {
    const database = getDatabase();
    return database.prepare('DELETE FROM citizenship_questions WHERE id = ?').run(id);
  },
};

export { getDatabase as db };
