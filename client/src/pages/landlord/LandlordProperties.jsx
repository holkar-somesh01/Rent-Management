// import React, { useEffect, useState } from "react";
// import TableData from "../../components/TableData";
// import {
//     useDeletePropertiesMutation,
//     useGetPropertiesQuery,
// } from "../../redux/apis/adminApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";

// const LandlordProperties = () => {
//     const { user } = useSelector((state) => state.auth);
//     const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
//     const [sorting, setSorting] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState("");

//     const [DeleteProperty, { isSuccess: DeleteIsSuccess, isLoading: DeleteIsLoading, isError: DeleteIsError, error: DeleteError }] = useDeletePropertiesMutation();
//     const { data } = useGetPropertiesQuery({ id: user._id });

//     const navigate = useNavigate();
//     const [properties, setProperties] = useState([]);

//     useEffect(() => {
//         if (data?.data) {
//             const formattedProperties = data.data.map((property) => ({
//                 _id: property._id,
//                 name: property.name,
//                 type: property.type,
//                 location: property.location,
//                 size: property.size,
//                 rentPrice: property.rentPrice,
//                 landlordName: property.landlord.name,
//                 isRented: property.isRented,
//             }));
//             setProperties(formattedProperties);
//         }
//     }, [data]);

//     useEffect(() => {
//         if (DeleteIsSuccess) {
//             toast.success("Property deleted successfully");
//         } else if (DeleteIsError) {
//             toast.error(DeleteError?.data?.message || "Failed to delete property");
//         }
//     }, [DeleteIsSuccess, DeleteIsError, DeleteError]);

//     const handleDelete = (propertyId) => {
//         if (window.confirm("Are you sure you want to delete this property?")) {
//             DeleteProperty(propertyId)
//                 .unwrap()
//                 .then(() => {
//                     setProperties((prev) =>
//                         prev.filter((property) => property._id !== propertyId)
//                     );
//                 })
//                 .catch((error) => {
//                     console.error("Failed to delete property: ", error);
//                 });
//         }
//     };

//     const columns = [
//         { accessorKey: "name", header: "Property Name" },
//         { accessorKey: "type", header: "Type" },
//         { accessorKey: "location", header: "Location" },
//         { accessorKey: "size", header: "Size" },
//         { accessorKey: "rentPrice", header: "Rent (₹)" },
//         { accessorKey: "landlordName", header: "Landlord" },
//         {
//             accessorKey: "isRented",
//             header: "Rented?",
//             cell: (row) => (row.getValue() ? "Yes" : "No"),
//         },
//         {
//             header: "Actions",
//             cell: (row) => (
//                 <div className="space-y-2">
//                     <div>
//                         <button
//                             onClick={() => navigate(`/landlord/update-property/${row.row.original._id}`)}
//                             className="w-full px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
//                         >
//                             Edit
//                         </button>
//                     </div>
//                     <button
//                         onClick={() => handleDelete(row.row.original._id)}
//                         className="w-full px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
//                     >
//                         {DeleteIsLoading ? "Loading..." : "Delete"}
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="flex-1 pt-28 pb-10 sm:px-4 px-2 bg-gray-50 min-h-screen">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
//                 <h2 className="text-xl font-bold text-gray-900">Properties</h2>
//                 <button
//                     onClick={() => navigate("/landlord/add-property")}
//                     className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600"
//                 >
//                     Add Property
//                 </button>
//             </div>

//             <div className="mt-4 w-full overflow-x-auto">
//                 <div className="min-w-[640px] py-2 px-2 sm:px-4 lg:px-6">
//                     <TableData
//                         data={properties}
//                         columns={columns}
//                         enableSorting={true}
//                         enableGlobalFilter={true}
//                         initialPagination={pagination}
//                         totalRows={properties.length}
//                         onPaginationChange={setPagination}
//                         onSortingChange={setSorting}
//                         onGlobalFilterChange={setGlobalFilter}
//                         totalPages={Math.ceil(properties.length / pagination.pageSize)}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandlordProperties;






import React, { useEffect, useState } from "react";
import TableData from "../../components/TableData";
import {
    useDeletePropertiesMutation,
    useGetPropertiesQuery,
} from "../../redux/apis/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const LandlordProperties = () => {
    const { user } = useSelector((state) => state.auth);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const [DeleteProperty, { isSuccess: DeleteIsSuccess, isLoading: DeleteIsLoading, isError: DeleteIsError, error: DeleteError }] = useDeletePropertiesMutation();
    const { data, isSuccess, isLoading, isError, error } = useGetPropertiesQuery({ id: user._id });

    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if (data && data.data) {
            const formattedProperties = data.data.map((property) => ({
                _id: property._id,
                name: property.name,
                type: property.type,
                location: property.location,
                size: property.size,
                rentPrice: property.rentPrice,
                landlordName: property.landlord.name,
                isRented: property.isRented,
            }));
            setProperties(formattedProperties);
        }
    }, [data]);

    useEffect(() => {
        if (DeleteIsSuccess) {
            toast.success("Property deleted successfully");
        } else if (DeleteIsError) {
            toast.error(DeleteError?.data?.message || "Failed to delete property");
        }
    }, [DeleteIsSuccess, DeleteIsError, DeleteError]);

    const handleDelete = (propertyId) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            DeleteProperty(propertyId)
                .unwrap()
                .then(() => {
                    setProperties(properties.filter((property) => property._id !== propertyId));
                })
                .catch((error) => {
                    console.error("Failed to delete property: ", error);
                });
        }
    };

    const columns = [
        { accessorKey: "name", header: "Property Name" },
        { accessorKey: "type", header: "Type" },
        { accessorKey: "location", header: "Location" },
        { accessorKey: "size", header: "Size" },
        { accessorKey: "rentPrice", header: "Rent (₹)" },
        { accessorKey: "landlordName", header: "Landlord" },
        {
            accessorKey: "isRented",
            header: "Rented?",
            cell: (row) => (row.getValue() ? "Yes" : "No"),
        },
        {
            header: "Actions",
            cell: (row) => (
                <div>
                    <button
                        onClick={() => navigate(`/landlord/update-property/${row.row.original._id}`)}
                        className="px-3 py-1 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <br />
                    <button
                        onClick={() => handleDelete(row.row.original._id)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        {DeleteIsLoading ? "Loading..." : "Delete"}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex-1 pt-28 pb-10  sm:px-8 bg-gray-50 overflow-x-hidden min-h-screen">
            <div className="flex items-center justify-between p-4 rounded-lg">
                <h2 className="text-lg font-bold text-gray-900">Properties</h2>
                <button
                    onClick={() => navigate("/landlord/add-property")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Add Property
                </button>
            </div>
            <div className="mt-8 w-full">
                <div className="py-2 px-2 sm:px-4 lg:px-6">
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
};

export default LandlordProperties;
