"use client"

import { Loader, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'


const Settings = () => {

 
    
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        facilityName: "",
        departmentName: "",
    })

    const {editProfile, editingUser,authUser} = useAuthStore();

    const userId = authUser?._id || ""

    useEffect(()=> {
        if(authUser){
            setFormData({
                fullName: authUser?.fullName || "",
                email: authUser?.email || "",
                phoneNumber: authUser?.phoneNumber || "",
                facilityName: authUser?.facilityName || "",
                departmentName: authUser?.departmentName || "",
            })
        }
    },[authUser])
    console.log(authUser)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData,userId)
        editProfile(formData, userId);
    }
    return (
        <main className=" mt-5 min-h-screen bg-gray-50 p-4 md:p-8 w-full">
            <div className='flex gap-2 items-center '>
                <div className='bg-black p-2 rounded-md'>
                    <User className='text-white text-2xl md:text-3xl' />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold">Edit Your Profile</h1>
            </div>

            <form className='flex flex-col gap-4 w-full mt-6' onSubmit={handleFormSubmit}>
                <div className='flex w-full gap-4 '>
                    <div className='flex flex-col gap-2 w-full'>
                        <label>Full Name</label>
                        <input
                            placeholder='First Name'
                            value={formData.fullName}
                            name="fullName"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label>Email</label>
                        <input
                            placeholder='First Name'
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>


                </div>


                <div className='flex w-full gap-4 '>
                    <div className='flex flex-col gap-2 w-full'>
                        <label>Phone Number</label>
                        <input
                            placeholder='First Name'
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label>Facility Name</label>
                        <input
                            placeholder='First Name'
                            value={formData.facilityName}
                            name="facilityName"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>


                </div>

                <div className='flex w-full gap-4 '>

                    <div className='flex flex-col gap-2 w-full'>

                        <label>Department Name</label>
                        <input
                            placeholder='First Name'
                            value={formData.departmentName}
                            name="departmentName"
                            onChange={handleChange}
                            className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex item-center justify-center gap-2 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors shadow-sm font-medium"
                        type="submit"

                    >

                      {editingUser ? <Loader className='animate-spin'/> : <>Edit User</>}

                    </motion.button>
                </div>
            </form>

        </main>
    )
}

export default Settings
