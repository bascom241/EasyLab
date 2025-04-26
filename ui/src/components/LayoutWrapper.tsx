"use client";
import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Importing Menu and X icons from lucide-react

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const hideSidebar = pathName === "/login" || pathName === "/register" || pathName === "/verifyEmail";
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Close sidebar when switching to desktop view
            if (!mobile && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sidebarOpen]);

    return (
        <div className={`${!hideSidebar ? "md:pl-64" : ""} relative min-h-screen`}>
            {/* Mobile Hamburger Button */}
            {!hideSidebar && isMobile && (
                <button 
                    className="fixed z-50 top-4 left-4 p-2 rounded-lg bg-white shadow-md"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </button>
            )}

            {/* Sidebar */}
            {!hideSidebar && (
                <SideBar 
                    isOpen={sidebarOpen} 
                    isMobile={isMobile} 
                    onClose={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className={`p-6 transition-all duration-300 ${sidebarOpen && isMobile ? 'blur-sm' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default LayoutWrapper;