import { Link } from "react-router-dom";
import { Home, Building, CreditCard, User, Menu, Users, Crown } from "lucide-react";
import { useState } from "react";

const LandlordSidebar = () => {

    return (
        <div className={`h-screen bg-gray-900 text-white w-64 transition-all duration-300 p-4 flex flex-col`}>
            <nav className="space-y-4">
                <Link to="/landlord" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <Home size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/landlord/properties" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <Building size={20} />
                    <span>Properties</span>
                </Link>
                <Link to="/landlord/payments" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <CreditCard size={20} />
                    <span>Payments</span>
                </Link>
                <Link to="/landlord/profile" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <User size={20} />
                    <span>Profile</span>
                </Link>
                <Link to="/landlord/tenants" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <Users size={20} />
                    <span>Tenants</span>
                </Link>
                <Link to="/landlord/add-tenants" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <Users size={20} />
                    <span>Add Tenant's</span>
                </Link>
                <Link to="/plans" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <Crown size={20} />
                    <span>Upgrade Plan</span>
                </Link>
                <Link to="/landlord/purchase" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                    <Crown size={20} />
                    <span>Purchase Plan's</span>
                </Link>
            </nav>
        </div>
    );
};

export default LandlordSidebar;
