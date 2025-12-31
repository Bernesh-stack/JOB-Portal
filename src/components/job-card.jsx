import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { saveJob, deleteJob } from '../api/apiJobs';
import useFetch from '../hooks/use-fetch';

const JobCard = ({job,isMyJob=false,SavedInit=false,onJobSaved=() =>{},onJobAction=() =>{}}) => {
const [saved,setSaved] = useState(SavedInit)
const{
  fn:fnSavedJobs,
  data:savedJobs,
  loading:loadingSavedJobs,

} =useFetch(saveJob);

const {
  fn: fnDeleteJob,
  loading: loadingDeleteJob,
} = useFetch(deleteJob);

const {user} = useUser();
useEffect(()=>{
    if(savedJobs !== undefined) setSaved(savedJobs?.length>0);
},[savedJobs])

const handleSaveJob = async() =>{
    if (!user?.id || !job?.id) return;
    
    await fnSavedJobs({
        alreadySaved:saved,
        user_id:user.id,
        job_id:job.id
    });
    onJobSaved();
    onJobAction();
}

const handleDeleteJob = async() => {
    if (!job?.id) return;
    
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
        try {
            await fnDeleteJob({ job_id: job.id });
            onJobAction(); // Refresh the job list
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    }
}
  return (
    <Card>
            <CardHeader>
                <CardTitle className="flex justify-between font-bold"   >
                    {job?.title || 'Job Title'}
                {isMyJob && (
                    <div className="flex items-center">
                        {loadingDeleteJob ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Trash2Icon 
                                fill="red" 
                                size={18} 
                                className="text-red-500 cursor-pointer hover:text-red-700" 
                                onClick={handleDeleteJob}
                                title="Delete Job"
                            />
                        )}
                    </div>
                )}
                  </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between'>
                    {job?.company && <img src={job.company.logo_url} className='h-6' alt={job.company.name} />}
                    <div className=' flex gap-2 items-center'>
                    <MapPinIcon size={15} />
                    {job?.location || 'Location not specified'}
                    </div>
                </div>
                <hr/>
                {job?.description && job.description.indexOf('.') !== -1 ? job.description.substring(0,job.description.indexOf('.')) : job?.description || 'No description available'}


            </CardContent>

            <CardFooter className="flex gap-2">
                <Link to={`/job/${job?.id}`} className='flex-1'>
                    <Button variant="secondary" className="w-full" disabled={loadingDeleteJob}>
                        View Details
                    </Button>
                </Link>
                {!isMyJob &&(
                    <Button variant='outline' className='w-15 hover:cursor-pointer' onClick={handleSaveJob} disabled={loadingSavedJobs || loadingDeleteJob} >
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

export default JobCard