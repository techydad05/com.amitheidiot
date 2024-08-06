import { getQuizResultById } from '$lib/server/quiz_results'; // Assume you have a function to get the result from the database

export async function load({ params }) {
  const { id } = params;
  const result = await getQuizResultById(id);
  if (!result) {
    return {
      status: 404,
      error: new Error('Result not found')
    };
  }
  return {
    result
  };
}
