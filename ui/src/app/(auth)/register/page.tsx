'use client'
import React from 'react';
import lab from '../../../../assets/woman-working-laborator.jpg';
import Image from 'next/image';
import { useState } from 'react';
import FormPage1 from '@/components/SignUpForm/FormPage1';
import FormPage2 from '@/components/SignUpForm/FormPage2';
import FormPage3 from '@/components/SignUpForm/FormPage3';
import FormPage4 from '@/components/SignUpForm/FormPage4';
import FormPage5 from '@/components/SignUpForm/FormPage5';
import { useEffect } from 'react';
import { useStepContext } from '@/context/StepContext';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const Register = () => {

    const { currentStep, nextStep, prevStep } = useStepContext();
    const totalSteps = 5;
    const progress = currentStep / totalSteps * 100;
    const { signUp,isSignUp } = useAuthStore();


    const [formData, setFormData] = useState(
        {
            fullName: "",
            email: "",
            phoneNumber: "",
            facilityName: "",
            facilityNumber: "",
            role: "",
            departmentName: "",
            password: "",
            confirmPassword: ""
        }
    )



    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const validateUser = () => {
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.facilityName || !formData.facilityNumber || !formData.role || !formData.departmentName || !formData.password || !formData.confirmPassword) {
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

        return true
    }

    const handleSumit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault(); 
    
        try {
            const isValid = validateUser();
            if (!isValid) return;
            await signUp(formData, nextStep);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>

            <form className="w-full" onSubmit={handleSumit}>
                {currentStep === 1 && (


                    <FormPage1
                        progress={progress}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormChange={handleFormChange}
                        nextStep={nextStep}
                    />
                )}

                {currentStep === 2 && (
                    <FormPage2
                        progress={progress}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormChange={handleFormChange}
                        nextStep={nextStep}
                    />
                )}

                {currentStep === 3 && (
                    <FormPage3
                        progress={progress}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormChange={handleFormChange}
                        nextStep={nextStep}
                    />

                )}

                {currentStep === 4 && (

                    <FormPage4
                        progress={progress}
                        nextStep={nextStep}
                        handleSubmit={handleSumit}
                    />
                )}

                {currentStep === 5 && (
                    <FormPage5
                        progress={progress}
                        handleSubmit={handleSumit}
                        isSignUp={isSignUp}
                    />
                )}

                {/* <button type='submit'>Next</button> */}
            </form>
        </>
    );
};

export default Register;
