'use client'
import React from 'react'
import { ArrowRight } from 'lucide-react';
import lab from '../../../assets/laboratory-worker-working-with-modern-microscope-while-conducting-coronavirus-research.jpg';
import Image from 'next/image';

interface FormPage3Props {
    progress: number;
    formData: {
        fullName: string
        email: string,
        phoneNumber: string,
        facilityName: string,
        departmentName: string,
        password: string,
        confirmPassword: string
    },
    setFormData: (data: any) => void,
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    nextStep: () => void
    
}

const FormPage3: React.FC<FormPage3Props> = ({ progress, formData, setFormData, handleFormChange, nextStep }) => {
    return (
        <main className='w-full h-screen flex pt-16 overflow-hidden'>

            {/* Left Section (Form) */}
            <section className='w-1/2 flex flex-col gap-2 p-[30px_0_0_120px]'>
                <div className=''>
                    <h1 className='text-2xl font-semibold w-[538px] h-[32px] leading-[100%]'>Simple Sign Up  <span className='text-[#01368B]'>Powerful Results </span> </h1>
                    <p className='font-semibold w-[533px] h-[24px]'>Security Information</p>
                </div>

                <div className="bg-gray-300 w-[400px] rounded-full h-1.5 mb-[10px]">
                    <div className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                <div className='flex flex-col gap-0 '>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        placeholder='Password'
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4'
                    />
                </div>

                
                <div className='flex flex-col gap-0 '>
                    <label htmlFor='c.password'>Confirm Password</label>
                    <input
                        id='c.password'
                        placeholder='Confirm Password'
                        type='password'
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4'
                    />
                </div>

                <div className='w-[400px] flex justify-center gap-4 mb-8'>
                    <button className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={nextStep}>
                        <p>Next</p>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            <section className='w-1/2 h-screen sticky top-0 overflow-hidden'>
                <Image
                    src={lab}
                    alt='Woman working in a laboratory'
                    layout='fill'
                    objectFit='cover'
                    className='absolute inset-0'
                />
            </section>
        </main>
    )
}

export default FormPage3
