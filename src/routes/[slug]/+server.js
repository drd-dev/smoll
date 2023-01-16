import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {

  const response = await supabase.from('links').select('original_url').eq('short_code', params.slug);

  let url = null;
  if(response.data){
    if(response.data[0])
      url = response.data[0].original_url;
  }

  if(url){
    return new Response(undefined, {
      status: 302,
      headers: { Location: url },
    })
  }else{
    return new Response(undefined, {
      status: 302,
      headers: { Location: '/' },
    })
  }
}