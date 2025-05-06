import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ allowedRoles }) => {
    const { user } = useSelector((state) => state.auth)
    if (!user) {
        return <Navigate to="/login" replace />
    }
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }
    return <Outlet />;
};

export default Protected;
