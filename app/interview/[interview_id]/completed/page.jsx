import React from 'react'

function InterviewCompleted() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-start pt-10 px-4">

            {/* Top Check Image */}
            <img src="/check.png" alt="Success" className="w-14 h-14 object-contain" />

            {/* Title */}
            <h1 className="text-2xl font-bold mt-3">
                Interview Complete!
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 mt-1 text-center text-sm">
                Thank you for participating in the AI-driven interview with Alcruiter
            </p>

            {/* Illustration */}
            <div className="w-full max-w-2xl mt-6">
                <img
                    src="/completed.png"
                    alt="Interview"
                    className="rounded-xl w-full h-48 object-contain"
                />
            </div>

            {/* What's Next Section */}
            <div className="mt-10 flex flex-col items-center">

                {/* Icon Circle */}
                <img src="/telLogo.png" alt="Success" className="w-14 h-14 object-contain" />

                <h2 className="text-xl font-semibold mt-3">
                    What’s Next?
                </h2>

                <p className="text-gray-600 text-center max-w-md mt-1 text-sm">
                    The recruiter will review your interview responses and will contact you soon regarding the next steps.
                </p>
            </div>

        </div>
    )
}

export default InterviewCompleted
