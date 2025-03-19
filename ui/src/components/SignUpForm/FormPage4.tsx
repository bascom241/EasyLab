'use client'
import React from 'react'
import { ArrowRight } from 'lucide-react';

interface FormPage4Props {
    progress: number;
    nextStep: () => void;
    handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) =>Promise <void>

}


const FormPage4: React.FC<FormPage4Props> = ({ progress, nextStep, handleSubmit }) => {

    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
         await handleSubmit(e);
        // if(isSuccess) {
        //     nextStep()
        // }
      
    }
    return (
        <main className='w-full flex flex-col  h-screen items-center  pt-16 overflow-hidden px-16'>
            <div className='mt-8 w-full'>
                <h1 className='mb-4 text-2xl font-semibold w-full h-[32px] leading-[100%] text-center'>Simple Sign Up  <span className='text-[#01368B]'>Powerful Results </span> </h1>
                <div className="bg-gray-300 w-full rounded-full h-1.5 mb-[10px]">
                    <div className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <div className='bg-gray-100 h-screen w-full '>
                    <div className='flex items-center justify-center w-full gap-5 py-4'>
                        <h1 className='text-2xl'>TERMS AND CONDITIONS</h1>
                        <div className='bg-[#F3FCF8] flex items-center justify-center h-[25px] w-[85px] text-[#0B9658] text-[0.7rem] border-inherit p-2 rounded-full'><p>Please Read</p></div>
                    </div>
                    <div className='mt-3 w-full px-8'>
                        <p className='mb-4 font-bold'>Instructions</p>
                        <ul className=' list-disc flex flex-col gap-3 text-[0.85rem]'>
                            <li>By accessing or using Easy Lab ("the Platform"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the Platform.</li>
                            <li>You may not reproduce, modify, distribute, transmit, display, perform, or otherwise use the Platform's content without the prior written consent of Easy Lab.</li>
                            <li>You may not reproduce, modify, distribute, transmit, display, perform, or otherwise use the Platform's content without the prior written consent of Easy Lab.</li>
                            <li> no event shall Easy Lab be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the Platform.</li>
                            <li>Easy Lab reserves the right to terminate or suspend your account and access to the Platform at its sole discretion, without prior notice</li>
                            <li>Easy Lab reserves the right to modify or replace these Terms and Conditions at any time. Your continued use of the Platform after any such changes constitute your acceptance of the new terms.</li>
                        </ul>
                    </div>

                    <div className='w-full flex items-center justify-center gap-4 mt-4 mb-8'>
                        <button className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={() => handleFormSubmit}>
                            <p>Complete</p>
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default FormPage4
