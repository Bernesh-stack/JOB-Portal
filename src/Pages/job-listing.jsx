import React, { use } from 'react'
import { useSession } from '@clerk/clerk-react'
import { getJobs } from '../api/apijobs';
import { useEffect } from 'react';
import useFetch from '../hooks/use-fetch';
import { BarLoader } from 'react-spinners';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

// need to showcase in the job listing
const jobListing = () => {
  // const {isLoaded} = useUser();
const [searchQuery,setSearchQuery] = useState("");
const [location,setLocation] = useState("");
const [company_id,setCompany_id] = useState("");
const {isLoaded} = useUser()

const{
  fn:fnJobs,
  data:Jobs,
  loading:loadingJobs,

} =useFetch(getJobs,location,company_id,searchQuery);

useEffect(()=>{
  if(isLoaded) fnJobs();

},[isLoaded,location,company_id,searchQuery])





return <div>
  <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Job</h1>

{/* // filters  */}

{loadingJobs &&(
  <BarLoader className='mt-4' width={"100%"} color='#36d7b7'/>
)}

{loadingJobs === false &&(
  <div>
    {Jobs?.length?(
      Jobs.map((job)=>{
        return <span>{job.title}</span>
      })
    ):(
      <div> No jobs Found </div>
    )}
  </div>
)}
</div>

}

export default jobListing