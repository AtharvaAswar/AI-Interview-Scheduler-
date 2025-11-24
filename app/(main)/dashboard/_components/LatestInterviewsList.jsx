"use client"
import { UserContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';

function LatestInterviewsList() {

    const [interviewList, setInterviewList] = useState([]);
    const { user } = UserContext();

    useEffect(() => {
        user && getInterviewList()
    }, [user])

    const getInterviewList = async () => {

        let { data: interviews, error } = await supabase
            .from('interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })
            .limit(6)

        console.log(interviews);
        setInterviewList(interviews);
    }

    return (
        <div className='my-5 '>
            <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

            {interviewList.length == 0 &&
                <div className='p-5 flex flex-col gap-3 items-center mt-5'>
                    <Video className='h-10 w-10 text-primary' />
                    <p className='text-gray-500'>No interviews created yet.</p>
                    <Button> Create new Interview</Button>
                </div>
            }

            {interviewList &&
                <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} />
                    ))}
                </div>
            }
        </div>
    )
}

export default LatestInterviewsList