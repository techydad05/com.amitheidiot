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
      const verificationToken = crypto.randomUUID();

      // Save to Supabase
      const { data, error } = await supabase
        .from("quiz_results")
        .insert({
          score,
          total_questions: totalQuestions,
          missed_questions: missedQuestions,
          created_at: new Date().toISOString(),
          verification_token: verificationToken,
          is_claimed: false,
          claimed_by: null
        })
        .select("id")
        .single();

      if (error) throw error;

      return {
        type: "success",
        id: data.id,
        verificationToken
      };
    } catch (error) {
      return {
        type: "error",
        error: "Failed to save quiz results",
      };
    }
  },
};
