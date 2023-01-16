import { createClient } from '@supabase/supabase-js'
import { json } from '@sveltejs/kit';
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const url = await request.json()
    const response = await supabase.from('links').insert({original_url: url}).select();
    return json(response);
}