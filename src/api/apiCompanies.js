import supabaseClient from "@/utils/Superbase";
export async function getCompany(token) {
  const supabase = supabaseClient(token);
  const { data, error } = await supabase
    .from("companies")
    .select("*");

  if (error) {
    console.error('error in fetching companies:', error);
    throw error;
  }
  
  return data || [];
}