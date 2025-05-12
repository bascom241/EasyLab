"use client"
import React, { useState } from 'react'
import { AlertCircle, FlaskConical, User, ChevronDown } from 'lucide-react'
import { useCreateSampleStore } from '@/store/useCreateSampleStore'
const Issue = () => {
    const [formData, setFormData] = useState({
        sampleNumber: '',
        name: '',
        issueType: '',
        issue: '',
        priorityLevel: 'medium',
        email: ''
    })



    const { createIssue , isCreatingIssue,submitSuccess} = useCreateSampleStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit =async  (e: React.FormEvent) => {
        e.preventDefault()
        const success = await createIssue(formData);
        if (success) {
            setFormData({
                sampleNumber: '',
                name: '',
                issueType: '',
                issue: '',
                priorityLevel: 'medium',
                email: ''
            })
        }


    }

    const issueTypes = [
        'Sample Collection Issue',
        'Test Result Concern',
        'Report Delivery Problem',
        'Billing Inquiry',
        'Other'
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                        <AlertCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Report a Lab Issue</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Let us know about any problems with your lab tests or samples
                    </p>
                </div>

                {submitSuccess && (
                    <div className="rounded-md bg-green-50 p-4 mb-8 border border-green-200">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Issue reported successfully</h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p>We've received your concern and will contact you shortly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <FlaskConical className="h-5 w-5 text-blue-500 mr-2" />
                            Sample Information
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-5">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="labNumber" className="block text-sm font-medium text-gray-700">
                                    Lab Sample Number *
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FlaskConical className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="sampleNumber"
                                        id="sampleNumber"
                                        required
                                        value={formData.sampleNumber}
                                        onChange={handleChange}
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                                        placeholder="e.g. LAB-2023-12345"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                                    Your Name *
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="name"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
                                    Type of Issue *
                                </label>
                                <div className="mt-1 relative">
                                    <select
                                        id="issueType"
                                        name="issueType"
                                        required
                                        value={formData.issueType}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                                    >
                                        <option value="">Select an issue type</option>
                                        {issueTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority Level
                                </label>
                                <div className="mt-2 flex space-x-4">
                                    {['low', 'medium', 'high'].map((level) => (
                                        <label key={level} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="priorityLevel"
                                                value={level}
                                                checked={formData.priorityLevel === level}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description of the Issue *
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="issue"
                                        name="issue"
                                        rows={4}
                                        required
                                        value={formData.issue}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                                        placeholder="Please describe the issue in detail..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                                    Contact Email (optional)
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-4 border"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={isCreatingIssue}
                                className="ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                            >
                                {isCreatingIssue ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : 'Submit Issue'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Need immediate assistance? Call our support line at <a href="tel:+2347078135314" className="text-blue-600 hover:text-blue-500">(123) 456-7890</a></p>
                </div>
            </div>
        </div>
    )
}

export default Issue