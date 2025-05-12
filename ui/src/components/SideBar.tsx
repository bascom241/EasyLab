"use client";
import React, { useEffect } from "react";
import { 
  LayoutDashboard, UserPlus, FlaskConical, BarChart, Settings, 
  Bell, HelpCircle, MessageSquare, LogOut, ChevronDown, AlertCircle 
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
  
  const unreadCount = notifications?.filter(notif => !notif.read).length || 0;

  const handleLogout = () => {
    logout(router);
  };

  // Icon colors for each menu item
  const iconColors = {
    Dashboard: "text-blue-500",
    "Register Sample": "text-green-500",
    Experiments: "text-purple-500",
    Reports: "text-orange-500",
    "Create-Issue": "text-red-500",
    Notifications: "text-yellow-500",
    "Profile-Setting": "text-pink-500",
    Help: "text-cyan-500",
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Register Sample", icon: UserPlus, path: "/sample" },
    { name: "Experiments", icon: FlaskConical, path: "/management" },
    { name: "Reports", icon: BarChart, path: "/reports" },
    { name: "Create-Issue", icon: AlertCircle, path: "/issue" },
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
        `fixed top-20 left-0 z-40 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`
        : 'fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] w-64'
      }
      bg-white border-r border-gray-100 shadow-sm
    `}>
      <div className="h-full px-4 py-6 flex flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.path} 
                  className={`
                    flex items-center gap-3 p-3 rounded-lg text-sm transition-all 
                    ${pathName === item.path ? 
                      "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500" : 
                      "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                  onClick={handleLinkClick}
                >
                  <item.icon className={`w-5 h-5 ${iconColors[item.name as keyof typeof iconColors]}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            {/* More Dropdown */}
            <li>
              <button 
                className={`
                  flex items-center justify-between w-full p-3 rounded-lg text-sm 
                  ${isMoreOpen ? "text-gray-900 bg-gray-50" : "text-gray-600 hover:bg-gray-50"}
                  transition-all
                `}
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                <span className="flex items-center gap-3">
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
                  More Options
                </span>
              </button>

              {isMoreOpen && (
                <ul className="ml-2 pl-4 mt-1 space-y-1 border-l border-gray-200">
                  {moreItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        href={item.path} 
                        className={`
                          flex items-center gap-3 p-3 rounded-lg text-sm transition-all 
                          ${pathName === item.path ? 
                            "bg-blue-50 text-blue-600 font-medium" : 
                            "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                        onClick={handleLinkClick}
                      >
                        <item.icon className={`w-5 h-5 ${iconColors[item.name as keyof typeof iconColors]}`} />
                        <span>{item.name}</span>
                        {item.badge && unreadCount > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button 
              className="flex items-center gap-3 p-3 rounded-lg w-full text-sm text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-all group"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* User help section */}
        <div className="mt-auto pt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Need help?</p>
                <p className="text-xs text-blue-600 mt-1">Contact our support team for assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;