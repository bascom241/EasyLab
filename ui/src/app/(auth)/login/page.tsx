"use client"
import React, { useState } from 'react'
import Login1 from '@/components/LoginForm/Login1'
import Login2 from '@/components/LoginForm/Login2'
const Start  = () => {

const [currentStep, setCurrentStep] = useState(1);

const nextStep = () => {
  setCurrentStep((prev)=> prev + 1 );
}


  

  return (
    <div>

      {
        currentStep === 1 ?    
         <Login1
         nextStep={nextStep}
         /> 
         :
          <Login2/>
      }
  
    </div>
  )
}

export default Start 
