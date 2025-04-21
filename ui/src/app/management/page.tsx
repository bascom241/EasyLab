"use client";
import React, { useEffect, useState } from "react";
import { useCreateSampleStore } from "@/store/useCreateSampleStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, ArrowRight, XCircle, FlaskConical, Microscope, TestTube2, Syringe, ClipboardList, EditIcon, Loader } from "lucide-react";
import { motion } from "framer-motion";

const Management = () => {
    const [page, setPage] = useState(1);
    const limit = 5;
    const { fetchSamples, sampleData, fetchSample, singleSampleData, results, searchSample, editSample, editingModal } = useCreateSampleStore();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const { authUser } = useAuthStore();
    const [query, setQuery] = useState("");

    const [formData, setFormData] = useState<{
        surName: string;
        otherNames: string;
        age: string;
        gender: string;
        hospitalNumber: string;
        occupation: string;
        sampleInformation: string;
        sampleStatus: string;
        recieptNumber: string;
        ward: string;
        patientType: string;
        dateOfSpecimen: string;
        requestersInformation: {
            requestingDoctor: string;
            consultant: string;
        };
        testType: string[];
    }>({
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

    const handleFormChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = evt.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    const handleSearch = async (value: string) => {
        setQuery(value);
        searchSample(value);
    }


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

    const handleEditSample = async (id: string) => {
        const success = await editSample(formData, id);
        if (success) {
            setShowEditModal(false);
        } else {
            setShowEditModal(true);
        }

    }
    const editModal = (id: string) => {
        fetchSample(id);
        setShowEditModal(true);
        // editSample(formData, id);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setParams(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!query) {
            fetchSamples(page, limit, params);
        }
    },
        [page, JSON.stringify(params)]);
    useEffect(() => {
        if (singleSampleData) {
            setFormData({
                surName: singleSampleData.surName || "",
                otherNames: singleSampleData.otherNames || "",
                age: singleSampleData.age || "",
                gender: singleSampleData.gender || "",
                hospitalNumber: singleSampleData.hospitalNumber || "",
                occupation: singleSampleData.occupation || "",
                sampleInformation: singleSampleData.sampleInformation || "",
                sampleStatus: singleSampleData.sampleStatus || "",
                recieptNumber: singleSampleData.recieptNumber || "",
                ward: singleSampleData.ward || "",
                patientType: singleSampleData.patientType || "",
                dateOfSpecimen: singleSampleData.dateOfSpecimen || "",
                requestersInformation: {
                    requestingDoctor: singleSampleData.requestersInformation?.requestingDoctor || "",
                    consultant: singleSampleData.requestersInformation?.consultant || ""
                },
                testType: singleSampleData.testType || []
            });
        }
    }, [singleSampleData]);

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
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
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
                                {query ? (
                                    results?.map((sample, index) => (
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
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${sample.sampleStatus === "accepted"
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
                                            <td className="py-4 px-6 flex gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors shadow-xs"
                                                    onClick={() => updateModal(sample._id)}
                                                >
                                                    View
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="px-3 py-1.5 bg-green-400 text-white rounded-lg text-sm hover:bg-green-800 transition-colors shadow-2xs"
                                                    onClick={() => editModal(sample._id)}
                                                >
                                                    Edit
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    sampleData?.map((sample, index) => (
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
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${sample.sampleStatus === "accepted"
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
                                            <td className="py-4 px-6 flex gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors shadow-xs"
                                                    onClick={() => updateModal(sample._id)}
                                                >
                                                    View
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="px-3 py-1.5 bg-green-400 text-white rounded-lg text-sm hover:bg-green-800 transition-colors shadow-2xs"
                                                    onClick={() => editModal(sample._id)}
                                                >
                                                    Edit
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
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
                                    className={`w-8 h-8 rounded flex items-center justify-center text-sm ${page === val
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
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${singleSampleData.sampleStatus === "accepted"
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

                {showEditModal && (
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
                                    <EditIcon className="h-5 w-5" />
                                    <h2 className="text-lg font-semibold">Edit Sample Details</h2>
                                </div>
                                <button onClick={() => setShowEditModal(false)} className="text-gray-300 hover:text-white">
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Edit Form Content */}
                            {singleSampleData &&
                                <div className="p-6 max-w-6xl mx-auto">
                                    <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Edit Sample Information</h2>

                                        <form className="space-y-6">
                                            {/* Patient Information Section */}
                                            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Row 1 */}
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Surname</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        onChange={handleFormChange}
                                                        value={formData.surName}
                                                        name="surName"
                                                        placeholder="Enter surname"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Other Names</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        placeholder="Enter other names"
                                                        onChange={handleFormChange}
                                                        value={formData.otherNames}
                                                        name="otherNames"
                                                    />
                                                </div>

                                                {/* Row 2 */}
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Age</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        placeholder="Enter age"
                                                        onChange={handleFormChange}
                                                        value={formData.age}
                                                        name="age"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Gender</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        placeholder="Enter gender"
                                                        onChange={handleFormChange}
                                                        value={formData.gender}
                                                        name="gender"
                                                    />
                                                </div>

                                                {/* Row 3 */}
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Hospital Number</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        placeholder="Enter hospital number"
                                                        onChange={handleFormChange}
                                                        value={formData.hospitalNumber}
                                                        name="hospitalNumber"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Occupation</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        placeholder="Enter occupation"
                                                        onChange={handleFormChange}
                                                        value={formData.occupation}
                                                        name="occupation"
                                                    />
                                                </div>

                                                {/* Row 4 */}
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Sample Type</label>
                                                    <select
                                                        className="p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        value={formData.sampleInformation}
                                                        name="sampleInformation"
                                                        onChange={handleFormChange}
                                                    >
                                                        <option value="blood">Blood</option>
                                                        <option value="plasma">Plasma</option>
                                                        <option value="serum">Serum</option>
                                                        <option value="protein">Protein</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Sample Status</label>
                                                    <select
                                                        className={`p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formData.sampleStatus === "accepted" ? "text-green-600" :
                                                                formData.sampleStatus === "rejected" ? "text-red-600" : "text-gray-700"
                                                            }`}
                                                        value={formData.sampleStatus}
                                                        onChange={handleFormChange}
                                                        name="sampleStatus"
                                                    >
                                                        <option value="" disabled>Select Status</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </div>

                                                {/* Row 5 - Full width */}
                                                <div className="md:col-span-2 space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Receipt Number</label>
                                                    <input
                                                        className='p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                        type="text"
                                                        placeholder="Enter receipt number"
                                                        onChange={handleFormChange}
                                                        value={formData.recieptNumber}
                                                        name="recieptNumber"
                                                    />
                                                </div>

                                                {/* Row 6 - Patient Type */}
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-sm font-medium text-gray-700 block">Patient Type</label>
                                                    <div className="flex items-center space-x-6">
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                                name="patientType"
                                                                value="Out Patient"
                                                                checked={formData.patientType === "Out Patient"}
                                                                onChange={handleFormChange}
                                                            />
                                                            <span className="ml-2 text-gray-700">Out Patient</span>
                                                        </label>
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                                name="patientType"
                                                                value="In Patient"
                                                                checked={formData.patientType === "In Patient"}
                                                                onChange={handleFormChange}
                                                            />
                                                            <span className="ml-2 text-gray-700">In Patient</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* Ward/Clinic and Date Section */}
                                            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Ward/Clinic</label>
                                                    <select
                                                        className="p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        name="ward"
                                                        value={formData.ward}
                                                        onChange={handleFormChange}
                                                    >
                                                        <option value="femaleSurgicalWard">Female Surgical Ward</option>
                                                        <option value="maleSurgicalWard">Male Surgical Ward</option>
                                                        <option value="ENT">ENT</option>
                                                        <option value="MOPD">MOPD</option>
                                                        <option value="A&E">A&E</option>
                                                        <option value="O&G">O&G</option>
                                                        <option value="GOPD">GOPD</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Date of Specimen Collection</label>
                                                    <input
                                                        type="date"
                                                        className="p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        value={formData.dateOfSpecimen}
                                                        name="dateOfSpecimen"
                                                        onChange={handleFormChange}
                                                    />
                                                </div>
                                            </section>

                                            {/* Requesters Information Section */}
                                            <section className="border border-gray-200 rounded-md p-4 bg-white">
                                                <h2 className="font-semibold text-lg mb-4 text-gray-800">Requesters Information</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-medium text-gray-700">Requesting Doctor</label>
                                                        <input
                                                            className="p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Enter doctor's name"
                                                            value={formData.requestersInformation.requestingDoctor}
                                                            name="requestersInformation.requestingDoctor"
                                                            onChange={handleFormChange}
                                                        />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <label className="text-sm font-medium text-gray-700">Consultant</label>
                                                        <input
                                                            className="p-3 w-full bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Enter consultant's name"
                                                            value={formData.requestersInformation.consultant}
                                                            name="requestersInformation.consultant"
                                                            onChange={handleFormChange}
                                                        />
                                                    </div>
                                                </div>
                                            </section>



                                            {/* Submit Button */}
                                            <div className="pt-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full flex item-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                                                    type="button"
                                                    onClick={() => handleEditSample(singleSampleData._id)}
                                                >
                                                    {
                                                        editingModal ? <Loader /> : <p>Update Sample Information</p>
                                                    }

                                                </motion.button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            }
                        </motion.div>
                    </div>
                )

                }
            </div>
        </main>
    );
};

export default Management;