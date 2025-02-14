// src/lib/db.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test the connection and log the result
async function testConnection() {
  try {
    const { data, error } = await supabase.from('quiz_results').select('count').single();
    if (error) throw error;
    console.log('✅ Successfully connected to Supabase!');
    console.log(`Database URL: ${SUPABASE_URL}`);
  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error.message);
  }
}

// Run the connection test
testConnection();

export { supabase };
