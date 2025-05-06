import React, { useEffect, useState } from 'react';
import { useAddPaymentMutation, useUpdatePaymentMutation } from '../../redux/apis/paymentApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPropertiesQuery } from '../../redux/apis/adminApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { useGetBookedPropertyQuery } from '../../redux/apis/landlordApi';

const AddTenantPayment = () => {
    const paymentSchema = z.object({
        rentedProperty: z.string().min(1, "Rented property is required"),
        amount: z.number().positive("Amount must be positive"),
        paymentDate: z.string().min(1, "Payment date is required"),
        paymentStatus: z.enum(["pending", "completed", "failed"]),
        paymentMethod: z.enum(["cash", "bank transfer", "online"]),
        transactionId: z.string().optional(),
    });
    const { id, paymentId } = useParams(); // id: tenantId, paymentId: for update mode
    const navigate = useNavigate();
    const [property, setProperty] = useState();
    const [isUpdate, setIsUpdate] = useState(!!paymentId); // Check if in update mode

    // API Hooks
    const [addPayment, {
        isSuccess: addSuccess,
        isError: addError,
        isLoading: addLoading
    }] = useAddPaymentMutation();

    const [updatePayment, {
        isSuccess: updateSuccess,
        isError: updateError,
        isLoading: updateLoading
    }] = useUpdatePaymentMutation();

    const { data: properties, isSuccess: propertySuccess } = useGetPropertiesQuery();
    const { data: bookedProperties } = useGetBookedPropertyQuery(id);

    // Form setup
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            rentedProperty: "",
            amount: 0,
            paymentDate: "",
            paymentStatus: "pending",
            paymentMethod: "cash",
            transactionId: "",
            tenantId: id,
        }
    });

    // Fetch payment data for update mode (assuming you have payment data in bookedProperties or need separate API)
    useEffect(() => {
        if (isUpdate && paymentId && bookedProperties) {
            // Assuming payment data is available in bookedProperties or you fetch it separately
            const paymentData = bookedProperties?.find(p => p.payment?._id === paymentId)?.payment;
            if (paymentData) {
                setValue("rentedProperty", paymentData.rentedProperty || "");
                setValue("amount", paymentData.amount || 0);
                setValue("paymentDate", paymentData.paymentDate ? paymentData.paymentDate.split('T')[0] : "");
                setValue("paymentStatus", paymentData.paymentStatus || "pending");
                setValue("paymentMethod", paymentData.paymentMethod || "cash");
                setValue("transactionId", paymentData.transactionId || "");
                setValue("tenantId", id);
            }
        } else {
            setValue("tenantId", id);
        }
    }, [isUpdate, paymentId, bookedProperties, setValue, id]);

    // Set property options
    useEffect(() => {
        if (propertySuccess) {
            const rentedProperties = properties?.data?.map(property => ({
                _id: property._id,
                name: property.name
            }));
            setProperty(rentedProperties);
        }
    }, [propertySuccess, properties]);

    // Handle form submission
    const onSubmit = async (formData) => {
        try {
            const payload = { ...formData, tenantId: id };
            if (isUpdate) {
                await updatePayment({ id: paymentId, ...payload }).unwrap();
            } else {
                await addPayment(payload).unwrap();
                reset();
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Handle success/error toasts
    useEffect(() => {
        if (addError || updateError) {
            toast.error(`Failed to ${isUpdate ? 'update' : 'save'} payment`);
        }
        if (addSuccess || updateSuccess) {
            toast.success(`Payment ${isUpdate ? 'Updated' : 'Added'} Successfully!`);
            if (isUpdate) navigate("/landlord/payments");
        }
    }, [addError, addSuccess, updateError, updateSuccess, navigate, isUpdate]);

    return (
        <>
            <div className="mt-24 flex items-center gap-4 px-5">
                <button
                    onClick={() => navigate("/landlord/payments")}
                    className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >Back</button>
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">{isUpdate ? 'Update Payment' : 'Add New Payment'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <pre>{JSON.stringify(bookedProperties, null, 2)}</pre> */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rented Property</label>
                            <select {...register("rentedProperty")} className="w-full p-2 border rounded mb-2">
                                <option value="" disabled>--choose--</option>
                                {bookedProperties && bookedProperties.map(item => (
                                    <option key={item._id} value={item.property._id}>
                                        {item?.property?.name}-{item?.property?.location}
                                    </option>
                                ))}
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
                                <option value="" disabled>--choose--</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                            {errors.paymentStatus && <p className="text-red-500 text-sm">{errors.paymentStatus.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select {...register("paymentMethod")} className="w-full p-2 border rounded mb-2">
                                <option value="" disabled>--choose--</option>
                                <option value="cash">Cash</option>
                                <option value="bank transfer">Bank Transfer</option>
                                <option value="online">Online</option>
                            </select>
                            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded"
                        disabled={addLoading || updateLoading}
                    >
                        {(addLoading || updateLoading) ? "Saving..." : (isUpdate ? "Update Payment" : "Add Payment")}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTenantPayment;