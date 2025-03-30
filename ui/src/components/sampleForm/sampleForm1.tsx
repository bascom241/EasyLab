"use client"
import React from 'react'
import { ArrowRight } from 'lucide-react'



interface RequestersInformation {
    requestingDoctor: string;
    consultant: string;
}

interface FormData {
    surName: string;
    otherNames: string;
    age: string;
    gender: string;
    hospitalNumber: string;
    occupation: string;
    sampleInformation: string;
    sampleStatus: string;
    recieptNumber: string;
    ward: string;
    requestersInformation: RequestersInformation;
    testType: string[]; // Array of strings
}

type SampleForm1Props = {
    nextStep:() => void
    handleFormChange:(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> void
   formData:FormData
   setFormData:(data:any)=> void
}
const SampleForm1:React.FC<SampleForm1Props> = ({nextStep,handleFormChange,formData,setFormData}) => {
    return (
        <main className=' bg-white w-2/3 p-8'>
            <h1 className='font-semibold text-2xl mb-3'>Patient Details</h1>
            <section className='flex flex-col gap-4'>
                <div className='flex gap-3 w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='surname'>Surname</label>
                        <input
                            id='surname'
                            placeholder='Easy Lab'
                            className='w-full bg-neutral-100 px-4 py-2 border-[1px] focus:outline-none focus:border-[#01368B]  border-neutral-200 rounded-md cursor-pointer'
                            value={formData.surName}
                            name='surName'
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='o'>OtherNames</label>
                        <input
                            id='o'
                            placeholder='Team'
                            className='bg-neutral-100 px-4 py-2 border-[1px] focus:outline-none focus:border-[#01368B]  border-neutral-200 rounded-md cursor-pointer'
                            value={formData.otherNames}
                            name="otherNames"
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='age'>Age</label>
                        <input
                            id='age'
                            placeholder='32'
                            className='bg-neutral-100 px-4 py-2 border-[1px] focus:outline-none focus:border-[#01368B]  border-neutral-200 rounded-md cursor-pointer'
                            value={formData.age}
                            name="age"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='surname'>Gender</label>
                        <select
                        value={formData.gender}
                        name="gender"
                        onChange={handleFormChange}
                        
                        className='bg-neutral-100 px-4 py-2 border-[1px] focus:outline-none focus:border-[#01368B]  border-neutral-200 rounded-md cursor-pointer'>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='hospital'>Hospital Number</label>
                        <input
                            id='hospital'
                            placeholder='789056789800'
                            className='bg-neutral-100 px-4 py-2 border-[1px] focus:outline-none focus:border-[#01368B]  border-neutral-200 rounded-md cursor-pointer'
                            value={formData.hospitalNumber}
                            name="hospitalNumber"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='occupation'>Occupation</label>
                        <input
                            id='occupation'
                            placeholder='Farmer'
                            className='bg-neutral-100 px-4 py-2 border-[1px] focus:outline-none focus:border-[#01368B]  border-neutral-200 rounded-md cursor-pointer'
                            value={formData.occupation}
                            name="occupation"
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className='w-[400px] flex '>
                    <button type='button' className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={nextStep}>
                        <p>Continue</p>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>
        </main>
    )
}

export default SampleForm1
