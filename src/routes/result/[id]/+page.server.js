// @ts-nocheck
import { supabase } from "$lib/server/db.js";
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const { data, error: queryError } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("id", params.id)
      .single();

    if (queryError) throw queryError;
    if (!data) throw error(404, 'Result not found');

    return {
      result: data
    };
  } catch (err) {
    console.error("Error loading quiz result:", err);
    throw error(500, 'Failed to load quiz result');
  }
}
