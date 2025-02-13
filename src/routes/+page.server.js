// @ts-nocheck
import { supabase } from "$lib/server/db.js";

/**
 * Load quiz questions from Supabase
 * @returns {Promise<{questions: Array, error: string|null}>}
 */
export const load = async () => {
  try {
    // Fetch questions and settings in parallel
    const [questionsResult, settingsResult] = await Promise.all([
      supabase.from("citizenship_questions").select("*").order("id"),
      supabase.from("quiz_settings").select("*").single()
    ]);

    if (questionsResult.error) {
      console.error('Failed to load questions:', questionsResult.error);
      return {
        questions: [],
        settings: { numQuestions: 10, timeLimit: 30 },
        error: "Failed to load questions"
      };
    }

    // If settings don't exist, use defaults
    const settings = settingsResult.error ? 
      { numQuestions: 10, timeLimit: 30 } : 
      settingsResult.data;

    return {
      questions: questionsResult.data || [],
      settings,
      error: null
    };
  } catch (err) {
    console.error('Failed to fetch data:', err);
    return {
      questions: [],
      settings: { numQuestions: 10, timeLimit: 30 },
      error: "Failed to fetch data"
    };
  }
};

export const actions = {
  saveSettings: async ({ request }) => {
    const formData = await request.formData();
    const num_questions = parseInt(formData.get('num_questions'));
    const time_limit = parseInt(formData.get('time_limit'));

    // First get the current settings row if it exists
    const { data: currentSettings } = await supabase
      .from('quiz_settings')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    let error;
    if (currentSettings) {
      // Update existing row
      const result = await supabase
        .from('quiz_settings')
        .update({ num_questions, time_limit })
        .eq('id', currentSettings.id);
      error = result.error;
    } else {
      // Create first row if none exists
      const result = await supabase
        .from('quiz_settings')
        .insert([{ num_questions, time_limit }]);
      error = result.error;
    }

    if (error) {
      console.error('Failed to save settings:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  /**
   * Save quiz results to Supabase
   * @param {FormData} request.formData - Form data containing quiz results
   * @returns {Promise<{type: string, id?: string, error?: string}>}
   */
  saveQuiz: async ({ request }) => {
    try {
      const formData = await request.formData();
      const score = parseInt(formData.get("score"));
      const totalQuestions = parseInt(formData.get("totalQuestions"));
      const missedQuestions = JSON.parse(formData.get("missedQuestions"));
      // Generate a UUID for verification
      const verificationToken = crypto.randomUUID();

      console.log('Saving quiz result:', {
        score,
        totalQuestions,
        missedQuestions,
        verificationToken
      });

      // Save to Supabase
      const { data, error } = await supabase
        .from("quiz_results")
        .insert({
          score,
          total_questions: totalQuestions,
          missed_questions: missedQuestions,
          verification_token: verificationToken
          // created_at, is_claimed, and username will use their default values
        })
        .select("id")
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data?.id) {
        throw new Error('No ID returned from insert');
      }

      console.log('Quiz result saved:', { id: data.id, verificationToken });

      return {
        type: "success",
        id: data.id,
        verificationToken
      };
    } catch (error) {
      console.error('Failed to save quiz result:', error);
      throw error; // Let SvelteKit handle the error response
    }
  },
};
