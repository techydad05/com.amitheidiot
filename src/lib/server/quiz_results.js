import { supabase } from './db.js';

async function checkDatabase() {
  try {
    // Check if we can connect to Supabase and access the quiz_results table
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .limit(1);

    if (error) throw error;
    console.log('Successfully connected to Supabase');
    console.log('Sample data from quiz_results:', data);
  } catch (err) {
    console.error('Error checking database:', err);
  }
}

checkDatabase();

export async function saveQuizResult({ request }) {
  try {
    const data = await request.formData();
    const score = parseInt(data.get('score'));
    const totalQuestions = parseInt(data.get('totalQuestions'));
    const missedQuestions = JSON.parse(data.get('missedQuestions'));

    const { data: result, error } = await supabase
      .from('quiz_results')
      .insert({
        score: score,
        total_questions: totalQuestions,
        missed_questions: missedQuestions, // This will be automatically converted to JSONB
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving quiz result:', error);
      return {
        type: 'error',
        error: error.message,
      };
    }

    console.log('Successfully saved quiz result:', result);

    return result.id;
  } catch (err) {
    console.error('Failed to save quiz result:', err);
    return {
      type: 'error',
      error: err.message,
    };
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
