import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { useAddPaymentMutation, useGetPaymentByIdQuery, useUpdatePaymentMutation } from "../../redux/apis/paymentApi";
import { useGetPropertiesQuery } from "../../redux/apis/adminApi";


const paymentSchema = z.object({
    rentedProperty: z.string().min(1, "Rented property is required"),
    amount: z.number().positive("Amount must be positive"),
    paymentDate: z.string().min(1, "Payment date is required"),
    paymentStatus: z.enum(["pending", "completed", "failed"]),
    paymentMethod: z.enum(["cash", "bank transfer", "online"]),
    transactionId: z.string().optional(),
});

const AddPayment = () => {
    const [AddPayment, { isSuccess, isError, isLoading }] = useAddPaymentMutation();
    const [UpdatePayment, { isSuccess: updateSuccess, isLoading: updateLoading, isError: updateError, error: updateIsError }] = useUpdatePaymentMutation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState()
    const { data, isSuccess: getSuccess, isLoading: getLoading, isError: getIsError, error: getError } = useGetPaymentByIdQuery(id, { skip: !id });
    const { data: properties, isSuccess: propertySuccess, isLoading: propertyLoading, isError: propertyIsError, error: propertyError } = useGetPropertiesQuery()

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            rentedProperty: "",
            amount: 0,
            paymentDate: "",
            paymentStatus: "pending",
            paymentMethod: "cash",
            transactionId: "",
        }
    });
    useEffect(() => {
        if (propertySuccess) {
            const RentedProperty = properties.data && properties?.data.map(property => ({ _id: property._id, name: property.name }))
            setProperty(RentedProperty)
        }
    }, [propertySuccess])
    useEffect(() => {
        if (id && getSuccess && data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [id, getSuccess, data, setValue]);

    const onSubmit = async (formData) => {
        try {
            if (id) {
                await UpdatePayment({ id, data: formData }).unwrap();
            } else {
                await AddPayment(formData).unwrap();
            }
            reset()
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        if (isError || updateError) {
            toast.error(updateIsError?.data?.message || "Failed to save payment");
        }
        if (isSuccess) {
            toast.success("Payment Added Success.!")
        }
    }, [isError, updateError, isSuccess]);

    if (getLoading) return <p>Loading...</p>;
    if (getIsError) return <>
        <div className="mt-24 flex items-center gap-4 px-5">
            <button
                onClick={() => navigate("/superAdmin/payments")}
                className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Back
            </button>
        </div>
        <div className=" mt-5 flex flex-col items-center gap-4 px-5 bg-red-100 p-4 rounded-lg shadow-md">
            <p className="text-red-500 font-semibold text-center">
                {getError?.data?.message} <br />
                Cannot Update Payment. <br />
                Please try again later or contact support.
            </p>
        </div>
    </>;

    return (
        <>
            <div className="mt-24 flex items-center gap-4 px-5">
                <button
                    onClick={() => navigate("/superAdmin/payment")}
                    className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Back
                </button>
            </div>

            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">{id ? "Update Payment" : "Add New Payment"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rented Property</label>
                            <select {...register("rentedProperty")} className="w-full p-2 border rounded mb-2">
                                <option selected disabled>--choose--</option>
                                {property?.map((item, index) => <option value={item._id}>{item.name}</option>)}
                            </select>
                            {errors.rentedProperty && <p className="text-red-500 text-sm">{errors.rentedProperty.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                            <input type="date" {...register("paymentDate")} className="w-full p-2 border rounded mb-2" />
                            {errors.paymentDate && <p className="text-red-500 text-sm">{errors.paymentDate.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" {...register("amount", { valueAsNumber: true })} className="w-full p-2 border rounded mb-2" />
                            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                            <input type="text" {...register("transactionId")} className="w-full p-2 border rounded mb-2" />
                            {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                            <select {...register("paymentStatus")} className="w-full p-2 border rounded mb-2">
                                <option selected disabled>--choose--</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.paymentStatus && <p className="text-red-500 text-sm">{errors.paymentStatus.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select {...register("paymentMethod")} className="w-full p-2 border rounded mb-2">
                                <option selected disabled>--choose--</option>
                                <option value="cash">Cash</option>
                                <option value="bank transfer">Bank Transfer</option>
                                <option value="online">Online</option>
                            </select>
                            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
                        </div>
                    </div >
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        {(isLoading || updateLoading) ? "Saving..." : id ? "Update Payment" : "Add Payment"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddPayment;
