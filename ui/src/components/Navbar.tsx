"use client"
import React from 'react'
import logo from '../../assets/Logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { useStepContext } from '@/context/StepContext';
import { ArrowLeft } from 'lucide-react';

const Navbar = () => {

    const { prevStep, currentStep } = useStepContext();








    return (
        <header className=''>
            <nav className='w-full h-16 px-16 border-b-[1px] fixed border-[#E7E7E7] flex items-center justify-between backdrop-blur-sm bg-white/30'>
                <div className="flex gap-3 items-center justify-center">
                    {currentStep > 1 && currentStep !==5 &&  <ArrowLeft onClick={prevStep} />}
                    <Image src={logo} width={171} height={72} alt="" />
                </div>

           
            </nav>
        </header >
    )
}

export default Navbar
