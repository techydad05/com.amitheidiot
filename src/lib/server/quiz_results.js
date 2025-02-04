import { supabase } from "./db.js";

async function checkDatabase() {
  try {
    // Check if we can connect to Supabase and access the quiz_results table
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .limit(1);

    if (error) throw error;
    console.log("Successfully connected to Supabase");
    console.log("Sample data from quiz_results:", data);

  } catch (err) {
    console.error("Error checking database:", err);
  }
}

checkDatabase();

export async function saveQuizResult(score, totalQuestions, missedQuestions) {
  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        { 
          score, 
          total_questions: totalQuestions, 
          missed_questions: missedQuestions 
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error saving quiz result:', err);
    throw err;
  }
}

export async function getQuizResults() {
  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error getting quiz results:', err);
    throw err;
  }
}

export async function getQuizResultById(id) {
  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error getting quiz result:', err);
    throw err;
  }
}