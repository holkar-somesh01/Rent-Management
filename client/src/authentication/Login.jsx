import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginAdminMutation, useLoginUserMutation } from "../redux/apis/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from "../pages/User/UserNavbar";

const loginSchema = z.object({
    username: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const [loginAdmin, { data: adminData, isLoading: isAdminLoading, isSuccess: isAdminSuccess, isError: isAdminError, error: adminError }] = useLoginAdminMutation();
    const [loginUser, { data: userData, isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError }] = useLoginUserMutation();
    const onSubmit = async (data) => {
        try {
            const loginFn = role === "admin" ? loginAdmin : loginUser;
            await loginFn(data).unwrap();
        } catch (error) {
            console.error("Server Error:", error);
        }
    }
    useEffect(() => {
        if (user) {
            switch (user.role) {
                case "SuperAdmin":
                    navigate("/superAdmin/dashboard");
                    break;
                case "Landlord":
                    navigate("/landlord");
                    break;
                case "Tenant":
                    navigate("/tenant");
                    break;
                case "Manager":
                    navigate("/manager-dashboard");
                    break;
                default:
                    navigate("/unauthorized");
            }
        }
    }, [user, navigate])

    useEffect(() => {
        toast.dismiss();
        if (isAdminSuccess) {
            toast.success(`Welcome ${adminData?.name || "Admin"}!`, { duration: 3000 });
            navigate("/superAdmin/dashboard");
        } else if (isAdminError) {
            toast.error(adminError?.data?.message || "Admin login failed", { duration: 3000 });
        }
        if (isUserSuccess) {
            const userRole = userData?.role;
            toast.success(`Welcome ${userData?.name || "User"}!`, { duration: 3000 })
            switch (userRole) {
                case "Landlord":
                    navigate("/landlord");
                    break;
                case "Tenant":
                    navigate("/tenant");
                    break;
                case "Manager":
                    navigate("/manager-dashboard");
                    break;
                default:
                    navigate("/unauthorized");
            }
        } else if (isUserError) {
            toast.error(userError?.data?.message || "User login failed", { duration: 3000 });
        }
    }, [isAdminSuccess, isAdminError, isUserSuccess, isUserError]);


    return (
        <>
            <UserNavbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                    <div className="flex justify-center my-4">
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${role === "user" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                            onClick={() => setRole("user")}
                        >
                            User
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${role === "admin" ? "bg-green-600 text-white" : "bg-gray-300"}`}
                            onClick={() => setRole("admin")}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("username")}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {isAdminLoading || isUserLoading ? (
                            <div className="flex justify-center">
                                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                disabled={isAdminLoading || isUserLoading}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                            >
                                Login
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login