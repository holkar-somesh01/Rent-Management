import React, { useState, useEffect } from "react";
import { useGetProfileQuery } from "../../redux/apis/landlordApi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const LandlordProfile = () => {
    const { user } = useSelector(state => state.auth);
    const { data, isSuccess, isError, isLoading, error } = useGetProfileQuery(user._id);
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            toast.error("Failed to fetch profile data.");
        }
        if (isSuccess) {
            toast.success("Profile data fetched successfully.");
        }
    }, [isSuccess, isError]);

    if (isLoading || !data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <ClipLoader color="#4A90E2" size={50} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden mt-20 p-4 border border-gray-200">
            {data && <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Landlord Profile</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>ID:</strong> {data._id}</p>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Mobile:</strong> {data.mobile}</p>
                    <p><strong>Role:</strong> {data.role}</p>
                    <p><strong>Status:</strong> {data.status}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-blue-600">Admin Account Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Admin ID:</strong> {data.userId._id}</p>
                        <p><strong>Admin Name:</strong> {data.userId.name}</p>
                        <p><strong>Admin Email:</strong> {data.userId.email}</p>
                        <p><strong>Admin Mobile:</strong> {data.userId.mobile}</p>
                        <p><strong>Admin Role:</strong> {data.userId.role}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-green-600">Documents</h3>
                    {data.documents.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2">
                            {data.documents.map((doc, index) => (
                                <li key={index} className="bg-gray-100 p-2 rounded-md">{doc}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No documents available.</p>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-purple-600">Payments</h3>
                    {data.payments.length > 0 ? (
                        <ul className="space-y-2">
                            {data.payments.map((payment, index) => (
                                <li key={index} className="bg-gray-100 p-2 rounded-md">
                                    {JSON.stringify(payment, null, 2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No payments recorded.</p>
                    )}
                </div>

                <button onClick={() => navigate("/landlord/edit-profile")} className="mt-6 cursor-pointer w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                    Edit Profile
                </button>
            </div>}
        </div>
    );
};

export default LandlordProfile;
