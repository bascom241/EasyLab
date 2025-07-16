'use client'
import React from 'react';
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
    nextStep: () => void
}

const FormPage1: React.FC<FormPage1Props> = ({ progress, formData, setFormData, handleFormChange, nextStep }) => {
    return (
        <main className='w-full min-h-screen pt-20 px-4 sm:px-12 flex items-start justify-center bg-white'>
            <section className='w-full max-w-[500px] flex flex-col gap-4'>
                {/* Header */}
                <div>
                    <h1 className='text-3xl font-bold leading-tight text-black'>
                        Welcome to <span className='text-[#01368B]'>Easy Lab</span>
                    </h1>
                    <p className='font-semibold text-gray-700'>Personal information</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-300 w-full rounded-full h-1.5">
                    <div
                        className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Full Name */}
                <div className='flex flex-col'>
                    <label htmlFor='fullName' className='mb-1'>Full Name</label>
                    <input
                        id='fullName'
                        placeholder='Full Name'
                        name="fullName"
                        type='text'
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-full h-12 px-4'
                    />
                </div>

                {/* Email */}
                <div className='flex flex-col'>
                    <label htmlFor='email' className='mb-1'>Email</label>
                    <input
                        id='email'
                        placeholder='Email Address'
                        type='email'
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-full h-12 px-4'
                    />
                </div>

                {/* Phone Number */}
                <div className='flex flex-col'>
                    <label htmlFor='phone' className='mb-1'>Phone Number</label>
                    <input
                        id='phone'
                        placeholder='Phone Number'
                        type='text'
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        className='border-2 border-gray-300 focus:outline-none focus:border-[#01368B] transition-all duration-300 rounded-md w-full h-12 px-4'
                    />
                </div>

                {/* Next Button */}
                <div className='w-full flex justify-center'>
                    <button
                        type='button'
                        className='bg-[#01368B] w-full sm:w-1/2 flex items-center justify-center gap-3 text-white p-3 rounded-md transition-all duration-200 hover:bg-[#002e75]'
                        onClick={nextStep}
                    >
                        <p>Next</p>
                        <ArrowRight size={24} />
                    </button>
                </div>

                {/* Login Redirect */}
                <div className='w-full text-center mt-6'>
                    <button
                        onClick={() => (window.location.href = '/login')}
                        className='text-[#01368B] border border-[#01368B] px-4 py-2 rounded-md hover:bg-[#01368B] hover:text-white transition-colors duration-200 w-full sm:w-auto'
                    >
                        Already have an account? Please log in
                    </button>
                </div>
            </section>
        </main>
    )
}

export default FormPage1;
