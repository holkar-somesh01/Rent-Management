import React, { useEffect, useState } from 'react'
import LandlordSidebar from './LandlordSidebar';
import LandlordNavbar from './landlordNavbar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

const LandlordLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const handleMediaQueryChange = (e) => {
            setIsSidebarOpen(e.matches);
        };

        handleMediaQueryChange(mediaQuery);
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);


    return <>

        <div className="flex h-screen bg-gray-100">
            <aside className={`fixed top-20 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}>
                <LandlordSidebar />
            </aside>
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
                <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex items-center justify-between z-50">
                    <button className="lg:hidden text-gray-700" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Menu size={24} />
                    </button>
                    <div className="flex-1">
                        <LandlordNavbar />
                    </div>
                </nav>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>

    </>
}

export default LandlordLayout