"use client"

import { Loader, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'

const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    facilityName: "",
    departmentName: "",
  });

  const { editProfile, editingUser, authUser } = useAuthStore();
  const userId = authUser?._id || "";

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser?.fullName || "",
        email: authUser?.email || "",
        phoneNumber: authUser?.phoneNumber || "",
        facilityName: authUser?.facilityName || "",
        departmentName: authUser?.departmentName || "",
      });
    }
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editProfile(formData, userId);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-black p-3 rounded-full">
          <User className="text-white text-3xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Account Settings</h1>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              name="fullName"
              onChange={handleChange}
              className="p-3 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              className="p-3 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              className="p-3 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>

          {/* Facility Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Facility Name</label>
            <input
              type="text"
              placeholder="Enter facility name"
              value={formData.facilityName}
              name="facilityName"
              onChange={handleChange}
              className="p-3 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>

          {/* Department Name */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              placeholder="Enter department name"
              value={formData.departmentName}
              name="departmentName"
              onChange={handleChange}
              className="p-3 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={editingUser}
          className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-900 transition-all font-semibold shadow-md"
        >
          {editingUser ? (
            <>
              <Loader className="animate-spin" />
              Saving...
            </>
          ) : (
            <>Save Changes</>
          )}
        </motion.button>
      </form>
    </main>
  );
};

export default Settings;
