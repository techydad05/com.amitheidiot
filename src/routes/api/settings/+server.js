import { json } from '@sveltejs/kit';
import { dbHelpers } from '$lib/server/db';

export async function GET() {
  try {
    const settings = dbHelpers.getSettings();
    
    if (!settings) {
      // Return default settings if none exist
      return json({ num_questions: 3, time_limit: 60 });
    }

    return json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return json({ error: error.message }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const { num_questions, time_limit } = await request.json();

    dbHelpers.updateSettings(num_questions, time_limit);
    
    // Return the updated settings
    const updatedSettings = dbHelpers.getSettings();
    return json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
