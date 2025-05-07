import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterLandlordMutation } from "../redux/apis/authApi";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from "../pages/User/UserNavbar";

const loginSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(2, "Enter Name"),
    email: z.string().email("Invalid email format"),
    mobile: z.string().min(10, "Enter Mobile Number"),
    role: z.string().min(2, "Role is Required"),
});

const Register = () => {
    const [role, setRole] = useState("Landlord")
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [registerUser, {
        data: userData,
        isLoading: isUserLoading,
        isSuccess: isUserSuccess,
        isError: isUserError,
        error: userError
    }] = useRegisterLandlordMutation()
    const onSubmit = async (data) => {
        try {
            await registerUser(data).unwrap();
        } catch (error) {
            console.error("Server Error:", error);
        }
    }
    // useEffect(() => {
    //     if (user) {
    //         switch (user.role) {
    //             case "SuperAdmin":
    //                 navigate("/superAdmin/dashboard");
    //                 break;
    //             case "Landlord":
    //                 navigate("/landlord");
    //                 break;
    //             case "Tenant":
    //                 navigate("/tenant");
    //                 break;
    //             case "Manager":
    //                 navigate("/manager-dashboard");
    //                 break;
    //             default:
    //                 navigate("/unauthorized");
    //         }
    //     }
    // }, [user, navigate])

    useEffect(() => {
        setValue("role", role)
        toast.dismiss();
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
    }, [isUserSuccess, isUserError]);


    return (
        <>
            <UserNavbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Create Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div></div>
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="text"
                                {...register("email")}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Mobile</label>
                            <input
                                type="number"
                                {...register("mobile")}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your mobile"
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
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
                        {isUserLoading ? (
                            <div className="flex justify-center">
                                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                disabled={isUserLoading}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                            >
                                Register
                            </button>
                        )}
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Already have an account?</p>
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register