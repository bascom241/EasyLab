"use client"
import React from 'react'
import { useState } from 'react'
import SampleForm1 from '@/components/sampleForm/sampleForm1'
import SampleForm2 from '@/components/sampleForm/sampleForm2'
import SampleForm3 from '@/components/sampleForm/sampleForm3'
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

  })
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
      />}
      {currentState == 2 && <SampleForm2
        nextStep={nextStep}
      />}
      {
        currentState === 3 && <SampleForm3/>
      }
    </main>
  )
}

export default RegisterSample
