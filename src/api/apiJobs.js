// api/apijobs.js
import supabaseClient from '@/utils/Superbase';

// token = Clerk token (passed from useFetch), options is { location, company_id, searchQuery }
export async function getJobs(token, { location, company_id, searchQuery } = {}) {
  console.log('getJobs called with:', { location, company_id, searchQuery, hasToken: !!token });

  const supabase = supabaseClient(token);

  // build query chain (do NOT await until the end)
  let query = 
  supabase.from('jobs').select('*,company:companies(name,logo_url),saved:saved_jobs(id)');

  if (location && location !== '') {
    query = query.eq('location', location);
  }

  if (company_id !== undefined && company_id !== '') {
    const compId = typeof company_id === 'string' ? Number(company_id) : company_id;
    if (!Number.isNaN(compId)) {
      query = query.eq('company_id', compId);
    } else {
      console.warn('getJobs: invalid company_id:', company_id);
    }
  }

  if (searchQuery && searchQuery !== '') {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  // await the built query and destructure correctly
  const { data, error } = await query;

  if (error) {
    console.error('Supabase error in getJobs:', error);
    throw error;
  }

  return data || [];
}


export async function saveJobs(token, {alreadySaved, user_id, job_id}) {
  const supabase = supabaseClient(token);

  if(alreadySaved){
    const { data, error:deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", job_id)
      .eq("user_id", user_id);

    if (deleteError) {
      console.error('deleting error in saveJobs:', deleteError);
      throw deleteError;
    }
    return data;

  } else {
    const { data, error:saveError } = await supabase
      .from("saved_jobs")
      .insert([{ user_id, job_id }])
      .select();
      
    if (saveError) {
      console.error('Supabase error in saveJobs:', saveError);
      throw saveError;
    }
    return data;
  }
}
