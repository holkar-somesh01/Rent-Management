import React, { useState, useMemo, useEffect } from 'react';
import TableData from '../../components/TableData';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useChangeStatusMutation, useGetAllTenantsQuery } from '../../redux/apis/adminApi';
import { useNavigate } from 'react-router-dom';

const LandlordTenants = () => {
    const { user } = useSelector(state => state.auth)
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const { data, isLoading, isError } = useGetAllTenantsQuery({ userId: user._id });
    const [changeStatus, { isSuccess: ChangeStatusIsSuccess, isError: ChangeStatusIsError, error: ChangeStatusError }] = useChangeStatusMutation();
    const navigate = useNavigate()
    const tableData = useMemo(() => data?.data || [], [data]);

    const handleChangeStatus = (tenantId, status) => {
        changeStatus({ id: tenantId, status }).unwrap()
    }
    const columns = [
        { header: 'ID', accessorKey: '_id' },
        { header: 'Name', accessorKey: 'name' },
        { header: 'Email', accessorKey: 'email' },
        { header: 'Phone', accessorKey: 'mobile' },
        { header: 'Role', accessorKey: 'role' },
        {
            header: "Status",
            cell: (row) => (
                <div className="flex gap-4">
                    <button
                        className={
                            row.row.original.status === "active"
                                ? "inline-flex items-center cursor-pointer rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                : "inline-flex items-center cursor-pointer rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                        }
                        onClick={() => handleChangeStatus(row.row.original._id, row.row.original.status === "inactive" ? "active" : "inactive")}
                    >
                        {row.row.original.status === "active" ? "Active" : "Inactive"}
                    </button>
                </div>
            ),
        },
        {
            header: 'Action',
            cell: (row) => (
                <div className="flex gap-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                        onClick={() => navigate(`/landlord/tenant-details/${row.row.original._id}`)}
                    >
                        View Details
                    </button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        if (ChangeStatusIsSuccess) {
            toast.success("Status updated successfully")
        } else if (ChangeStatusIsError) {
            toast.error(ChangeStatusError?.data?.message || "Failed to update status")
        }
    }, [ChangeStatusIsSuccess, ChangeStatusIsError, ChangeStatusError])
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching tenants data.</div>

    return (
        <div className="flex-1 pt-28 pb-10 px-4 sm:px-8 transition-all bg-gray-50 duration-300 overflow-y-hidden min-h-screen">
            <div className="sm:flex-auto flex justify-center items-center">
                <h2 className="text-lg font-bold text-gray-900">All Tenants</h2>
            </div>
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <TableData
                            data={tableData}
                            columns={columns}
                            enableSorting={true}
                            enableGlobalFilter={true}
                            initialPagination={pagination}
                            totalRows={tableData.length}
                            onPaginationChange={setPagination}
                            onSortingChange={setSorting}
                            onGlobalFilterChange={setGlobalFilter}
                            totalPages={Math.ceil(tableData.length / pagination.pageSize)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LandlordTenants;
