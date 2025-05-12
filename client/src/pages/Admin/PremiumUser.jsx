import React, { useEffect, useState } from 'react';
import TableData from '../../components/TableData';
import { useGetPremiumUsersQuery } from '../../redux/apis/premiumApi';

const PremiumUser = () => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState("")
    const { data } = useGetPremiumUsersQuery()

    const [properties, setProperties] = useState([])

    useEffect(() => {
        if (data && data.length > 0) {
            const formattedUsers = data.map((user) => ({
                _id: user._id,
                name: user.userId.name,
                email: user.userId.email,
                planType: user.planType,
                price: user.price,
                paymentStatus: user.paymentStatus,
                startDate: new Date(user.startDate).toLocaleDateString(),
                endDate: new Date(user.endDate).toLocaleDateString(),
                paymentMethod: user.paymentMethod,
            }));
            setProperties(formattedUsers);
        }
    }, [data])

    const columns = [
        { accessorKey: "name", header: "User Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "planType", header: "Plan Type" },
        { accessorKey: "price", header: "Price (₹)" },
        { accessorKey: "paymentStatus", header: "Payment Status" },
        { accessorKey: "startDate", header: "Start Date" },
        { accessorKey: "endDate", header: "End Date" },
        { accessorKey: "paymentMethod", header: "Payment Method" },
    ]

    return (
        <div>
            <div className="max-w-screen-xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg">
                <div className="pt-20 flex justify-center items-center ml-10">
                    <h2 className="text-3xl font-bold text-gray-800">Premium Users and Payments</h2>
                </div>
                <div className='flex justify-center items-center mt-6'>
                    <TableData
                        data={properties}
                        columns={columns}
                        enableSorting={true}
                        enableGlobalFilter={true}
                        initialPagination={pagination}
                        totalRows={properties.length}
                        onPaginationChange={setPagination}
                        onSortingChange={setSorting}
                        onGlobalFilterChange={setGlobalFilter}
                        totalPages={Math.ceil(properties.length / pagination.pageSize)}
                    />
                </div>
            </div>
        </div>
    );
}

export default PremiumUser