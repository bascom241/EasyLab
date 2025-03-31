"use client";
import React, { useEffect, useState,useRef } from "react";
import { useCreateSampleStore } from "@/store/useCreateSampleStore";
import { ReceiptIcon, XCircle } from "lucide-react"

const Management = () => {
    const [page, setPage] = useState(1);
    const limit = 5;
    const { fetchSamples, sampleData, fetchSample, singleSampleData } = useCreateSampleStore();
    const [showModal, setShowModal] = useState(false);

    const updateModal = (id: string) => {
        fetchSample(id);
        setShowModal(true);
    }

    console.log(singleSampleData?.age);

    const [params, setParams] = useState({
        ward: "",
        sampleStatus: "",
        ReceiptNumber: "",
        sampleInformation: ""
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setParams((prev) => ({
            ...prev, [name]: value
        }))
    }

    useEffect(() => {
        fetchSamples(page, limit, params);
    }, [params]);


    return (
        <main className="mt-16 flex flex-col w-full   h-screen gap-4 p-4">
            <h1 className="text-2xl font-semibold text-gray-800">Management Page</h1>

            {/* Search Input */}
            <section className="w-full flex gap-3 justify-between items-center ">
                <div className="flex w-full">
                    <input
                        placeholder="Search"
                        className="py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none  w-full"
                    />
                    <button className="bg-[#01368B] text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                        Search
                    </button>
                </div>

                <div className="w-full flex gap-3">
                    {/* <select className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-xs"
                    >
                        <option value="" disabled={true}>
                            Sample Information
                        </option>
                        <option value="serum">
                            serum
                        </option>
                        <option value="plasma">
                            plasma
                        </option>
                        <option value="blood">
                            blood
                        </option>
                        <option value="protein">
                            protein
                        </option>
                    </select>
 */}

                    <select
                        value={params.sampleStatus}
                        name="sampleStatus"
                        onChange={handleChange}
                        className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-xs">
                        <option>status</option>
                        <option value="accepted">accepted</option>
                        <option value="rejected">rejected</option>
                    </select>



                    <select
                        onChange={handleChange}
                        name="ward"
                        value={params.ward}
                        className="bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] rounded-md cursor-pointer text-xs">
                        <option>Ward</option>
                        <option value="femaleSurgicalWard">femaleSurgicalWard</option>
                        <option value="maleSurgicalWard">maleSurgicalWard</option>
                        <option value="ENT">ENT</option>
                        <option value="MOPD">MOPD</option>
                        <option value="O&G">O&G</option>
                        <option value="A&E">A&E</option>
                        <option value="GOPD">GOPD</option>
                    </select>

                    <input
                        name="ReceiptNumber"
                        value={params.ReceiptNumber}
                        onChange={handleChange}
                        type="text"
                        placeholder="Recipt Number"
                        className="py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none  w-full"
                    />
                </div>
            </section>

            {/* Table Section */}
            <section className="w-full overflow-x-auto">
                <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-[#01368B] text-white text-sm uppercase">
                        <tr>
                            <th className="py-2 px-3 text-left">Lab No</th>
                            <th className="py-2 px-3 text-left">Date</th>
                            <th className="py-2 px-3 text-left">Patient Name</th>
                            <th className="py-2 px-3 text-left">Sample Status</th>
                            <th className="py-2 px-3 text-left">Test Type</th>
                            <th className="py-2 px-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {sampleData.length > 0 ? (
                            sampleData.map((sample) => (
                                <tr
                                    key={sample._id}
                                    className="hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="py-3 px-4">{sample.hospitalNumber}</td>
                                    <td className="py-3 px-4">{sample.dateOfSpecimen || "N/A"}</td>
                                    <td className="py-3 px-4">{sample.surName}</td>
                                    <td

                                    >
                                        <p className={`w-1/2 p-2 text-sm text-center rounded-full font-semibold ${sample.sampleStatus === "accepted"
                                            ? "text-green-600 bg-green-300"
                                            : "text-red-600 bg-red-300"
                                            }`}>{sample.sampleStatus}</p>
                                    </td>
                                    <td className="py-3 px-4">{sample.testType.join(", ")}</td>
                                    <td className="py-3 px-4">
                                        <button className="bg-[#01368B] text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition" onClick={() => updateModal(sample._id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No samples found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div>

                </div>
            </section>

            {

                showModal &&

                <section className="fixed inset-0 flex items-center justify-center bg-black/50 py-4">

                    <div className="bg-white  border-[1px] border-gray-400 shadow-lg text-center w-2/4 h-full ">
                        <div className="p-6 border-b-[1px] border-b-gray-300 flex gap-16">
                            <XCircle onClick={() => setShowModal(false)} color="red" />
                            <p>Unilorin Teaching Hospital</p>

                        </div>
                        <div className="bg-gray-200 w-full h-3/4" >
                            {singleSampleData && (
                                <div className="flex flex-col gap-2 px-4 ">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-2xl font-semibold">#{singleSampleData.hospitalNumber}</h1>
                                        <p>{singleSampleData.dateOfSpecimen}</p>
                                        <p>RegNumber:{singleSampleData.recieptNumber}</p>
                                    </div>

                                    <div className="flex flex-col gap-4 text-sm">
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Patient</p>
                                            <p>{singleSampleData.surName}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Gender</p>
                                            <p>{singleSampleData.gender}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Age</p>
                                            <p>{singleSampleData.age}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Sample Type</p>
                                            <p>{singleSampleData.sampleInformation}</p>
                                        </div>
                                        <div className={'flex justify-between'}>
                                            <p className="font-bold">Sample Status</p>
                                            <p className={`text-[7px] ${singleSampleData.sampleStatus === "accepted"
                                                ? "text-green-600 bg-green-300 rounded-full p-2"
                                                : "text-red-600 bg-red-300 rounded-full p-2"
                                                }`}>{singleSampleData.sampleStatus}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Ward</p>
                                            <p>{singleSampleData.ward}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Test Type</p>
                                            <p>{singleSampleData.testType.join(", ")}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Requesters Information</p>
                                            <p>{singleSampleData.requestersInformation.consultant}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p className="font-bold">Scientist In Charge</p>
                                            <p>{singleSampleData.requestersInformation.requestingDoctor}</p>
                                        </div>
                                    </div>
                                </div>)}
                        </div>

                        <div className="w-full flex gap-4 items-center justify-center py-3 px-6">


                            <button className="bg-[#01368B] rounded-md text-white p-2 w-full  transition duration-300 hover:bg-[#01368bb1]">
                                Print Result
                            </button>
                        </div>
                    </div>
                </section>
            }
        </main>
    );
};

export default Management;
