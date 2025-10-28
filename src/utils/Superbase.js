// utils/Superbase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// synchronous factory that accepts an optional token
export default function supabaseClient(supabaseAccessToken) {
  const client = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: supabaseAccessToken
        ? { Authorization: `Bearer ${supabaseAccessToken}` }
        : undefined,
    },
  });

  return client;
}
