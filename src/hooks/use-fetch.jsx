// hooks/use-fetch.js
import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const { session } = useSession();

  const fn = async (options = {}, ...args) => {
    setLoading(true);
    setError(null);

    try {
      // get Clerk token for Supabase (ensure template exists or remove template)
      const supabaseAccessToken = await session.getToken({ template: 'supabase' });

      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      return response;
    } catch (err) {
      console.error("useFetch caught error:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
