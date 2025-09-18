// @ts-nocheck
import { dbHelpers } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const result = dbHelpers.getQuizResult(params.id);

    if (!result) {
      throw error(404, 'Result not found');
    }

    return {
      result,
    };
  } catch (err) {
    console.error('Error loading quiz result:', err);
    throw error(500, 'Failed to load quiz result');
  }
}
