
'use client'
import React from 'react';
import lab from '../../../assets/laboratory-worker-working-with-modern-microscope-while-conducting-coronavirus-research.jpg';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface FormPage1Props {
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
    nextStep:()=> void
}

const FormPage1: React.FC<FormPage1Props> = ({ progress, formData, setFormData, handleFormChange, nextStep }) => {
    return (
        <main className='w-full h-screen max-h-screen  max-w-full flex pt-16 sm:px-12 px-3 overflow-hidden'>

            <section className='w-full h-auto min-h-[626px] flex flex-col mb-[14px]  gap-2'>
                <div className=' '>
                    <h1 className='text-3xl font-bold w-[538px] h-[32px] leading-[100%]'>Welcome to <span className='text-[#01368B]'>Easy Lab</span> </h1>
                    <p className='font-semibold w-[533px] h-[24px]'>Personal information</p>
                </div>

                <div className="bg-gray-300 w-[400px] rounded-full h-1.5  mb-[10px]">
                    <div className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} >
                    </div>
                </div>

                <div className='flex flex-col gap-0'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        id='fullName'
                        placeholder='Full Name'
                        name="fullName"
                        type='text'
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4'
                    />
                </div>

                <div className='flex flex-col gap-0'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        placeholder='Email Address'
                        type='email'
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4'
                    />
                </div>

                <div className='flex flex-col gap-0'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        id='phone'
                        placeholder='Phone Number'
                        type='text'
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-[400px] h-12 px-4 mb-4'
                    />
                </div>


                <div className='w-[400px] flex justify-center gap-4'>
                    <button type='button' className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={nextStep}>
                        <p>Next</p>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>


{/* 
            <section className='sm:flex hidden w-1/2 max-w-1/2 h-screen max-h-screen relative overflow-hidden'>
                <Image
                    src={lab}
                    alt='Woman working in a laboratory'
                    layout='fill'
                    objectFit='cover'
                    className='absolute inset-0'
                />
            </section> */}


        </main>
    )
}

export default FormPage1
