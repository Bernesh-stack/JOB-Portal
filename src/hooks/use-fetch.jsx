import { useSession } from "@clerk/clerk-react"
import { useState } from "react"
// correctly need to retrive the data from the raw data
const useFetch =(cb,options = {}) =>{
            const [data,setdata] = useState(undefined);
            const [loading,setLoading] = useState(false);
            const [error,setError] = useState(undefined);

    const {session} = useSession();

    const fn = async(...args)=>{
        setLoading(true);
        setError(null);
          
        try {
        const supabaseAccessToken  = await session.getToken(
        {
          template: 'supabase'
        }
      )

        const response = await cb(supabaseAccessToken,options,...args);
        setdata(response);
        setError(null)
      
            
        } catch (error) {
          setError(error);
        }finally{
          setLoading(false);
        }

    }
    return {data,loading,error,fn};
}

export default useFetch