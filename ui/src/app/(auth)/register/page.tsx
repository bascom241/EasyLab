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
const Register = () => {

    const { currentStep, nextStep, prevStep } = useStepContext();
    const totalSteps = 5;
    const progress = currentStep / totalSteps * 100;
    const { signUp } = useAuthStore();


    const [formData, setFormData] = useState(
        {
            fullName: "",
            email: "",
            phoneNumber: "",
            facilityName: "",
            facilityNumber: "",
            role: "",
            departmentName : "",
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

    const handleSumit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signUp(formData,nextStep);
        } catch (err) {
            console.log(err)
         
        }
    }
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
                    />
                )}

                {/* <button type='submit'>Next</button> */}
            </form>
        </>
    );
};

export default Register;