import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema using Zod
const tenantSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    mobile: z.string().optional(),
    documents: z.array(z.string()).optional(),
    property: z.string().optional(),
    payments: z.array(z.string()).optional(),
});

const EditTenants = ({ tenant, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            name: tenant.name || '',
            email: tenant.email || '',
            password: '',
            mobile: tenant.mobile || '',
            documents: tenant.documents || [],
            property: tenant.property || '',
            payments: tenant.payments || [],
        },
    });

    const onSubmit = (data) => {
        console.log("Updated Tenant Data:", data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Tenant</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                        <input
                            type="text"
                            placeholder="Mobile"
                            {...register('mobile')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                    </div>

                    {/* Documents */}
                    <div>
                        <label className="block font-medium">Documents:</label>
                        <input
                            type="text"
                            placeholder="Enter documents (comma separated)"
                            {...register('documents')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.documents && <p className="text-red-500 text-sm">{errors.documents.message}</p>}
                    </div>

                    {/* Property */}
                    <div>
                        <input
                            type="text"
                            placeholder="Property ID"
                            {...register('property')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.property && <p className="text-red-500 text-sm">{errors.property.message}</p>}
                    </div>

                    {/* Payments */}
                    <div>
                        <input
                            type="text"
                            placeholder="Payment IDs (comma separated)"
                            {...register('payments')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.payments && <p className="text-red-500 text-sm">{errors.payments.message}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 rounded text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 rounded text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTenants;
