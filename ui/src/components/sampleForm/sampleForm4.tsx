"use client"
import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useCreateSampleStore } from '@/store/useCreateSampleStore'

interface Sample4Props {
  nextStep:()=> void
}
const SampleForm4:React.FC<Sample4Props> =({nextStep}) => {
  const { sampleId } = useCreateSampleStore();
  const [text, setText] = useState("www.google.com");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const qrUrl = `https://easylab.com/samples/${sampleId}`;
  useEffect(() => {
    if (sampleId) {
      setLoading(true);
      setProgress(0);
      let interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            // setLoading(false);
            return 100
          }
          return oldProgress + 10
        })
      }, 300)
      return () => clearInterval(interval);
    }
  },[sampleId])

  const qrColor = `rgb(${255 - (progress * 2.55)}, ${255 - (progress * 2.55)}, ${255 - (progress * 2.55)})`;
  return (
    <div className="flex flex-col items-center gap-5">


      {loading && (
        <div className="bg-gray-300 w-[400px] rounded-full h-1.5 mb-4">
          <div
            className="bg-[#01368B] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {sampleId && (
        <QRCodeCanvas
          value={qrUrl}
          size={200}
          fgColor={qrColor} // Change color when loading completes
        />
      )}
      <div className='flex flex-col gap-2 items-center'>
        <p>Lab No: 387245789607-</p>
        <p>Please Wait... Generating Profile code</p>

      </div>
           <div className='w-[400px] flex items-center justify-center'>
                <button type='button' className='bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-2 rounded-md' onClick={nextStep}>
                  <p>Done</p>
                  {/* <ArrowRight size={24} /> */}
                </button>
              </div>
    </div>
  )
}

export default SampleForm4
