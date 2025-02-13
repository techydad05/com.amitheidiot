import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabasekong-gk4cgkgw8cc4okcg44cwk4so.idevsites.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cGFiYXNla29uZy1nazRjZ2tndzhjYzRva2NnNDRjd2s0c28iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5OTEzNDM3NiwiZXhwIjoyMDE0NzEwMzc2fQ.Iy0XNwHXEOGbxbXWOFvqOTMJVZUHhEGXDpQVPgJ2Fqc';

export const supabase = createClient(supabaseUrl, supabaseKey);
