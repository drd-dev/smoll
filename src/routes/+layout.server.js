import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


export async function load() {
  const response = await supabase.from('links').select('*', {count: 'exact'});
  return response;
};
