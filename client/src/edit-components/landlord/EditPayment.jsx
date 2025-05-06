import React, { useEffect, useState } from 'react';
import { useUpdatePaymentMutation } from '../../redux/apis/paymentApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { useGetBookedPropertyQuery } from '../../redux/apis/landlordApi';

const UpdatePaymentSchema = z.object({
    rentedProperty: z.string().min(1, "Rented property is required"),
    amount: z.number().positive("Amount must be positive"),
    paymentDate: z.string().min(1, "Payment date is required"),
    paymentStatus: z.enum(["pending", "completed", "failed"], {
        errorMap: () => ({ message: "Please select a valid payment status" })
    }),
    paymentMethod: z.enum(["cash", "bank transfer", "online"], {
        errorMap: () => ({ message: "Please select a valid payment method" })
    }),
    transactionId: z.string().optional(),
});

const UpdateTenantPayment = () => {
    const { id: tenantId, paymentId } = useParams();
    const navigate = useNavigate();

    // API Hooks
    const [updatePayment, {
        isSuccess: updateSuccess,
        isError: updateError,
        isLoading: updateLoading,
        error: updateErrorDetails
    }] = useUpdatePaymentMutation();

    const {
        data: bookedProperties,
        isLoading: propertiesLoading,
        error: propertiesError
    } = useGetBookedPropertyQuery(tenantId);

    // Form setup
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(UpdatePaymentSchema),
        defaultValues: {
            rentedProperty: "",
            amount: 0,
            paymentDate: "",
            paymentStatus: "pending",
            paymentMethod: "cash",
            transactionId: "",
        }
    });

    // Load existing payment data
    useEffect(() => {
        if (paymentId && bookedProperties) {
            const paymentData = bookedProperties
                ?.flatMap(p => p.payments || [])
                .find(p => p._id === paymentId);

            if (paymentData) {
                setValue("rentedProperty", paymentData.propertyId || "");
                setValue("amount", paymentData.amountPaid || 0);
                setValue("paymentDate", paymentData.paymentDate
                    ? new Date(paymentData.paymentDate).toISOString().split('T')[0]
                    : "");
                setValue("paymentStatus", paymentData.paymentStatus || "pending");
                setValue("paymentMethod", paymentData.paymentMethod || "cash");
                setValue("transactionId", paymentData.transactionId || "");
            }
        }
    }, [paymentId, bookedProperties, setValue]);

    // Handle form submission
    const onSubmit = async (formData) => {
        try {
            const payload = {
                paymentId,
                tenantId,
                ...formData
            };
            console.log(id, payload)
            await updatePayment({ id: paymentId, ...payload }).unwrap();
        } catch (err) {
            console.error('Update payment error:', err);
        }
    };

    // Handle success/error notifications
    useEffect(() => {
        if (updateSuccess) {
            toast.success("Payment Updated Successfully!");
            navigate("/landlord/payments");
        }
        if (updateError) {
            toast.error(updateErrorDetails?.data?.message || "Failed to update payment");
        }
    }, [updateSuccess, updateError, updateErrorDetails, navigate]);

    if (propertiesLoading) {
        return <div className="text-center mt-24">Loading...</div>;
    }

    if (propertiesError || !bookedProperties) {
        return <div className="text-center mt-24 text-red-500">Error loading payment data</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="pt-24 px-5">
                <button
                    onClick={() => navigate("/landlord/payments")}
                    className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                >
                    Back to Payments
                </button>
            </div>

            <div className="max-w-2xl mx-auto p-6 my-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Payment</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Rented Property */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rented Property
                            </label>
                            <select
                                {...register("rentedProperty")}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Property</option>
                                {bookedProperties.map(item => (
                                    <option key={item._id} value={item.property._id}>
                                        {item.property.name} - {item.property.location}
                                    </option>
                                ))}
                            </select>
                            {errors.rentedProperty && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.rentedProperty.message}
                                </p>
                            )}
                        </div>

                        {/* Payment Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Date
                            </label>
                            <input
                                type="date"
                                {...register("paymentDate")}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.paymentDate && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.paymentDate.message}
                                </p>
                            )}
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Amount
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("amount", { valueAsNumber: true })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.amount.message}
                                </p>
                            )}
                        </div>

                        {/* Transaction ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Transaction ID
                            </label>
                            <input
                                type="text"
                                {...register("transactionId")}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.transactionId && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.transactionId.message}
                                </p>
                            )}
                        </div>

                        {/* Payment Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Status
                            </label>
                            <select
                                {...register("paymentStatus")}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                            {errors.paymentStatus && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.paymentStatus.message}
                                </p>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Method
                            </label>
                            <select
                                {...register("paymentMethod")}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="cash">Cash</option>
                                <option value="bank transfer">Bank Transfer</option>
                                <option value="online">Online</option>
                            </select>
                            {errors.paymentMethod && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.paymentMethod.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={updateLoading || isSubmitting}
                        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 
                            disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {updateLoading || isSubmitting ? "Updating..." : "Update Payment"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTenantPayment;