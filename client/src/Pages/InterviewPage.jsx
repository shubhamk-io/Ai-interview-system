import React, { useState } from 'react'
import Step1setUp from '../components/Step1setUp'
import Step2setUp from '../components/Step2setUp'
import Step3interviewReport from '../components/Step3interviewReport'

const InterviewPage = () => {

    const [step, setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null)

    return (
        <div className='min-h-screen bg-gray-50'>
            {step === 1 && (
                <Step1setUp onStart={(data) => {
                    setInterviewData(data);
                    setStep(2)
                }} />

            )}

            {step === 2 && (
                <Step2setUp interviewData={interviewData}
                    onFnish={(report) => {
                        setInterviewData(report);
                        setStep(3)
                    }}
                />
            )}

            {step === 3 && (
                <Step3interviewReport report={interviewData} />
            )}


        </div>
    )
}

export default InterviewPage