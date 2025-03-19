'use client'
import React from 'react'
import flag from '../../../assets/Character.png'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
interface Form5Props {
    progress: number,
    handleSubmit:(e: React.ChangeEvent<HTMLFormElement>) => void
}

const FormPage5: React.FC<Form5Props> = ({ progress, handleSubmit }) => {
    return (
        <main className='w-full flex flex-col  h-screen items-center  pt-16 overflow-hidden px-16'>
            <div className='mt-8 w-1/2 flex flex-col gap-2 items-center'>


                <div className="bg-gray-300 w-full rounded-full h-1.5 mb-[10px]">
                    <div className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className='text-3xl font-bold text-[#01368B]'>Sign Up Complete</p>


                <Image src={flag} alt='' />

                <div className='flex flex-col items-center justify-center'>
                    <p className='text-2xl'>Congratulations on Your Successful </p>
                    <p className='text-2xl'>Sign-Up!</p>
                </div>


                <div className='w-full flex items-center justify-center gap-4 mt-4 mb-8'>
                        <button className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md'>
                            <p>Login</p>
                            <ArrowRight size={24} />
                        </button>
                    </div>
            </div>
        </main>
    )
}

export default FormPage5
