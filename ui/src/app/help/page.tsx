"use client";

import React, { useState, useRef } from "react";
import { MessageSquare, ShieldCheck, BarChart3, FlaskConical, FileText, HeartPulse, X, Loader, ChevronRight } from "lucide-react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Help = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const form = useRef<HTMLFormElement | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      setSendingEmail(true);
      emailjs.sendForm(
        'service_8ylrkkr',
        'template_8nrkk94',
        form.current,
        'ZW99MvlPVKFRexJ7a'
      ).then((result) => {
        console.log('Message sent:', result.text);
        toast.success('Email sent successfully!');
        setSendingEmail(false);
        setIsModalOpen(false);
      }, (error) => {
        console.log('Error:', error.text);
        toast.error('Failed to send email');
        setSendingEmail(false);
      });
    } else {
      toast.error('Form reference is not available.');
      setSendingEmail(false);
    }
  };

  const helpSections = [
    {
      title: "Dashboard Overview",
      desc: "Your dashboard gives you insights into test data, patient stats, and app performance.",
      icon: <BarChart3 className="w-5 h-5" />,
      border: "border-blue-500",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Test Management",
      desc: "Track and manage lab tests from start to finish, with status updates and automation.",
      icon: <FlaskConical className="w-5 h-5" />,
      border: "border-green-500",
      text: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "HIPAA Compliance",
      desc: "We use HIPAA-compliant protocols to ensure your patient data remains private and secure.",
      icon: <ShieldCheck className="w-5 h-5" />,
      border: "border-purple-500",
      text: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Patient Records",
      desc: "Easily access, update, and organize patient information in one place.",
      icon: <HeartPulse className="w-5 h-5" />,
      border: "border-red-500",
      text: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Automated Reports",
      desc: "Generate and share reports with just a click. Reduce errors and save time.",
      icon: <FileText className="w-5 h-5" />,
      border: "border-yellow-500",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Need More Help?",
      desc: "Still stuck? Click the button below to get in touch with us directly.",
      icon: <MessageSquare className="w-5 h-5" />,
      border: "border-teal-500",
      text: "text-teal-600",
      bg: "bg-teal-50",
      action: true,
    },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Settings > Account > Password Reset. You'll receive an email with instructions."
    },
    {
      question: "Where can I find my test results?",
      answer: "All test results are available in the Dashboard under the 'Results' tab."
    },
    {
      question: "How secure is my patient data?",
      answer: "We use end-to-end encryption and HIPAA compliant protocols to ensure maximum security."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export reports and data in multiple formats from the Export section."
    }
  ];

  return (
    <main className="w-full p-4 md:p-6 lg:p-8 mt-12 md:mt-16 min-h-[calc(100vh-3rem)] flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-neutral-50 relative">
      {/* Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mb-6 md:mb-8 lg:mb-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 bg-clip-text">
          How can we help you today?
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl">
          Discover answers to common questions, learn how to use <span className="text-blue-600 font-medium">MediLorn</span> effectively, 
          or contact our support team for personalized assistance.
        </p>
      </motion.div>

      {/* Help Sections with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {helpSections.map(({ title, desc, icon, border, text, bg, action }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`${bg} p-6 rounded-xl shadow-sm border-l-4 ${border} flex flex-col h-full transition-all duration-300 hover:shadow-md`}
          >
            <div className={`flex items-center gap-3 mb-3 ${text}`}>
              <div className={`p-2 rounded-lg ${bg} bg-opacity-70`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{desc}</p>
            {action && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-auto flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Contact support <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Help Button with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-12"
      >
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl text-sm md:text-base font-semibold shadow-lg transition-all"
        >
          Get Personalized Help
        </motion.button>
      </motion.div>

      {/* Modal with blur effect */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">How can we help?</h2>
                <p className="text-sm text-gray-600">We'll get back to you within 24 hours</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "general" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  General Inquiry
                </button>
                <button
                  onClick={() => setActiveTab("technical")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "technical" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Technical Support
                </button>
              </div>

              <form ref={form} className="flex flex-col gap-4" onSubmit={sendForm}>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1 font-medium">Your Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    name="user_email"
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1 font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Subject of your message"
                    name="subject"
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1 font-medium">How can we help?</label>
                  <textarea
                    name="message"
                    placeholder="Describe your issue or question..."
                    rows={4}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sendingEmail}
                  className="mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all"
                >
                  {sendingEmail ? (
                    <>
                      <Loader className="animate-spin w-5 h-5" />
                      Sending...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Help;