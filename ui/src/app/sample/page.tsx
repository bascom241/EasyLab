"use client"
import React, { ChangeEvent } from 'react'
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
    dateOfSpecimen: "",
    requestersInformation: {
      requestingDoctor: "",
      consultant: ""
    },
    testType: []
  })

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      const keys = name.split(".");
  
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

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  } 

  const totalSteps = 5;

  const nextStep = () => {
    if (currentState < totalSteps) {
      setCurrentState((prev) => prev + 1);
    }
  }

  const prevStep = () => {
    if (currentState > 1) {
      setCurrentState((prev) => prev - 1);
    }
  }

  return (
    <main className='w-full px-4 sm:px-6 md:px-8 pt-4 mt-12 min-h-[calc(100vh-3rem)] flex flex-col bg-neutral-50'>
      {/* Progress Indicator */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between">
          {[...Array(totalSteps)].map((_, i) => (
            <React.Fragment key={i}>
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentState > i ? 'bg-[#01368B] text-white' : currentState === i + 1 ? 'bg-blue-100 text-[#01368B]' : 'bg-gray-200 text-gray-600'}`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`flex-1 h-1 mx-2 ${currentState > i + 1 ? 'bg-[#01368B]' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto pb-8">
        {currentState === 1 && (
          <SampleForm1
            nextStep={nextStep}
            handleFormChange={handleFormChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentState === 2 && (
          <SampleForm2
            nextStep={nextStep}
            handleFormChange={handleFormChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentState === 3 && (
          <SampleForm3
            nextStep={nextStep}
            handleFormChange={handleFormChange}
            formData={formData}      
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        )}
        {currentState === 4 && (
          <SampleForm4
            nextStep={nextStep}
          />
        )}
        {currentState === 5 && (
          <SampleForm5 />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentState === 1}
          className={`px-4 py-2 rounded-md ${currentState === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          Step {currentState} of {totalSteps}
        </div>
        <button
          type="button"
          onClick={nextStep}
          disabled={currentState === totalSteps}
          className={`px-4 py-2 rounded-md ${currentState === totalSteps ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#01368B] text-white hover:bg-[#012a6e]'}`}
        >
          {currentState === totalSteps ? 'Complete' : 'Next'}
        </button>
      </div>
    </main>
  )
}

export default RegisterSample