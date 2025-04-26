"use client"
import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useCreateSampleStore } from '@/store/useCreateSampleStore'
import { CheckCircle } from 'lucide-react'

interface Sample4Props {
  nextStep: () => void
}

const SampleForm4: React.FC<Sample4Props> = ({ nextStep }) => {
  const { sampleId } = useCreateSampleStore();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const qrUrl = `https://easylab.com/samples/${sampleId}`;

  useEffect(() => {
    if (sampleId) {
      setLoading(true);
      setProgress(0);
      setIsComplete(false);
      
      let interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            setLoading(false);
            setIsComplete(true);
            return 100;
          }
          return oldProgress + 10;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [sampleId]);

  const qrColor = isComplete ? '#01368B' : `rgb(${255 - (progress * 2.55)}, ${255 - (progress * 2.55)}, ${255 - (progress * 2.55)})`;

  return (
    <div className="flex flex-col items-center gap-6 p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto">
      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-[#01368B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* QR Code Container */}
      <div className={`p-4 border-2 rounded-lg ${isComplete ? 'border-[#01368B]' : 'border-gray-300'} transition-all duration-300`}>
        {sampleId && (
          <QRCodeCanvas
            value={qrUrl}
            size={window.innerWidth < 400 ? 180 : 200}
            fgColor={qrColor}
            level="H"
            includeMargin={true}
          />
        )}
      </div>

      {/* Status Messages */}
      <div className='flex flex-col gap-3 items-center text-center'>
        {isComplete ? (
          <>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={24} />
              <p className="font-medium">Profile code generated successfully!</p>
            </div>
            <p className="text-sm text-gray-600">Lab No: {sampleId}</p>
          </>
        ) : (
          <>
            <p className="font-medium">Lab No: {sampleId}</p>
            <p className="text-sm text-gray-600">Please wait... Generating profile code</p>
          </>
        )}
      </div>

      {/* Done Button */}
      <button 
        type='button' 
        className={`w-full max-w-xs flex items-center justify-center gap-2 text-white p-3 rounded-md transition-colors ${
          isComplete ? 'bg-[#01368B] hover:bg-[#012a6e]' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={nextStep}
        disabled={!isComplete}
      >
        <span>Done</span>
      </button>
    </div>
  )
}

export default SampleForm4