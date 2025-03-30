"use client"
import React, { ChangeEvent, HTMLAttributeReferrerPolicy } from 'react'
import { useState } from 'react'
import SampleForm1 from '@/components/sampleForm/sampleForm1'
import SampleForm2 from '@/components/sampleForm/sampleForm2'
import SampleForm3 from '@/components/sampleForm/sampleForm3'
import SampleForm4 from '@/components/sampleForm/sampleForm4'
import SampleForm5 from '@/components/sampleForm/sampleForm5'
const RegisterSample = () => {
  const [currentState, setCurrentState] = useState(1);
  const [formData, setFormData] = useState({
    surName: "",
    otherNames: "",
    age: "",
    gender: "",
    hospitalNumber: "",
    occupation: "",
    sampleInformation: "",
    sampleStatus: "",
    recieptNumber: "",
    ward: "",
    patientType: "",
  dateOfSpecimen:"",
    requestersInformation:{
      requestingDoctor: "",
        consultant: ""
    },
    testType:[]
  })

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      const keys = name.split("."); // Handle nested fields
  
      if (keys.length > 1) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof typeof prev] as Record<string, any>), 
            [keys[1]]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };
  

  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  } 

  const totalSteps = 5;

  const nextStep = () => {
    if (currentState >= 1) {
      setCurrentState((prev) => prev + 1);
    }
  }
  const prevState = () => {
    setCurrentState((prev) => prev - 1);
  }

  return (
    <main className='w-full pl-8 pt-4 mt-12 h-screen max-h-[30rem] flex-col max-w-full flex  overflow-hidden bg-neutral-50'>

      {currentState === 1 && <SampleForm1
        nextStep={nextStep}
        handleFormChange={handleFormChange}
        formData={formData}
        setFormData={setFormData}
      />}
      {currentState == 2 && <SampleForm2
        nextStep={nextStep}
        handleFormChange={handleFormChange}
        formData={formData}
        setFormData={setFormData}
      />}
      {
        currentState === 3 && <SampleForm3
        nextStep={nextStep}
        handleFormChange={handleFormChange}
        formData={formData}      
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        />
      }

      {
        currentState === 4 && <SampleForm4
        nextStep={nextStep}
        />
      }

      {
        currentState === 5 && <SampleForm5/>
      }
    </main>
  )
}

export default RegisterSample
