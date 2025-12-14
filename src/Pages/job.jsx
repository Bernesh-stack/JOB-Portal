import { useUser } from "@clerk/clerk-react"
import useFetch from "../hooks/use-fetch";
import { getSingleJob } from "../api/apiJobs";
import { BarLoader } from "react-spinners";

const JobPage = ()=>{
    const {isLoaded,user} = useUser();
    const {id} = useParams();

    const {
        loading:loadingJob,
        data:job,
        fn:fnJob,
    } = useFetch(getSingleJob,{
        job_id:id,
    })

 useEffect(()=>{
      if(isLoaded) fnJob();
    },[isLoaded]);


if(!isLoaded||loadingJob){
  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
}


    return <div>JobPage</div>
};

export default JobPage;