import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional, you can use any icons

const UserNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-white text-xl font-bold cursor-pointer">
                    Rent Management
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-4 items-center">
                    <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-slate-200 font-semibold px-4 py-2 rounded text-black hover:text-white hover:bg-slate-600 cursor-pointer"
                    >
                        Login
                    </button>
                </ul>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden text-white">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden mt-4 space-y-2 px-4">
                    <li><Link to="/" className="block text-white hover:text-gray-200">Home</Link></li>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/login");
                        }}
                        className="w-full text-left bg-slate-200 font-semibold px-4 py-2 rounded text-black hover:text-white hover:bg-slate-600 cursor-pointer"
                    >
                        Login
                    </button>
                </ul>
            )}
        </nav>
    );
};

export default UserNavbar;
