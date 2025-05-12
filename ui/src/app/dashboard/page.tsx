"use client";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import { AwardIcon, XCircle } from 'lucide-react'
import { usePaymentStore } from "@/store/usePayment";
import {toast} from "sonner";
import {Loader} from 'lucide-react'
const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const {initializePayment,inititalizingPayment} = usePaymentStore();
  const [formData, setFormData] = useState({
    email: "",
    amount: ""
  })

  const makePaymemt = () => {
    setShowModal(true)
  }


  const [stats, setStats] = useState({
    patients: 0,
    tests: 0,
    efficiency: 0
  });


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
      setStats({
        patients: 1242,
        tests: 3568,
        efficiency: 98
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const success = await initializePayment(formData);
      console.log(success)
      if(success){
        if (typeof success === "string") {
          window.location.href = success;
        }
      }
    }catch(err){
      toast.error(err as any)
    }
  }



  return (
    <main className='w-full p-4 md:p-6 lg:p-8 mt-12 md:mt-16 min-h-[calc(100vh-3rem)] flex flex-col overflow-hidden bg-neutral-50'>
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-medium text-gray-700">Preparing your lab dashboard...</h2>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col gap-2 mb-6 md:mb-8 lg:mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
              Welcome back to <span className="text-blue-600">MediLorn</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              Streamlined lab management for modern healthcare
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.patients.toLocaleString()}</p>
              <p className="text-green-500 text-xs mt-1">↑ 12% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-medium">Tests Processed</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.tests.toLocaleString()}</p>
              <p className="text-green-500 text-xs mt-1">↑ 8% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
              <h3 className="text-gray-500 text-sm font-medium">System Efficiency</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.efficiency}%</p>
              <p className="text-blue-500 text-xs mt-1">Optimal performance</p>
            </div>
          </div>

          {/* Marketing Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-6 md:mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Experience the Future of Lab Management</h2>
              <p className="text-blue-100 mb-4 max-w-2xl">
                Reduce paperwork by 80% and accelerate test results delivery with our AI-powered lab management system.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time Tracking
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Automated Reporting
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full opacity-20">
              <svg className="h-full w-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M45,-78.3C58.5,-70.7,69.7,-58.8,77.5,-44.6C85.3,-30.4,89.7,-13.9,89.9,2.8C90,19.5,85.9,38.9,75.5,53.1C65.1,67.2,48.4,76.1,31.5,81.4C14.6,86.7,-2.5,88.4,-18.2,83.2C-33.9,78,-48.2,65.9,-59.6,51.7C-71,37.5,-79.5,21.2,-82.7,3.1C-85.9,-15.1,-83.8,-35.1,-73.6,-50.3C-63.5,-65.5,-45.3,-75.9,-28.5,-82.4C-11.7,-88.9,3.7,-91.5,18.7,-86.9Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="flex items-center mt-2">
              <button className="bg-white px-6 py-2 text-green-600 border-2 border-green-200 rounded-md hover:bg-green-200 transition-all duration-300 " onClick={makePaymemt}>
                Go Premium
              </button>
            </div>

          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div
                className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >

                <div className="sticky top-0 bg-gray-800 text-white p-4 flex  justify-between items-center shadow-sm">
                  <div className="flex items-center gap-3">
                    <AwardIcon className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">What we Offer In Our Premium Package</h2>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-gray-300 hover:text-white">
                    <XCircle className="h-5 w-5" />
                  </button>



                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited Storage for patients for 24hrs
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Ai Support for Automated texts
                  </div>


                </div>

                <form className="flex flex-col gap-4 p-6 border-t border-gray-200" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email" id="email"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="Amount" className="text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="text" id="email"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="#5000"
                      value={formData.amount}
                      name="amount"
                      onChange={handleFormChange}
                     
                    />

                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
                    type="submit">

                     {
                       inititalizingPayment ? <div className="flex justify-center items-center gap-2">
                        <Loader className="animate-spin " />
                        <p>Making Payment</p>
                      </div>: "Make Payment "
                     }
                     
                      </button>
                </form>
              </motion.div>



            </div>
          )}


          {/* Video Container with Improved Header */}
          <div className="w-full flex-1 rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                MediLorn System Overview
              </h2>
              <p className="text-sm text-gray-500">See how our platform transforms lab operations</p>
            </div>
            <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/LabDemo.mp4" type="video/mp4" />
                Your browser does not support this video.
              </video>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                Demo Video
              </div>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium">New Patient</span>
            </button>
            <button className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Test Results</span>
            </button>
            <button className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium">Reports</span>
            </button>
            <button className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;