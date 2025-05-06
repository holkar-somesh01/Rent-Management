// import React, { useState, useMemo, useEffect } from 'react';
// import TableData from '../../components/TableData';
// import { useGetPaymentQuery } from '../../redux/apis/landlordApi';
// import { useSoftDeletePaymentMutation } from '../../redux/apis/paymentApi';
// import { toast } from 'sonner';


// const LandlordPayment = () => {
//     const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
//     const [sorting, setSorting] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState("");

//     const { data: payments, isLoading, isError, refetch } = useGetPaymentQuery();
//     const [deletePayment, {
//         isSuccess: deleteSuccess,
//         isError: deleteError,
//         error: deleteErrorMessage,
//         isLoading: deleteLoading
//     }] = useSoftDeletePaymentMutation();

//     // Handle Delete
//     const handleDelete = async (id) => {
//         try {
//             await deletePayment(id).unwrap();
//         } catch (err) {
//             console.error('Delete failed:', err);
//         }
//     };

//     // Show toast on delete success or error
//     useEffect(() => {
//         if (deleteSuccess) {
//             toast.success("Payment deleted successfully!");
//             refetch(); // Refresh payment list
//         }
//         if (deleteError) {
//             toast.error("Failed to delete payment.");
//         }
//     }, [deleteSuccess, deleteError]);

//     const enrichedPayments = useMemo(() => {
//         if (!payments || !Array.isArray(payments)) return [];

//         return payments.map((payment) => {
//             const tenantName = payment?.tenantId?.name || 'Unknown';
//             const propertyName = payment?.propertyId?.name || 'Unknown';

//             return {
//                 _id: payment._id,
//                 tenantName,
//                 propertyName,
//                 amount: payment.amount,
//                 amountPaid: payment.amountPaid,
//                 paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
//                 paymentStatus: payment.paymentStatus,
//                 paymentMethod: payment.paymentMethod,
//                 transactionId: payment.transactionId || "N/A",
//             };
//         });
//     }, [payments]);

//     const columns = [
//         { accessorKey: "tenantName", header: "Tenant Name" },
//         { accessorKey: "propertyName", header: "Property Name" },
//         { accessorKey: "amount", header: "Rent Amount (₹)" },
//         { accessorKey: "amountPaid", header: "Paid Amount (₹)" },
//         { accessorKey: "paymentDate", header: "Payment Date" },
//         { accessorKey: "paymentStatus", header: "Status" },
//         { accessorKey: "paymentMethod", header: "Method" },
//         { accessorKey: "transactionId", header: "Transaction ID" },
//         {
//             header: "Actions",
//             cell: (row) => (
//                 <div className="flex gap-2">
//                     {/* You can add edit route if needed */}
//                     <button
//                         onClick={() => navigate(`/landlord/update-property/${row.row.original._id}`)}
//                         className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
//                     >
//                         Edit
//                     </button>
//                     <button
//                         onClick={() => handleDelete(row.row.original._id)}
//                         className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
//                     >
//                         {deleteLoading ? "Deleting..." : "Delete"}
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="flex-1 pt-28 pb-10 px-4 sm:px-8 transition-all bg-gray-50 duration-300 overflow-y-hidden min-h-screen">
//             <div className="sm:flex-auto flex justify-center items-center">
//                 <h2 className="text-lg font-bold text-gray-900">Payment Records</h2>
//             </div>

//             {isLoading ? (
//                 <div className="text-center mt-10">Loading...</div>
//             ) : isError ? (
//                 <div className="text-center mt-10 text-red-600">Error loading payment data.</div>
//             ) : (
//                 <div className="mt-8 flow-root">
//                     <div className="overflow-x-scroll sm:-mx-6 lg:-mx-8">
//                         <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                             <TableData
//                                 data={enrichedPayments}
//                                 columns={columns}
//                                 enableSorting={true}
//                                 enableGlobalFilter={true}
//                                 initialPagination={pagination}
//                                 totalRows={enrichedPayments.length}
//                                 onPaginationChange={setPagination}
//                                 onSortingChange={setSorting}
//                                 onGlobalFilterChange={setGlobalFilter}
//                                 totalPages={Math.ceil(enrichedPayments.length / pagination.pageSize)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LandlordPayment;










import React, { useState, useMemo, useEffect } from 'react';
import TableData from '../../components/TableData';
import { useGetPaymentQuery } from '../../redux/apis/landlordApi';
import { useSoftDeletePaymentMutation } from '../../redux/apis/paymentApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LandlordPayment = () => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const { data: payments, isLoading, isError, refetch } = useGetPaymentQuery();
    const [deletePayment, {
        isSuccess: deleteSuccess,
        isError: deleteError,
        error: deleteErrorMessage,
        isLoading: deleteLoading
    }] = useSoftDeletePaymentMutation();

    const handleDelete = async (id) => {
        try {
            await deletePayment(id).unwrap();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    useEffect(() => {
        if (deleteSuccess) {
            toast.success("Payment deleted successfully!");
            refetch();
        }
        if (deleteError) {
            toast.error("Failed to delete payment.");
        }
    }, [deleteSuccess, deleteError]);

    const enrichedPayments = useMemo(() => {
        if (!payments || !Array.isArray(payments)) return [];

        return payments.map((payment) => ({
            _id: payment._id,
            tenantId: payment?.tenantId?._id || 'Unknown',
            tenantName: payment?.tenantId?.name || 'Unknown',
            propertyName: payment?.propertyId?.name || 'Unknown',
            amount: payment.amount,
            amountPaid: payment.amountPaid,
            paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
            paymentStatus: payment.paymentStatus,
            paymentMethod: payment.paymentMethod,
            transactionId: payment.transactionId || "N/A",
        }));
    }, [payments]);

    const columns = [
        { accessorKey: "tenantName", header: "Tenant Name" },
        { accessorKey: "propertyName", header: "Property Name" },
        { accessorKey: "amount", header: "Rent Amount (₹)" },
        { accessorKey: "amountPaid", header: "Paid Amount (₹)" },
        { accessorKey: "paymentDate", header: "Payment Date" },
        { accessorKey: "paymentStatus", header: "Status" },
        { accessorKey: "paymentMethod", header: "Method" },
        { accessorKey: "transactionId", header: "Transaction ID" },
        {
            header: "Actions",
            cell: (row) => {
                console.log(row.row.original)
                return (
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => navigate(`/landlord/update-payment/${row.row.original.tenantId}`)}
                            className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.row.original._id)}
                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                )
            }
        },
    ];

    return (
        <div className="flex-1 pt-28 pb-10 px-4 sm:px-8 transition-all bg-gray-50 duration-300 min-h-screen">
            <div className="sm:flex-auto flex justify-center items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 text-center">Payment Records</h2>
            </div>

            {isLoading ? (
                <div className="text-center mt-10">Loading...</div>
            ) : isError ? (
                <div className="text-center mt-10 text-red-600">Error loading payment data.</div>
            ) : (
                <div className="mt-4 w-full overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-auto  rounded-lg shadow-sm">
                            <TableData
                                data={enrichedPayments}
                                columns={columns}
                                enableSorting={true}
                                enableGlobalFilter={true}
                                initialPagination={pagination}
                                totalRows={enrichedPayments.length}
                                onPaginationChange={setPagination}
                                onSortingChange={setSorting}
                                onGlobalFilterChange={setGlobalFilter}
                                totalPages={Math.ceil(enrichedPayments.length / pagination.pageSize)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandlordPayment;
