import { redirect, fail } from '@sveltejs/kit';
import { dbHelpers } from '$lib/server/db.js';

export async function load({ cookies }) {
  const adminSession = cookies.get('admin-session');

  if (adminSession !== 'authenticated') {
    throw redirect(302, '/admin');
  }

  try {
    const questions = dbHelpers.getQuestions();
    return {
      questions: questions || [],
    };
  } catch (error) {
    console.error('Error loading questions:', error);
    return {
      questions: [],
    };
  }
}

export const actions = {
  add: async ({ request, cookies }) => {
    const adminSession = cookies.get('admin-session');
    if (adminSession !== 'authenticated') {
      throw redirect(302, '/admin');
    }

    try {
      const data = await request.formData();
      const question = data.get('question');
      const options = [
        data.get('option_0'),
        data.get('option_1'),
        data.get('option_2'),
        data.get('option_3'),
      ];
      const correct_answer = parseInt(data.get('correct_answer'));

      if (!question || options.some((opt) => !opt)) {
        return fail(400, {
          error: 'All fields are required',
        });
      }

      dbHelpers.addQuestion(question, options, correct_answer);

      return {
        success: true,
        message: 'Question added successfully!',
      };
    } catch (error) {
      console.error('Error adding question:', error);
      return fail(500, {
        error: 'Failed to add question',
      });
    }
  },

  update: async ({ request, cookies }) => {
    const adminSession = cookies.get('admin-session');
    if (adminSession !== 'authenticated') {
      throw redirect(302, '/admin');
    }

    try {
      const data = await request.formData();
      const id = parseInt(data.get('id'));
      const question = data.get('question');
      const options = [
        data.get('option_0'),
        data.get('option_1'),
        data.get('option_2'),
        data.get('option_3'),
      ];
      const correct_answer = parseInt(data.get('correct_answer'));

      if (!question || options.some((opt) => !opt)) {
        return fail(400, {
          error: 'All fields are required',
        });
      }

      dbHelpers.updateQuestion(id, question, options, correct_answer);

      return {
        success: true,
        message: 'Question updated successfully!',
      };
    } catch (error) {
      console.error('Error updating question:', error);
      return fail(500, {
        error: 'Failed to update question',
      });
    }
  },

  delete: async ({ request, cookies }) => {
    const adminSession = cookies.get('admin-session');
    if (adminSession !== 'authenticated') {
      throw redirect(302, '/admin');
    }

    try {
      const data = await request.formData();
      const id = parseInt(data.get('id'));

      dbHelpers.deleteQuestion(id);

      return {
        success: true,
        message: 'Question deleted successfully!',
      };
    } catch (error) {
      console.error('Error deleting question:', error);
      return fail(500, {
        error: 'Failed to delete question',
      });
    }
  },
};
