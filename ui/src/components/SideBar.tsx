"use client";
import React, { useState } from "react";
import { 
    LayoutDashboard, UserPlus, FlaskConical, BarChart, Settings, 
    Bell, HelpCircle, MessageSquare, LogOut, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const SideBar = () => {
    const pathName = usePathname();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    if (pathName === "/login" || pathName === "/register" || pathName === "/verifyEmail") {
        return null;
    }

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Register Sample", icon: UserPlus, path: "/sample" },
        { name: "Experiments", icon: FlaskConical, path: "/management" },
        { name: "Reports", icon: BarChart, path: "/reports" },
        { name: "Messages", icon: MessageSquare, path: "/messages" },
    ];

    const moreItems = [
        { name: "Notifications", icon: Bell, path: "/notifications" },
        { name: "Profile-Setting", icon: Settings, path: "/settings" },
        { name: "Help", icon: HelpCircle, path: "/help" },
    ];

    const { logout } = useAuthStore();
    const router = useRouter();

    const Logout = () => {
        logout(router);
    }
    return (
        <aside className="w-56 h-[88vh]  bg-white shadow-lg fixed top-16 left-0 p-4 flex flex-col">
            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-3">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.path} className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all 
                                ${pathName === item.path ? "bg-[#01368B] text-white" : "text-gray-600 hover:bg-gray-200"}
                            `}>
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
                                        <Link href={item.path} className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all 
                                            ${pathName === item.path ? "bg-[#01368B] text-white" : "text-gray-600 hover:bg-gray-200"}
                                        `}>
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Logout Button (Now Visible) */}
            <div className="mt-auto">
                <button className="flex items-center gap-2 p-2 rounded-lg w-full text-sm text-red-600 hover:bg-red-100 transition-all" onClick={Logout}>
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
