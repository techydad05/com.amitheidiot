// @ts-nocheck
import { dbHelpers } from "$lib/server/db.js";

/**
 * Load quiz questions from SQLite database
 * @returns {Promise<{questions: Array, settings: Object, error: string|null}>}
 */
export const load = async () => {
  try {
    const rawQuestions = dbHelpers.getQuestions();
    const settings = dbHelpers.getSettings() || { num_questions: 10, time_limit: 30 };

    // Transform questions to match expected format
    const questions = rawQuestions.map(q => ({
      question: q.question,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_answer
    }));

    return {
      questions: questions || [],
      settings: {
        numQuestions: settings.num_questions,
        timeLimit: settings.time_limit
      },
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
    try {
      const formData = await request.formData();
      const num_questions = parseInt(formData.get('num_questions'));
      const time_limit = parseInt(formData.get('time_limit'));

      dbHelpers.updateSettings(num_questions, time_limit);

      return { success: true };
    } catch (error) {
      console.error('Failed to save settings:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Save quiz results to SQLite database
   * @param {FormData} request.formData - Form data containing quiz results
   * @returns {Promise<{type: string, id?: string, error?: string}>}
   */
  saveQuiz: async ({ request }) => {
    try {
      const formData = await request.formData();
      const score = parseInt(formData.get("score"));
      const totalQuestions = parseInt(formData.get("totalQuestions"));
      const timeTaken = parseInt(formData.get("timeTaken")) || 0;
      const answers = JSON.parse(formData.get("answers") || "[]");
      
      // Generate a UUID for verification
      const verificationToken = crypto.randomUUID();

      console.log('Saving quiz result:', {
        score,
        totalQuestions,
        timeTaken,
        answers: answers.length,
        verificationToken
      });

      // Save to SQLite
      dbHelpers.insertQuizResult(verificationToken, score, totalQuestions, timeTaken, answers);

      console.log('Quiz result saved:', { id: verificationToken });

      return {
        type: "success",
        id: verificationToken,
        verificationToken
      };
    } catch (error) {
      console.error('Failed to save quiz result:', error);
      throw error; // Let SvelteKit handle the error response
    }
  },
};