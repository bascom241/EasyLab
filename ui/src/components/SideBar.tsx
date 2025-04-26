"use client";
import React, { useEffect } from "react";
import { 
    LayoutDashboard, UserPlus, FlaskConical, BarChart, Settings, 
    Bell, HelpCircle, MessageSquare, LogOut, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useNotification from "@/store/useAuthNotification";

interface SideBarProps {
    isOpen: boolean;
    isMobile: boolean;
    onClose: () => void;
}

const SideBar = ({ isOpen, isMobile, onClose }: SideBarProps) => {
    const pathName = usePathname();
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const { logout } = useAuthStore();
    const router = useRouter();
    const { notifications } = useNotification();
    
    // Count unread notifications
    const unreadCount = notifications?.filter(notif => !notif.read).length || 0;

    const handleLogout = () => {
        logout(router);
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Register Sample", icon: UserPlus, path: "/sample" },
        { name: "Experiments", icon: FlaskConical, path: "/management" },
        { name: "Reports", icon: BarChart, path: "/reports" },
        { name: "Messages", icon: MessageSquare, path: "/messages" },
    ];

    const moreItems = [
        { 
            name: "Notifications", 
            icon: Bell, 
            path: "/notifications",
            badge: unreadCount > 0
        },
        { name: "Profile-Setting", icon: Settings, path: "/settings" },
        { name: "Help", icon: HelpCircle, path: "/help" },
    ];

    const handleLinkClick = () => {
        if (isMobile) {
            onClose();
        }
    };

    return (
        <aside className={`
            ${isMobile ? 
                `fixed top-20 left-0 z-40 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`
                : 'fixed top-20 left-0 z-40 h-screen w-64'
            }
            bg-white shadow-lg
        `}>
            <div className="h-full p-4 flex flex-col overflow-y-auto">
                <nav className="flex-1">
                    <ul className="flex flex-col gap-3">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link 
                                    href={item.path} 
                                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all 
                                        ${pathName === item.path ? "bg-[#01368B] text-white" : "text-gray-600 hover:bg-gray-200"}
                                    `}
                                    onClick={handleLinkClick}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}

                        {/* More Dropdown */}
                        <li>
                            <button 
                                className="flex items-center justify-between w-full p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-all"
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                            >
                                <span className="flex items-center gap-2">
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
                                    More
                                </span>
                            </button>

                            {isMoreOpen && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {moreItems.map((item, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={item.path} 
                                                className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all 
                                                    ${pathName === item.path ? "bg-[#01368B] text-white" : "text-gray-600 hover:bg-gray-200"}
                                                `}
                                                onClick={handleLinkClick}
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.name}</span>
                                                {item.badge && (
                                                    <span className="relative">
                                                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>

                    <div className="mt-6">
                        <button 
                            className="flex items-center gap-2 p-2 rounded-lg w-full text-sm text-red-600 hover:bg-red-100 transition-all"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;