import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/db';

export async function GET() {
  const { data, error } = await supabase
    .from('quiz_settings')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // If table doesn't exist, create it and insert default values
    if (error.code === '42P01') {
      await supabase.rpc('create_quiz_settings_table');
      const { data: newData, error: insertError } = await supabase
        .from('quiz_settings')
        .insert([{ num_questions: 3, time_limit: 60 }])
        .select()
        .single();

      if (insertError) {
        return json({ error: insertError.message }, { status: 500 });
      }
      return json(newData);
    }
    return json({ error: error.message }, { status: 500 });
  }

  return json(data);
}

export async function POST({ request }) {
  const { num_questions, time_limit } = await request.json();

  const { data, error } = await supabase
    .from('quiz_settings')
    .insert([
      {
        num_questions,
        time_limit,
      },
    ])
    .select()
    .single();

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json(data);
}
