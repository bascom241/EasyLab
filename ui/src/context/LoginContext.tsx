"use client"
import { createContext, useContext, useState, ReactNode } from 'react';


interface LoginContextType {
    currentStep:number,
    nextStep:() => void,
    prevStep:()=> void
}
const LoginContext = createContext<LoginContextType | undefined>(undefined);

type LoginContextProviderProps = {
    children:ReactNode
}

export const LoginContextProvider:React.FC<LoginContextProviderProps> = ({children}) => {
const [currentStep,setCurrentStep] = useState(1);

const nextStep = () => {
    setCurrentStep((prev)=> prev + 1 );
}

const prevStep = () => {
    if(currentStep > 1 ){
        setCurrentStep((prev) => prev - 1);
    }
}
const value:LoginContextType = {
    currentStep,
    nextStep,
    prevStep
}

    return <LoginContext.Provider value={value}>
        {children}
    </LoginContext.Provider>
}

export const useLoginContext = () =>{
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useStepContext must be used within a StepContextProvider');
      }
      return context;
}