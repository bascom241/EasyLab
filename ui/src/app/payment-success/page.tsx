"use client";

import { useEffect } from "react";
import { usePaymentStore } from "@/store/usePayment";
import {useRouter, useSearchParams } from 'next/navigation' 

import { Loader } from "lucide-react";
import { motion } from "framer-motion";

const VerifyPayment = () => {
const searchParams = useSearchParams();
const router = useRouter();
  const reference = searchParams.get("reference");
  const { verifyPayment, isVerifyingPayment, message } = usePaymentStore();

  useEffect(() => {
    if (reference) {
      verifyPayment(reference as string);
    }
  }, [reference]);

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 text-center">
      {isVerifyingPayment ? (
        <motion.div
          className="flex flex-col gap-6 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="animate-spin p-4 bg-blue-100 rounded-full shadow-md">
            <Loader className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-blue-800">
            Verifying Your Payment...
          </h1>
          <p className="text-gray-600 max-w-md">
            We’re confirming your payment with our secure servers.
            <br />
            Hang tight! This won’t take more than a few seconds.
          </p>
          <p className="text-sm text-gray-400 italic">
            Did you know? 92% of our customers complete their setup in under 3
            minutes!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-green-600">
            {(message?.includes("successfully") ?? false) ? "✅ Payment Successful!" : "⚠️ Payment Failed"}
          </h1>
          <p className="text-gray-700 max-w-md">
            {message}
          </p>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </motion.div>
      )}
    </main>
  );
};

export default VerifyPayment;
