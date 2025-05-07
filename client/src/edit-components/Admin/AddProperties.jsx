import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddPropertiesMutation, usePropertyFindByIdQuery, useUpdatePropertiesMutation } from "../../redux/apis/adminApi";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

const propertySchema = z.object({
    name: z.string().min(1, "Property name is required"),
    type: z.enum(["residential", "commercial"]),
    location: z.string().min(1, "Location is required"),
    size: z.string().min(1, "Size is required"),
    rentPrice: z.number().positive("Rent price must be positive"),
    isRented: z.boolean(),
    documents: z.any(),
    images: z.any(),
});

const AddProperties = () => {
    const [AddProperty, { isSuccess, isError, isLoading }] = useAddPropertiesMutation();
    const [UpdateProperty, { isSuccess: updateSuccess, isLoading: updateLoading, isError: updateError, error: updateIsError }] = useUpdatePropertiesMutation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isSuccess: getSuccess, isLoading: getLoading, isError: getIsError, error: getError } = usePropertyFindByIdQuery(id, { skip: !id });

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            type: "residential",
            location: "",
            size: "",
            rentPrice: 0,
            isRented: false,
        }
    });

    useEffect(() => {
        if (id && getSuccess && data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [id, getSuccess, data, setValue]);

    const onSubmit = async (formData) => {
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "documents" || key === "images") {
                    Array.from(value).forEach((file) => {
                        formDataToSend.append(key, file);
                    });
                } else {
                    formDataToSend.append(key, value);
                }
            });

            if (id) {
                await UpdateProperty({ id, data: formDataToSend }).unwrap();
            } else {
                await AddProperty(formDataToSend).unwrap();
            }
            reset()
        } catch (err) {
            toast.error(err?.data?.message || "Failed to save property");
            console.warn(err)

        }
    };

    useEffect(() => {
        if (isError || updateError) {
            toast.error(updateIsError?.data?.message || "Failed to save property")
        }
    }, [isError, updateError]);
    useEffect(() => {
        if (isSuccess || updateSuccess) {
            toast.success(`Property ${updateSuccess ? "Update" : "Add"} Success`)
        }
    }, [isSuccess, updateSuccess]);
    if (getLoading) return <p>Loading...</p>;
    if (getIsError) return <>
        <div className="mt-24 flex items-center gap-4 px-5">
            <button
                onClick={() => navigate("/landlord")}
                className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Back
            </button>
        </div>
        <div className=" mt-5 flex flex-col items-center gap-4 px-5 bg-red-100 p-4 rounded-lg shadow-md">
            <p className="text-red-500 font-semibold text-center">
                {getError?.data?.message} <br />
                Cannot Update Property. <br />
                Please try again later or contact support.
            </p>
        </div>
    </>

    return (
        <>
            <div className="mt-24 flex items-center gap-4 px-5">
                <button
                    onClick={() => navigate("/landlord/properties")}
                    className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Back
                </button>
            </div>

            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">{id ? "Update Property" : "Add New Property"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Property Name</label>
                            <input type="text" {...register("name")} className="w-full p-2 border rounded mb-2" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select {...register("type")} className="w-full p-2 border rounded mb-2">
                                <option selected disabled>--Choose Type--</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" {...register("location")} className="w-full p-2 border rounded mb-2" />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Size</label>
                            <input type="text" {...register("size")} className="w-full p-2 border rounded mb-2" />
                            {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rent Price</label>
                            <input type="number" {...register("rentPrice", { valueAsNumber: true })} className="w-full p-2 border rounded mb-2" />
                            {errors.rentPrice && <p className="text-red-500 text-sm">{errors.rentPrice.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Is Rented</label>
                            <input type="checkbox" {...register("isRented")} className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Documents (Choose Multiple)</label>
                            <input type="file" {...register("documents")} multiple className="w-full p-2 border rounded mb-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Images (Choose Multiple)</label>
                            <input type="file" {...register("images")} multiple className="w-full p-2 border rounded mb-2" />
                        </div>
                    </div>



                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        {(isLoading || updateLoading) ?
                            <div className="flex justify-center items-center">
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            : id ? "Update Property" : "Add Property"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProperties;








