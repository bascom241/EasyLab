"use client"
import React from 'react'
import SideBar from './SideBar'
import { usePathname } from 'next/navigation'
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const pathName = usePathname();
    const hideSidebar = pathName === "/login" || pathName === "/register" || pathName === "/verifyEmail" ;

    return (
        <div className={`${!hideSidebar? "p-6" :""}  flex gap-4`}>
            {!hideSidebar && <SideBar />}
            <main className={hideSidebar ? "w-full" : "ml-56 flex-1  "}>{children}</main>
        </div>
    )
}

export default LayoutWrapper
