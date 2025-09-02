// @ts-nocheck
import { dbHelpers } from "$lib/server/db.js";

export const load = async () => {
  try {
    const data = dbHelpers.getAllQuizResults();

    // Sort by score (descending) then by created_at (descending)
    data.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

    // Calculate percentiles and add rank
    const results = data.map((result, index) => ({
      ...result,
      rank: index + 1,
      percentage: ((result.score / result.total_questions) * 100).toFixed(1),
      percentile: (100 - ((index + 1) / data.length * 100)).toFixed(1)
    }));

    return {
      results,
      error: null
    };
  } catch (err) {
    console.error("Error in load function:", err);
    return {
      results: [],
      error: "Failed to load results"
    };
  }
};
