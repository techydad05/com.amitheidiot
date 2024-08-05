import { saveQuizResult } from '$lib/server/quiz_results.js';

export const actions = {
  saveQuizResult: async ({ request }) => {
    const data = await request.formData();
    console.log("data:", data);
    const score = parseInt(data.get('score'));
    const totalQuestions = parseInt(data.get('totalQuestions'));
    const missedQuestions = JSON.parse(data.get('missedQuestions'));

    try {
      const result = await saveQuizResult(score, totalQuestions, missedQuestions);
      console.log("result:", result.id);
      return { success: true, result };
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return { success: false, error: 'Failed to save quiz result' };
    }
  }
};