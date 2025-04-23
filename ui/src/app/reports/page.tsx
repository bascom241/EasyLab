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
  const { fetchSamples, sampleData, isLoading } = useCreateSampleStore();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [params, setParams] = useState({
        ward: "",
        sampleStatus: "",
        ReceiptNumber: "",
        sampleInformation: ""
    });
  useEffect(() => {
    fetchSamples(page, limit, params);
  }, [fetchSamples]);

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
        // Create a clone of the report element to avoid CSS issues
        const reportElement = document.getElementById('report-content');
        if (!reportElement) return;
        
        const clone = reportElement.cloneNode(true) as HTMLElement;
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.visibility = 'visible';
        document.body.appendChild(clone);

        // Replace any unsupported color functions
        const elements = clone.querySelectorAll('*');
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          if (styles.color.includes('oklch')) {
            (el as HTMLElement).style.color = '#333333'; // Fallback to hex
          }
          if (styles.backgroundColor.includes('oklch')) {
            (el as HTMLElement).style.backgroundColor = '#ffffff'; // Fallback to hex
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
        pdf.save(`${sample.hospitalNumber}_report.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 100);
  };

  if (isLoading && !sampleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#1a1a2e] shadow-sm">
              <FlaskConical className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">Laboratory Reports</h1>
              <p className="text-[#666666]">View and download test reports</p>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-[#333333] hover:bg-[#f0f0f0] rounded-lg"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleData?.map((sample) => (
            <motion.div 
              key={sample._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-[#e0e0e0]"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-[#333333]">
                    {sample.hospitalNumber}
                  </h2>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    sample.sampleStatus === "accepted" 
                      ? "bg-[#e6f7ee] text-[#28a745]" 
                      : "bg-[#fff3cd] text-[#856404]"
                  }`}>
                    {sample.sampleStatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p><span className="text-[#666666]">Patient:</span> {sample.surName} {sample.otherNames}</p>
                  <p><span className="text-[#666666]">Date:</span> {sample.dateOfSpecimen ? new Date(sample.dateOfSpecimen).toLocaleDateString() : "N/A"}</p>
                  <p><span className="text-[#666666]">Tests:</span> {sample.testType.join(', ')}</p>
                </div>

                <div className="mt-6 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePrint(sample)}
                    className="flex-1 py-2 bg-[#f8f9fa] text-[#333333] rounded-md text-sm hover:bg-[#e9ecef] transition-colors flex items-center justify-center gap-1"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDownloadPDF(sample)}
                    disabled={isGeneratingPDF && selectedReport?._id === sample._id}
                    className="flex-1 py-2 bg-[#007bff] text-white rounded-md text-sm hover:bg-[#0069d9] transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    {isGeneratingPDF && selectedReport?._id === sample._id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        PDF
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
            <div className="bg-white p-8 w-[210mm] text-[#333333]">
              {/* Report Header */}
              <div className="border-b-2 border-[#333333] pb-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold">LABORATORY REPORT</h1>
                    <p className="text-sm">Hospital Laboratory System</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{selectedReport.hospitalNumber}</p>
                    <p className="text-sm">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b border-[#333333] pb-1">
                  PATIENT INFORMATION
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-semibold">Name:</span> {selectedReport.surName} {selectedReport.otherNames}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Age/Gender:</span> {selectedReport.age} / {selectedReport.gender}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Date Collected:</span> {new Date(selectedReport.dateOfSpecimen).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Hospital No:</span> {selectedReport.hospitalNumber}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Sample Type:</span> {selectedReport.sampleInformation}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Requesting Doctor:</span> {selectedReport.requestersInformation?.requestingDoctor || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b border-[#333333] pb-1">
                  TEST RESULTS
                </h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fa]">
                      <th className="border border-[#dee2e6] py-2 px-3 text-left font-semibold">Test</th>
                      <th className="border border-[#dee2e6] py-2 px-3 text-left font-semibold">Result</th>
                      <th className="border border-[#dee2e6] py-2 px-3 text-left font-semibold">Reference Range</th>
                      <th className="border border-[#dee2e6] py-2 px-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.testType.map((test: string, index: number) => (
                      <tr key={index}>
                        <td className="border border-[#dee2e6] py-2 px-3">{test}</td>
                        <td className="border border-[#dee2e6] py-2 px-3">—</td>
                        <td className="border border-[#dee2e6] py-2 px-3">—</td>
                        <td className="border border-[#dee2e6] py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            selectedReport.sampleStatus === "accepted" 
                              ? "bg-[#e6f7ee] text-[#28a745]" 
                              : "bg-[#fff3cd] text-[#856404]"
                          }`}>
                            {selectedReport.sampleStatus === "accepted" ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t-2 border-[#333333]">
                <div className="flex justify-between">
                  <div className="text-sm">
                    <p><span className="font-semibold">Generated:</span> {new Date().toLocaleString()}</p>
                    <p><span className="font-semibold">Printed:</span> Laboratory Information System</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 h-0.5 bg-[#333333] w-32 mx-auto"></div>
                    <p className="text-sm">Authorized Signature</p>
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