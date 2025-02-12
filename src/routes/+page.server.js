// @ts-nocheck
import { supabase } from "$lib/server/db.js";

/**
 * Load quiz questions from Supabase
 * @returns {Promise<{questions: Array, error: string|null}>}
 */
export const load = async () => {
  try {
    const { data, error } = await supabase
      .from("citizenship_questions")
      .select("*")
      .order("id");

    if (error) {
      return {
        questions: [],
        error: "Failed to load questions",
      };
    }

    return {
      questions: data || [],
      error: null,
    };
  } catch (err) {
    return {
      questions: [],
      error: "Failed to fetch questions",
    };
  }
};

export const actions = {
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
