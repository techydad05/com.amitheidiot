// @ts-nocheck
import { supabase } from "$lib/server/db.js";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { resultId, verificationToken, username } = await request.json();

    // Verify the token
    const { data: existingResult, error: verifyError } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("id", resultId)
      .eq("verification_token", verificationToken)
      .single();

    if (verifyError || !existingResult) {
      return json({ 
        type: "error",
        error: "Invalid verification code"
      }, { status: 401 });
    }

    if (existingResult.is_claimed) {
      return json({
        type: "error",
        error: "This result has already been claimed"
      }, { status: 400 });
    }

    // Check if username is available
    const { data: existingUsername } = await supabase
      .from("quiz_results")
      .select("id")
      .eq("claimed_by", username)
      .single();

    if (existingUsername) {
      return json({
        type: "error",
        error: "Username already taken"
      }, { status: 400 });
    }

    // Update the result with the username
    const { error: updateError } = await supabase
      .from("quiz_results")
      .update({
        is_claimed: true,
        claimed_by: username
      })
      .eq("id", resultId);

    if (updateError) {
      throw updateError;
    }

    return json({
      type: "success",
      message: "Result claimed successfully"
    });
  } catch (error) {
    console.error("Error verifying result:", error);
    return json({
      type: "error",
      error: "Failed to verify result"
    }, { status: 500 });
  }
}
