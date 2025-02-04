import { getQuizResultById } from '$lib/server/quiz_results';

export async function load({ params }) {
  try {
    const { id } = params;
    const result = await getQuizResultById(id);
    
    if (!result) {
      return {
        status: 404,
        error: 'Result not found'
      };
    }
    
    return {
      result
    };
  } catch (error) {
    console.error('Error loading quiz result:', error);
    return {
      status: 500,
      error: error.message || 'Failed to load quiz result',
      details: error.details || null
    };
  }
}
