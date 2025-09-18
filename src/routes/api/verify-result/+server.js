// @ts-nocheck
import { dbHelpers } from '$lib/server/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { resultId, verificationToken, username } = await request.json();

    // Verify the token (in SQLite, the ID is the verification token)
    const existingResult = dbHelpers.getQuizResult(resultId);

    if (!existingResult || resultId !== verificationToken) {
      return json(
        {
          type: 'error',
          error: 'Invalid verification code',
        },
        { status: 401 }
      );
    }

    if (existingResult.is_verified) {
      return json(
        {
          type: 'error',
          error: 'This result has already been claimed',
        },
        { status: 400 }
      );
    }

    // Check if username is available
    const existingUsername = dbHelpers.usernameExists(username, resultId);

    if (existingUsername) {
      return json(
        {
          type: 'error',
          error: 'Username already taken',
        },
        { status: 400 }
      );
    }

    // Update the result with the username
    dbHelpers.updateQuizResultUsername(resultId, username);

    return json({
      type: 'success',
      message: 'Result claimed successfully',
    });
  } catch (error) {
    console.error('Error verifying result:', error);
    return json(
      {
        type: 'error',
        error: 'Failed to verify result',
      },
      { status: 500 }
    );
  }
}
