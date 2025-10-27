import supabaseClient from '@/utils/Superbase'

// this function to fetch the data
export async function getJobs(token,{location,company_id,searchQuery}) {
  const supabase = await supabaseClient(token);
  const query = await supabase
    .from('jobs')
    .select('*');
  if(location){
    query = query.eq('location',location)
  }
  if(company_id){
    query = query.eq('company_id',company_id)
  }
  if(searchQuery){
    query = query.ilike('title',`%${searchQuery}%`) 
  }





  if (error) {
    console.error('Error fetching jobs:', error.message);
    throw new Error(error.message);
  }

  return data;
}
