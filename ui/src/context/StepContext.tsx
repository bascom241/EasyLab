
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';


type StepContextType = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
};


const StepContext = createContext<StepContextType | undefined>(undefined);


type StepContextProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const StepContextProvider:React.FC<StepContextProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

 const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }

  // Value to be passed to consumers
  const value: StepContextType = {
    currentStep,
    nextStep,
    prevStep,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export const useStepContext = () => {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useStepContext must be used within a StepContextProvider');
  }
  return context;
};