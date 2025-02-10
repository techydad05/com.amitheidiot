// @ts-nocheck
import { supabase } from "$lib/server/db.js";

export const load = async () => {
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .order("score", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching results:", error);
      return {
        results: [],
        error: "Failed to load results"
      };
    }

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
