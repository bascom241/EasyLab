"use client";
import React, { useEffect, useState } from "react";
import { FlaskConical, Printer, Download, ChevronLeft, Search, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useCreateSampleStore } from "@/store/useCreateSampleStore";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ReportPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 5;
  const {  reports, isGettingReportsQuery, fetchingIssue, fetchIssues,fetchReports, clearSearchResults,searchReports } = useCreateSampleStore();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [query, setQuery] = useState("");
 

  useEffect(() => {
    fetchIssues();
  }, []);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
  const {value} = e.target;
  setQuery(value);
}

const handleSubmit = ()=> {
 
  if(query.trim() !== ""){
    fetchReports(query);
  }else {
    clearSearchResults();

  }

}

  const handlePrint = (sample: any) => {
    setSelectedReport(sample);
    setTimeout(() => {
      const printContent = document.getElementById('report-content');
      if (printContent) {
        const originalContents = document.body.innerHTML;
        const printContents = printContent.innerHTML;
        
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
      }
    }, 100);
  };

  const handleDownloadPDF = async (sample: any) => {
    setSelectedReport(sample);
    setIsGeneratingPDF(true);
    
    setTimeout(async () => {
      try {
        const reportElement = document.getElementById('report-content');
        if (!reportElement) return;
        
        const clone = reportElement.cloneNode(true) as HTMLElement;
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.visibility = 'visible';
        document.body.appendChild(clone);

        const elements = clone.querySelectorAll('*');
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          if (styles.color.includes('oklch')) {
            (el as HTMLElement).style.color = '#333333';
          }
          if (styles.backgroundColor.includes('oklch')) {
            (el as HTMLElement).style.backgroundColor = '#ffffff';
          }
        });

        const canvas = await html2canvas(clone, {
          scale: 2,
          logging: false,
          useCORS: true,
          backgroundColor: '#ffffff',
        });

        document.body.removeChild(clone);

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${sample.sampleNumber}_report.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 100);
  };

  if (fetchingIssue || isGettingReportsQuery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  const dataToDisplay = query.trim() !== "" ? searchReports : reports;
  if(!dataToDisplay || dataToDisplay.length === 0) {
    return (

      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <p className="text-gray-500">No reports found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg"
            >
              <FlaskConical className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Laboratory Reports</h1>
              <p className="text-gray-600 mt-1">View, print and download patient test reports</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Issue Type , Priority Level"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                onChange={handleChange}
                value={query}
                        />
            </div>
            {/* <select className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition">
              <option value="">All Status</option>
              <option value="accepted">Completed</option>
              <option value="pending">Pending</option>
            </select> */}
            <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-md hover:shadow-lg" onClick={handleSubmit}>
              Apply Filters
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports?.map((sample) => (
            <motion.div 
              key={sample._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-blue-100 transition-all"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {sample.sampleNumber}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {sample.issue} 
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sample.priorityLevel === "high" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {sample.priorityLevel === "high" ? "Action needed" : "Very Urgent"}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>{sample.issueType}</p>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span>{sample.testType.join(', ')}</span>
                  </div> */}
                </div>

                <div className="mt-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePrint(sample)}
                    className="flex-1 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-200"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDownloadPDF(sample)}
                    disabled={isGeneratingPDF && selectedReport?._id === sample._id}
                    className="flex-1 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-md"
                  >
                    {isGeneratingPDF && selectedReport?._id === sample._id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hidden Report Template */}
        {selectedReport && (
          <div id="report-content" className="fixed -left-[10000px] top-0">
            <div className="bg-white p-10 w-[210mm] text-gray-800 font-sans">
              {/* Report Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FlaskConical className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-blue-800">MEDILAB DIAGNOSTICS</h1>
                      <p className="text-sm text-gray-500">Accurate Results. Trusted Care.</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    123 Medical Drive, Health City • (555) 123-4567 • www.medilab.example.com
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{selectedReport.hospitalNumber}</p>
                  <p className="text-sm text-gray-600">
                    Report Date: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Patient Information */}
              <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-lg font-bold mb-3 text-blue-700">
                  Report Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Patient Name:</p>
                    <p>{selectedReport.name} </p>
                  </div>
                  <div>
                    <p className="font-semibold">Issue Type:</p>
                    <p>{selectedReport.issueType} years / {selectedReport.gender}</p>
                  </div>
                  {/* <div>
                    <p className="font-semibold">Collection Date:</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sample Type:</p>
                    <p>{selectedReport.sampleInformation || "—"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Requesting Physician:</p>
                    <p>{selectedReport.requestersInformation?.requestingDoctor || "—"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Ward/Department:</p>
                    <p>{selectedReport.ward || "—"}</p>
                  </div> */}
                </div>
              </div>

              {/* Test Results */}
              {/* <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-blue-700 border-b pb-2">
                  LABORATORY RESULTS
                </h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-200">Test Name</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-200">Result</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-200">Units</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-200">Reference Range</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.testType.map((test: string, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 border-b border-gray-100">{test}</td>
                        <td className="py-3 px-4 border-b border-gray-100">—</td>
                        <td className="py-3 px-4 border-b border-gray-100">—</td>
                        <td className="py-3 px-4 border-b border-gray-100">—</td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            selectedReport.sampleStatus === "accepted" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {selectedReport.sampleStatus === "accepted" ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold">Laboratory Director:</p>
                    <p>Dr. Sarah Johnson, MD</p>
                    <p className="mt-2">This is an electronically generated report. No signature is required.</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2 h-px bg-gray-300 w-40 ml-auto"></div>
                    <p className="text-sm text-gray-600">Authorized Signature</p>
                    <p className="text-xs text-gray-500 mt-6">
                      Report generated: {new Date().toLocaleString()} • Medilab Diagnostics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ReportPage;