import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-700">You do not have permission to view this page.</p>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Go Home
            </Link>
        </div>
    );
};

export default Unauthorized;
