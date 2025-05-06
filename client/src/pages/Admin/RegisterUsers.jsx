import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterUserMutation } from "../../redux/apis/authApi";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    mobile: z.string().optional(),
    role: z.enum(["Tenant", "Landlord"], { required_error: "Role is required" }),
});

const RegisterUsers = () => {
    const [UserRegister, { data: UserData, isSuccess, isLoading, isError, error }] =
        useRegisterUserMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await UserRegister(data);
        } catch (error) {
            console.error("Registration Failed:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "User Registration Failed");
        }
        if (isSuccess) {
            toast.success(`${UserData?.role} Registered Successfully.`);
        }
    }, [isError, isSuccess]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-200 pt-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register User's</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                {...register("name")}
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                placeholder="example@mail.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none pr-10"
                                placeholder="•••••••"
                            />
                            <button
                                type="button"
                                className="absolute top-4 inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile (Optional)</label>
                            <input
                                {...register("mobile")}
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                placeholder="+91 98765 43210" />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Role</label>
                        <select
                            {...register("role")}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                        >
                            <option value="">-- Choose --</option>
                            <option value="Tenant">Tenant</option>
                            <option value="Landlord">Landlord</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center">
                            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 text-lg font-medium"
                            disabled={isLoading}
                        >
                            Register
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterUsers;
