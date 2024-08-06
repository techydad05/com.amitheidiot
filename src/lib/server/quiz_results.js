import { query } from "./db.js";

async function checkDatabase() {
    try {
      // Check if the table exists
      const tableCheckQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'quiz_results'
        );
      `;
      const tableExists = await query(tableCheckQuery);
      console.log("Quiz results table exists:", tableExists.rows[0].exists);
  
      // List all tables in the database
      const listTablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public';
      `;
      const tables = await query(listTablesQuery);
      console.log("Tables in the database:", tables.rows.map(row => row.table_name));
  
      // Try to select from the quiz_results table
      const selectQuery = "SELECT * FROM quiz_results LIMIT 1;";
      const result = await query(selectQuery);
      console.log("Sample data from quiz_results:", result.rows);
  
    } catch (err) {
      console.error("Error checking database:", err);
    }
  }
  
  checkDatabase();

export async function saveQuizResult(score, totalQuestions, missedQuestions) {
  const text = 'INSERT INTO quiz_results(score, total_questions, missed_questions) VALUES($1, $2, $3) RETURNING *';
  const values = [score, totalQuestions, missedQuestions];
  
  try {
    const res = await query(text, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error saving quiz result:', err);
    throw err;
  }
}

export async function getQuizResults() {
  const text = 'SELECT * FROM quiz_results ORDER BY created_at DESC';
  
  try {
    const res = await query(text);
    return res.rows;
  } catch (err) {
    console.error('Error fetching quiz results:', err);
    throw err;
  }
}

export async function getQuizResultById(id) {
  const text = 'SELECT * FROM quiz_results WHERE id = $1';
  const values = [id];

  try {
    const res = await query(text, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error fetching quiz result by ID:', err);
    throw err;
  }
}