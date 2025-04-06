"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
const page = () => {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useAuthStore();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const validateUser = () => {
        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields")
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email")
            return false;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return false;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validateUser();
        if (!isValid) return;
        login(formData, router);
    }
    return (
        <main className='h-screen max-h-screen w-full bg-white flex flex-col items-center justify-center pt-16'>
            <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 bg-[#FAFAFA] py-4 px-12'>
                <h1 className='text-2xl font-semibold items-center'>🤝 Welcome Back to Easy Lab</h1>
                <p className='font-semibold'>Login</p>
                <div className='flex flex-col gap-4'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id="email"
                        type='email'
                        placeholder='Email Address'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='p-3 w-full bg-white border-gray-200 border-[1px] rounded-md'
                    />
                </div>

                <div className='flex flex-col gap-4'>
                    <label htmlFor='password'>Password</label>
                    <input
                        className='p-3 w-full bg-white border-gray-200 border-[1px] rounded-md'
                        id="password"
                        type='password'
                        placeholder='Password '
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>


                <div className='flex items-center w-full justify-center'>
                    <button type='submit' className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-4 rounded-md' >
                        <p className="text-[0.9rem]">Continue</p>
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='flex gap-2'>
                        <input
                            className=''
                            type='checkbox'
                        />
                        <p>By Signin Up Now You agree to our <span className='text-[#01368B]'> Term Of Service</span></p>
                    </div>
                    <p>and <span className='text-[#01368B] '>  Privacy Policy </span></p>
                    <p>
                        Don't have an Account ? <span>
                        <Link href="/register">
                            Sign Up
                        </Link>
                        </span>
                      
                    </p>

                </div>
            </form>
        </main>
    )
}

export default page
