import React, { use } from 'react'
import { useSession } from '@clerk/clerk-react'
import { getJobs } from '../api/apijobs';
import { useEffect } from 'react';
import useFetch from '../hooks/use-fetch';
// need to showcase in the job listing
const jobListing = () => {
  const {isLoaded} = useUser();

const{
  fn:fnJobs,
  data:dataJobs,
  loading:loadingJobs,

} =useFetch(getJobs);

useEffect(()=>{
  if(isLoaded) fnJobs();

},[isLoaded])

return <div>jobListing</div>


}

export default jobListing