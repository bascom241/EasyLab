"use client";
import React, { useEffect, useState } from "react";
import { useCreateSampleStore } from "@/store/useCreateSampleStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, ArrowRight, XCircle, FlaskConical, Microscope, TestTube2, Syringe, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const Management = () => {
    const [page, setPage] = useState(1);
    const limit = 5;
    const { fetchSamples, sampleData, fetchSample, singleSampleData } = useCreateSampleStore();
    const [showModal, setShowModal] = useState(false);
    const { authUser } = useAuthStore();

    const [params, setParams] = useState({
        ward: "",
        sampleStatus: "",
        ReceiptNumber: "",
        sampleInformation: ""
    });

    // **Dark & Smooth Color Palette**
    const colors = {
        primary: "#1a1a2e",     // Deep navy
        secondary: "#16213e",   // Dark blue
        accent: "#0f3460",      // Midnight blue
        cardBg: "#ffffff",      // Pure white for cards
        text: "#333333",        // Dark gray for text
        lightText: "#f5f5f5",   // Light text for dark backgrounds
        border: "#e0e0e0",      // Soft gray borders
        success: "#4caf50",     // Calm green (only for status)
        danger: "#e53935",      // Soft red (only for status)
        hover: "#f0f0f0"        // Light hover effect
    };

    const nextPage = () => page < 10 && setPage(prev => prev + 1);
    const prevPage = () => page > 1 && setPage(prev => prev - 1);
    const updateModal = (id: string) => { fetchSample(id); setShowModal(true); };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setParams(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => { fetchSamples(page, limit, params); }, [page, JSON.stringify(params)]);

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8"> {/* Soft gray background */}
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-lg bg-[${colors.primary}] shadow-sm`}>
                        <FlaskConical className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Sample Management</h1>
                        <p className="text-gray-500">Track and manage laboratory specimens</p>
                    </div>
                </div>

                {/* Search & Filters */}
                <motion.section 
                    className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-[colors.border]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <input
                                placeholder="Search samples..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
                            />
                            <ClipboardList className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                value={params.sampleStatus}
                                name="sampleStatus"
                                onChange={handleChange}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                            >
                                <option value="">All Status</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <select
                                name="ward"
                                value={params.ward}
                                onChange={handleChange}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                            >
                                <option value="">All Wards</option>
                                <option value="femaleSurgicalWard">Female Surgical</option>
                                <option value="maleSurgicalWard">Male Surgical</option>
                            </select>
                        </div>
                    </div>
                </motion.section>

                {/* Samples Table */}
                <motion.section 
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-[colors.border]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr className="text-left text-gray-600 text-sm">
                                    <th className="py-3 px-6 font-medium">Lab No</th>
                                    <th className="py-3 px-6 font-medium">Date</th>
                                    <th className="py-3 px-6 font-medium">Patient</th>
                                    <th className="py-3 px-6 font-medium">Status</th>
                                    <th className="py-3 px-6 font-medium">Tests</th>
                                    <th className="py-3 px-6 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sampleData.map((sample, index) => (
                                    <motion.tr
                                        key={sample._id}
                                        className="hover:bg-gray-50 transition-colors"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <td className="py-4 px-6 text-gray-800 font-medium">{sample.hospitalNumber}</td>
                                        <td className="py-4 px-6 text-gray-500">{sample.dateOfSpecimen || "—"}</td>
                                        <td className="py-4 px-6 text-gray-800">{sample.surName}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                sample.sampleStatus === "accepted"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}>
                                                {sample.sampleStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-500">
                                            <div className="flex items-center gap-1">
                                                {sample.testType.includes("Blood") && <Syringe className="h-4 w-4 text-gray-400" />}
                                                {sample.testType.join(", ")}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors shadow-xs"
                                                onClick={() => updateModal(sample._id)}
                                            >
                                                View
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <motion.button
                            whileHover={{ x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                            onClick={prevPage}
                            disabled={page === 1}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm">Previous</span>
                        </motion.button>

                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <motion.button
                                    key={val}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                                        page === val 
                                            ? "bg-gray-800 text-white" 
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                    onClick={() => setPage(val)}
                                >
                                    {val}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 ${page > 4 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                            onClick={nextPage}
                            disabled={page > 4}
                        >
                            <span className="text-sm">Next</span>
                            <ArrowRight className="h-4 w-4" />
                        </motion.button>
                    </div>
                </motion.section>

                {/* Sample Detail Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div 
                            className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-3">
                                    <FlaskConical className="h-5 w-5" />
                                    <h2 className="text-lg font-semibold">Sample Details</h2>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-gray-300 hover:text-white">
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            {singleSampleData && (
                                <div className="p-6">
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">#{singleSampleData.hospitalNumber}</h3>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                singleSampleData.sampleStatus === "accepted"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}>
                                                {singleSampleData.sampleStatus}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <p>Collected: {singleSampleData.dateOfSpecimen}</p>
                                            <p>Receipt: {singleSampleData.recieptNumber}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Patient Info */}
                                        <div className="space-y-4">
                                            <h4 className="text-md font-semibold text-gray-700 border-b pb-2">Patient</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Name:</span>
                                                    <span className="font-medium text-gray-800">{singleSampleData.surName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Gender:</span>
                                                    <span className="font-medium text-gray-800">{singleSampleData.gender}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Age:</span>
                                                    <span className="font-medium text-gray-800">{singleSampleData.age}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sample Info */}
                                        <div className="space-y-4">
                                            <h4 className="text-md font-semibold text-gray-700 border-b pb-2">Sample</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Type:</span>
                                                    <span className="font-medium text-gray-800">{singleSampleData.sampleInformation}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Ward:</span>
                                                    <span className="font-medium text-gray-800">{singleSampleData.ward}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Tests:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {singleSampleData.testType.map((test, i) => (
                                                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                                {test}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="mt-8 flex gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-xs"
                                        >
                                            Print Result
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Management;