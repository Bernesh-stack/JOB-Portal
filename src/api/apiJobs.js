// api/apijobs.js
import supabaseClient from '@/utils/Superbase';

// token = Clerk token (passed from useFetch), options is { location, company_id, searchQuery }
export async function getJobs(token, { location, company_id, searchQuery } = {}) {
  console.log('getJobs called with:', { location, company_id, searchQuery, hasToken: !!token });

  const supabase = supabaseClient(token);

  // build query chain (do NOT await until the end)
  let query = supabase.from('jobs').select('*');

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
