import { createClient } from '@supabase/supabase-js'
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
const supabaseURL = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const url = await request.json()
    const response = await supabase.from('links').insert({original_url: url}).select();
    return json(response);
}