import React, { useState } from 'react'
import { useGetPremiumUsersQuery, useLandlordPremiumDetailsQuery } from '../../redux/apis/premiumApi'
import TableData from '../TableData'

const PurchasePlans = () => {
    const { data } = useLandlordPremiumDetailsQuery()

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const enrichedPayments = data?.map(item => ({
        _id: item._id,
        name: item.userId?.name,
        email: item.userId?.email,
        mobile: item.userId?.mobile,
        planType: item.planType,
        price: item.price,
        paymentStatus: item.paymentStatus,
        paymentMethod: item.paymentMethod,
        transactionId: item.transactionId,
        startDate: new Date(item.startDate).toLocaleDateString(),
        endDate: new Date(item.endDate).toLocaleDateString(),
    })) || [];

    const columns = [
        { accessorKey: "planType", header: "Plan Type" },
        { accessorKey: "price", header: "Price (₹)" },
        { accessorKey: "paymentStatus", header: "Status" },
        { accessorKey: "paymentMethod", header: "Method" },
        { accessorKey: "transactionId", header: "Transaction ID" },
        { accessorKey: "startDate", header: "Start Date" },
        { accessorKey: "endDate", header: "End Date" },
    ];

    return (
        <div className='p-6 mt-24 bg-white shadow-md rounded-lg mx-10'>
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
    )
}

export default PurchasePlans
