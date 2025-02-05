import { saveQuizResult } from '$lib/server/quiz_results.js';
import { supabase } from '$lib/server/db.js';

export const load = async () => {
  console.log('Starting to load questions...');
  try {
    const { data, error } = await supabase
      .from('citizenship_questions')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching questions:', error);
      return {
        questions: [],
        error: error.message
      };
    }

    console.log(`Loaded ${data?.length || 0} questions`);
    return {
      questions: data || [],
      error: null
    };
  } catch (err) {
    console.error('Failed to fetch questions:', err);
    return {
      questions: [],
      error: 'Failed to fetch questions'
    };
  }
};

export const actions = {
  saveQuizResult: async ({ request }) => {
    return await saveQuizResult({ request });
  }
};