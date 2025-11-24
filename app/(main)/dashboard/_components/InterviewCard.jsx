import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview }) {

    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast('Copied');
    }

    const onSend = () => {
        const subject = encodeURIComponent("AiCruter Interview Link");
        const body = encodeURIComponent(`Interview Link:\n${url}`);
        const mailto = `mailto:dsy_aswar.atharva@ges-coengg.org?subject=${subject}&body=${body}`;
        window.open(mailto, "_blank");
    };




    return (
        <div className='p-5 bg-white rounded-lg border'>
            <div className='flex items-center justify-between'>
                <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM YYYY')}</h2>
            </div>

            <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2'>{interview?.duration}</h2>

            <div className='flex gap-3 w-full mt-5'>
                <Button variant='outline' className='w-1/2 flex items-center justify-around gap-2' onClick={copyLink}>Copy Link <Copy /></Button>
                <Button className='w-1/2 flex items-center justify-around gap-2' onClick={onSend}>Send <Send /></Button>
            </div>
        </div>
    )
}

export default InterviewCard