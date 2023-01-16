import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const response = await supabase.from('links').select('original_url').eq('id', params.slug);

  if(response.data){
    var url = response.data[0].original_url;
  }

  console.log(url);
  if(url){
    return {error: null, url: url};
  }else{
    return {error: 404, url: null}
  }
}