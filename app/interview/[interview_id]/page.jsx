"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/services/supabaseClient'
import { Clock, Info, Loader, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function Interview() {

    const [interviewDetails, setInterviewDetails] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const { interview_id } = useParams();
    const router = useRouter();
    console.log(interview_id);

    useEffect(() => {
        interview_id && getInterviewDetails();
    }, [interview_id])

    const getInterviewDetails = async () => {

        setLoading(true);

        let { data: interviews, error } = await supabase
            .from('interviews')
            .select("jobPosition,jobDescription,duration,type")
            .eq('interview_id', interview_id);

        setInterviewDetails(interviews[0]);

        setLoading(false);
    }

    const joinInterview = async () => {

        setLoading(true);

        let { data: interviews, error } = await supabase
            .from('interviews')
            .select("*")
            .eq('interview_id', interview_id);

        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            interviewData: interviews[0]
        });
        router.push('/interview/' + interview_id + '/start');

        setLoading(false);

    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-7'>
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52 mb-20 pb-15'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100} className='w-[140px]' />
                <h2 className='mt-3'>AI-Powered Interview Platform</h2>

                <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-[280px] my-6' />

                <h2 className='font-bold text-xl'>{interviewDetails?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='w-4 h-4' />{interviewDetails?.duration}</h2>

                <div className='w-full'>
                    <h2>Enter your Full Name</h2>
                    <Input placeholder='e.g. Jon Snow' onChange={(event) => setUserName(event.target.value)} />
                </div>

                <div className='w-full'>
                    <h2>Enter your Email Id</h2>
                    <Input placeholder='e.g. Jon@gmail.com' onChange={(event) => setUserEmail(event.target.value)} />
                </div>

                <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-5'>
                    <Info className='text-primary' />
                    <div>
                        <h2 className='font-bold'>Before You Begin</h2>
                        <ul>
                            <li className='text-primary text-sm'>- Test Your Camera And Microphone</li>
                            <li className='text-primary text-sm'>- Ensure you have a stable Internet Connection</li>
                            <li className='text-primary text-sm'>- Find a Quite Place for Interview</li>
                        </ul>
                    </div>
                </div>

                <Button className={'mt-5 w-full font-bold'} disabled={userName.length == 0 || loading} onClick={() => joinInterview()}>
                    <Video /> {loading && <Loader />} Join Interview
                </Button>
            </div>
        </div>
    )
}

export default Interview