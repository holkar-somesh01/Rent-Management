import React from 'react';

const TenantDashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen mt-20">
            <h1 className="text-2xl font-bold mb-6">Tenant Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Property Details</h2>
                    <p className="text-gray-600">View your rented property information.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Rent Payments</h2>
                    <p className="text-gray-600">Check your payment history and dues.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Maintenance Requests</h2>
                    <p className="text-gray-600">Submit and track maintenance requests.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Profile Settings</h2>
                    <p className="text-gray-600">Update your personal information.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <p className="text-gray-600">Stay updated with important alerts.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Support</h2>
                    <p className="text-gray-600">Reach out for assistance if needed.</p>
                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;
