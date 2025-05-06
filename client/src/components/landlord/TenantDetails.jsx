import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useTenantDetailsQuery, useUpdateTenantMutation } from '../../redux/apis/landlordApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const TenantDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isSuccess, isError, error, isLoading } = useTenantDetailsQuery(id)
    return (
        <div className="p-8 mt-24 bg-white shadow-2xl rounded-2xl border border-gray-200 max-w-md mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Tenant Details</h2>
            <div className="mb-8 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Name:</span>
                    <span className="text-gray-800">{data?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Email:</span>
                    <span className="text-gray-800">{data?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Phone:</span>
                    <span className="text-gray-800">{data?.mobile}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Documents:</span>
                    {
                        data?.documents?.length > 0 ? data?.documents?.map(item =>
                            <div className='grid grid-cols-2 gap-3'>
                                <img className='h-12 w-12 object-cover' src={item} alt='' />
                            </div>
                        ) :
                            <img className='h-12 w-12 object-cover' src="https://www.shutterstock.com/image-illustration/default-thumbnail-image-picture-icon-600nw-2377730767.jpg" alt="" />
                    }
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => navigate(`/landlord/add-payment/${id}`)}
                    className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                    Add Payment
                </button>
                <button
                    className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => setShowModal(true)}
                >
                    Edit Details
                </button>
            </div>
            {
                showModal && <div className='bg-slate-200'>
                    <UpdateTenantForm showModal={showModal} id={id} setShowModal={setShowModal} />
                </div>
            }
        </div>
    );
};

export default TenantDetails;



const UpdateTenantForm = ({ showModal, setShowModal, id }) => {
    const [UpdateTenant, { isSuccess, isError, error, isLoading }] = useUpdateTenantMutation();
    const { data, isSuccess: isSuccessGET, isError: isErrorGet, error: errorGet, isLoading: isLoadingGet } = useTenantDetailsQuery(id);

    const schema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password must be at least 6 characters').optional(),
        mobile: z.string().regex(/^\d{10}$/, 'Invalid mobile number').optional(),
        documents: z.any().optional(),
    });

    const onSubmit = (formData) => {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        if (formData.password) form.append('password', formData.password);
        if (formData.mobile) form.append('mobile', formData.mobile);
        if (formData.documents?.length) {
            for (let i = 0; i < formData.documents.length; i++) {
                form.append('documents', formData.documents[i]);
            }
        }

        UpdateTenant({ _id: id, formData: form });
    };


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (isSuccessGET && data) {
            reset({
                name: data.name || '',
                email: data.email || '',
                password: '',
                mobile: data.mobile || '',
                documents: null,
            })
        }
        if (isSuccess) {
            toast.success('Tenant updated successfully!')
            setShowModal(false)
        }
        if (isError) {
            toast.error(error?.data?.message || 'Failed to update tenant.');
        }
    }, [isSuccessGET, data, reset, isSuccess, isError, error]);

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-slate-200 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Update Tenant Details</h2>
                        {isLoading && <div className="text-center">Loading...</div>}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className="block text-gray-700 font-medium">Name</label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Email</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className="block text-gray-700 font-medium">Password (Optional)</label>
                                    <input
                                        type="password"
                                        {...register('password')}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Mobile (Optional)</label>
                                    <input
                                        type="text"
                                        {...register('mobile')}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Upload Documents (Multiple Images)</label>
                                <input
                                    type="file"
                                    {...register('documents')}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    multiple
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex gap-4 justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-2 py-1 rounded-md text-sm hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
