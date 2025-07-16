'use client';
import React from 'react';
import flag from '../../../assets/Character.png';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Form5Props {
  progress: number;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const FormPage5: React.FC<Form5Props> = ({ progress }) => {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-16 px-6 sm:px-12 lg:px-24 bg-white overflow-hidden">
      {/* Progress bar */}
      <div className="w-full max-w-xl">
        <div className="bg-gray-300 w-full rounded-full h-2 mb-6">
          <div
            className="bg-[#01368B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full max-w-xl flex flex-col items-center text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#01368B]">
          Sign Up Complete
        </h1>

        {/* Image */}
        <div className="w-full max-w-sm">
          <Image
            src={flag}
            alt="Celebration"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Congratulations Text */}
        <div className="text-xl sm:text-2xl font-medium text-gray-800 space-y-1">
          <p>Congratulations on Your Successful</p>
          <p>Sign-Up!</p>
        </div>

        {/* Button */}
        <div className="w-full mt-6">
          <button
            className="bg-[#01368B] hover:bg-[#0d47a1] transition-all w-full sm:w-1/2 mx-auto flex items-center justify-center gap-3 text-white py-3 rounded-md"
            onClick={() => router.push('/verifyEmail')}
          >
            <span>Login</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default FormPage5;
