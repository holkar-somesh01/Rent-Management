import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
            <div className="text-white text-xl font-bold cursor-pointer">Rent Management</div>
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
                <li><Link to="/" className="text-white hover:text-gray-200">Login</Link></li>
                {/* <li><Link to="/properties" className="text-white hover:text-gray-200">Properties</Link></li> */}
                {/* <li><Link to="/profile" className="text-white hover:text-gray-200">Profile</Link></li> */}
            </ul>
            <button onClick={e => navigate("/login")} className="bg-slate-200 font-semibold px-4 py-2 rounded text-black hover:text-white hover:bg-slate-600 cursor-pointer">Login</button>
        </nav>
    );
};

export default UserNavbar;
