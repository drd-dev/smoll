import { createClient } from '@supabase/supabase-js'
import { json } from '@sveltejs/kit';
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
import { nanoid } from 'nanoid';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const url = await request.json()
    const shortCode = nanoid(12);
    const response = await supabase.from('links').insert({original_url: url, short_code: shortCode}).select();
    return json(response);
}