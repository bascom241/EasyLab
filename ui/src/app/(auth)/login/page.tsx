"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import {Loader} from 'lucide-react'
import {EyeOff,Eye } from 'lucide-react'
const page = () => {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login,isLogin } = useAuthStore();
    const router = useRouter();

    const [showPassword,setShowPassword] = useState(false);
    const [policyCheck,setPolicyCheck] = useState(false);
    console.log(policyCheck)
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

        if(policyCheck === false){
            toast.error("You must agree to terms of service to sign in ")
        }else{
            return true
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting.....")
        const isValid = validateUser();
        if (!isValid){
            login(formData, router);
        } else{
            return 
        }
      
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

                <div className='relative flex flex-col gap-4'>
                    <label htmlFor='password'>Password</label>
                    <input
                        className='p-3 w-full bg-white border-gray-200 border-[1px] rounded-md'
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder='Password '
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                    type='button'
                     className='absolute top-14 right-0 flex items-center pr-3'
                     onClick={()=> setShowPassword(!showPassword)}
                     >
                        {
                            showPassword ? 
                            <EyeOff className="w-5 h-5 text-gray-400"/> :      
                            <Eye className="w-5 h-5 text-gray-400"/>
                        }
                    </button>
                </div>
                <div className='flex items-center w-full justify-center'>
                    <button type='submit' className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-4 rounded-md' >
                    {
                        isLogin ? <Loader size={20} className='animate-spin' /> : <> <p className="text-[0.9rem]">Continue</p>  <ArrowRight size={20} /></>
                    }
                       
                       
                    </button>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='flex gap-2'>
                        <input
                        onChange={()=> setPolicyCheck(!policyCheck)}
                            className=''
                            type='checkbox'
                            checked={true && policyCheck}

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
