import React, { useState, useEffect } from "react";
import TableData from "../../components/TableData";
import { useNavigate } from "react-router-dom";
import { useGetPaymentsQuery } from "../../redux/apis/adminApi";
// import { toast } from "sonner";

const Payment = () => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const { data, isLoading, isError, error } = useGetPaymentsQuery();
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (data && data.data) {
            const formattedPayments = data.data.map((payment) => ({
                _id: payment._id,
                tenantName: payment.tenantName,
                amount: payment.amount,
                paymentDate: payment.paymentDate,
                paymentStatus: payment.paymentStatus,
                paymentMethod: payment.paymentMethod,
                transactionId: payment.transactionId,
            }));
            setPayments(formattedPayments);
        }
    }, [data]);

    const columns = [
        { accessorKey: "tenantName", header: "Tenant Name" },
        { accessorKey: "amount", header: "Amount (₹)" },
        { accessorKey: "paymentDate", header: "Payment Date" },
        { accessorKey: "paymentStatus", header: "Status" },
        { accessorKey: "paymentMethod", header: "Method" },
        { accessorKey: "transactionId", header: "Transaction ID" },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border border-blue-600 animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                </div>
            </div>
        );
    }
    return (
        <div className="flex-1 pt-28 pb-10 px-4 sm:px-8 transition-all bg-gray-50 duration-300 overflow-y-hidden min-h-screen">
            <div className="flex items-center justify-between p-4 rounded-lg">
                <h2 className="text-lg font-bold text-gray-900">Payment Records</h2>
                <button
                    onClick={() => navigate('/superAdmin/add-payment')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Add Payment
                </button>
            </div>
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <TableData
                            data={payments}
                            columns={columns}
                            enableSorting={true}
                            enableGlobalFilter={true}
                            initialPagination={pagination}
                            totalRows={payments.length}
                            onPaginationChange={setPagination}
                            onSortingChange={setSorting}
                            onGlobalFilterChange={setGlobalFilter}
                            totalPages={Math.ceil(payments.length / pagination.pageSize)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;