import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { saveJobs } from '../api/apiJobs';
import { useState } from 'react';
import useFetch from '../hooks/use-fetch';

const jobCard = ({job,isMyJob=false,SavedInit=false,onJobSaved=() =>{}}) => {
const [saved,setSaved] = useState(SavedInit)
const{
  fn:fnSavedJobs,
  data:savedJobs,
  loading:loadingSavedJobs,

} =useFetch(saveJobs,{
    alreadySaved:saved,
});

const {user} = usesavedUser();
useEffect(()=>{
    if(savedJobs !== undefined) setSaved(savedJobs?.length>0);
},[savedJobs])

const handleSaveJob = async() =>{
    await fnSavedJobs({
        user_id:user.id,
        job_id:job.id
    });
    onJobSaved();
}
  return (
    <Card>
            <CardHeader>
                <CardTitle className="flex justify-between font-bold"   >
                    {job.title}
                {!isMyJob &&<Trash2Icon fill="red" size={18} className = "text-red-500 cursor-pointer"/>}
                  </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between'>
                    {job.company && <img src={job.company.logo_url} className='h-6' />}
                    <div className=' flex gap-2 items-center'>
                    <MapPinIcon size={15} />
                    {job.location}
                    </div>
                </div>
                <hr/>
                {job.description.substring(0,job.description.indexOf('.'))}


            </CardContent>

            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className='flex-1'>
                    <Button variant="secondary" className="w-full">
                        View Details

                    </Button>
                </Link>
                {!isMyJob &&(
                    <Button variant='outline' className='w-15 hover:cursor-pointer' onClick={handleSaveJob} disabled={loadingSavedJobs} >
                    {saved?
                     <Heart size={20} stroke='red' fill='red'/>
                     :<Heart size={20} />
                    }

                    </Button>
                )}

            </CardFooter>

    </Card>
  )
}

export default jobCard