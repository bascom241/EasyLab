"use client"

import { User } from 'lucide-react'
import React, { useState } from 'react'


const Settings = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        facilityName: "",
        departmentName: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    return (
        <main className=" mt-5 min-h-screen bg-gray-50 p-4 md:p-8 w-full">
            <div className='flex gap-2 items-center '>
                <div className='bg-black p-2 rounded-md'>
                    <User className='text-white text-2xl md:text-3xl' />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold">Edit Your Profile</h1>
            </div>

            <div className='flex flex-col gap-2 w-full mt-6'>
                <div className='flex w-full gap-4 '>
                    <div className='flex flex-col gap-2 w-full'>
                        <label>First Name</label>
                        <input
                            placeholder='First Name'
                            value={formData.fullName}
                            name="fullName"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label>Last Name</label>
                        <input
                            placeholder='First Name'
                            value={formData.fullName}
                            name="fullName"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>


                </div>

            </div>

        </main>
    )
}

export default Settings
