import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useUpdateProfileMutation } from "../../redux/apis/landlordApi";

// Zod Validation Schema
const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    documents: z.any().optional(),
});

const EditLandlordProfile = () => {
    const { user } = useSelector(state => state.auth);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);

    // Form Hook
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            _id: user?._id || "",
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            mobile: user?.mobile || "",
        },
        resolver: zodResolver(schema),
    });

    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            const validImages = fileList.filter(file => file.type.includes("image/"));
            setImagePreviews(validImages.map(file => URL.createObjectURL(file)));
            setValue("documents", e.target.files);
        }
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Form Submit Handler
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("mobile", data.mobile);
            if (data.documents && data.documents.length > 0) {
                Array.from(data.documents).forEach(file => {
                    formData.append("documents", file);
                });
            }
            await updateProfile({ id: user._id, formData }).unwrap();
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-16 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Edit Landlord Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
                <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="relative">
                    <label className="block text-gray-700 font-medium">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 pr-10"
                        placeholder="•••••••"
                    />
                    <button
                        type="button"
                        className="absolute top-9 right-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Mobile</label>
                    <input
                        type="text"
                        {...register("mobile")}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Documents</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative">
                                <img src={src} alt="Preview" className="w-full h-32 object-cover rounded-md" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                                >✕</button>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                    disabled={isLoading}
                >
                    {isLoading ? <ClipLoader size={20} color="white" /> : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default EditLandlordProfile;