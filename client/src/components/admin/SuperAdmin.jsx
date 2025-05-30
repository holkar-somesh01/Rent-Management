import React from "react";
import { useGetDashboardDataQuery } from "../../redux/apis/landlordApi";

const StatCard = ({ title, value }) => (
    <div className="bg-white shadow rounded-2xl p-4 w-full sm:w-48 text-center">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
);

const PaymentRow = ({ payment, index }) => (
    <tr key={index} className="border-b text-sm">
        <td className="px-2 py-1">{payment?.tenantId?.name}</td>
        <td className="px-2 py-1">{payment?.tenantId?.email}</td>
        <td className="px-2 py-1">{payment?.propertyId?.name}</td>
        <td className="px-2 py-1 capitalize">{payment?.paymentStatus}</td>
        <td className="px-2 py-1">{new Date(payment?.paymentDate).toLocaleDateString()}</td>
    </tr>
);

const SuperAdmin = () => {
    const { data, isLoading } = useGetDashboardDataQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                Loading.......
            </div>
        );
    }

    const { stats, pendingPayments, recentPayments, recentProperties, recentTenants } = data || {};

    return (
        <div className="min-h-screen mt-20 p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Super Admin Dashboard</h1>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
                <StatCard title="Total Users" value={stats?.totalUsers} />
                <StatCard title="Tenants" value={stats?.totalTenants} />
                <StatCard title="Landlords" value={stats?.totalLandlords} />
                <StatCard title="Properties" value={stats?.totalProperties} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-xl p-4 shadow">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Recent Payments</h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b text-gray-600">
                                <th className="px-2 py-1">Tenant</th>
                                <th className="px-2 py-1">Email</th>
                                <th className="px-2 py-1">Property</th>
                                <th className="px-2 py-1">Status</th>
                                <th className="px-2 py-1">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPayments?.map((payment, idx) => <PaymentRow key={idx} payment={payment} index={idx} />)}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Pending Payments</h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b text-gray-600">
                                <th className="px-2 py-1">Tenant</th>
                                <th className="px-2 py-1">Email</th>
                                <th className="px-2 py-1">Property</th>
                                <th className="px-2 py-1">Status</th>
                                <th className="px-2 py-1">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPayments?.map((payment, idx) => <PaymentRow key={idx} payment={payment} index={idx} />)}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Tenants & Properties */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Recent Tenants</h2>
                    <ul className="list-disc pl-5">
                        {recentTenants?.map((tenant, idx) => (
                            <li key={idx}>
                                <span className="font-medium">{tenant.name}</span> - {tenant.email}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Recent Properties</h2>
                    <ul className="list-disc pl-5">
                        {recentProperties?.map((prop, idx) => (
                            <li key={idx}>
                                <span className="font-medium">{prop.name}</span> - {prop.location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SuperAdmin;
