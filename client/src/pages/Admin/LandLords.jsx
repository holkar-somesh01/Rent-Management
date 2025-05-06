// import React, { useState, useEffect } from "react";
// import TableData from "../../components/TableData";
// import { useNavigate } from "react-router-dom";
// import { useGetAllLandlordsQuery, useDeleteLandlordMutation, useChangeStatusMutation } from "../../redux/apis/adminApi";
// import { toast } from "sonner";

// const LandLords = () => {
//     const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
//     const [sorting, setSorting] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState("");
//     const [DeleteLandlord, { isSuccess: DeleteIsSuccess, isLoading: DeleteIsLoading, isError: DeleteIsError, error: DeleteError }] = useDeleteLandlordMutation();
//     const { data, isSuccess, isLoading, isError, error } = useGetAllLandlordsQuery();
//     const navigate = useNavigate();
//     const [chanageStatus, {
//         isSuccess: ChangeStatusIsSuccess,
//         isLoading: ChangeStatusIsLoading,
//         isError: ChangeStatusIsError,
//         error: ChangeStatusError }] = useChangeStatusMutation()
//     const [landlords, setLandlords] = useState([]);

//     useEffect(() => {
//         if (data && data.data) {
//             const formattedLandlords = data.data.map((landlord) => ({
//                 _id: landlord._id,
//                 name: landlord.name,
//                 email: landlord.email,
//                 mobile: landlord.mobile,
//                 status: landlord.status,
//             }));
//             setLandlords(formattedLandlords);
//         }
//     }, [data]);

//     useEffect(() => {
//         if (DeleteIsSuccess) {
//             toast.success("Landlord deleted successfully");
//         } else if (DeleteIsError) {
//             toast.error(DeleteError?.data?.message || "Failed to delete landlord");
//         }
//     }, [DeleteIsSuccess, DeleteIsError, DeleteError]);


//     const handleDelete = (landlordId) => {
//         if (window.confirm("Are you sure you want to delete this landlord?")) {
//             DeleteLandlord(landlordId)
//                 .unwrap()
//                 .then(() => {
//                     setLandlords(landlords.filter((landlord) => landlord._id !== landlordId));
//                 })
//                 .catch((error) => {
//                     console.error("Failed to delete landlord: ", error);
//                 });
//         }
//     };

//     const columns = [
//         { accessorKey: "name", header: "Landlord Name" },
//         { accessorKey: "email", header: "Email" },
//         { accessorKey: "mobile", header: "Phone" },
//         { accessorKey: "status", header: "Status" },
//         {
//             header: "Actions",
//             cell: (row) => (
//                 <div className="flex gap-2">
//                     {/* get the select Box here for "active", "inactive"  this keys and call the chnagestatus mutation here and send the id and status */}
//                     <button
//                         onClick={() => handleDelete(row.row.original._id)}
//                         className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
//                     >
//                         {DeleteIsLoading ? "Loading..." : "Delete"}
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="spinner-border border-blue-600 animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex-1 pt-28 pb-10 px-4 sm:px-8 transition-all bg-gray-50 duration-300 overflow-y-hidden min-h-screen">
//             <div className="flex items-center justify-between p-4 rounded-lg">
//                 <h2 className="text-lg font-bold text-gray-900">Landlords</h2>
//                 <button
//                     onClick={() => navigate('/superAdmin/add-landlord')}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                     Add Landlord
//                 </button>
//             </div>
//             <div className="mt-8 flow-root">
//                 <div className="overflow-x-scroll sm:-mx-6 lg:-mx-8">
//                     <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                         <TableData
//                             data={landlords}
//                             columns={columns}
//                             enableSorting={true}
//                             enableGlobalFilter={true}
//                             initialPagination={pagination}
//                             totalRows={landlords.length}
//                             onPaginationChange={setPagination}
//                             onSortingChange={setSorting}
//                             onGlobalFilterChange={setGlobalFilter}
//                             totalPages={Math.ceil(landlords.length / pagination.pageSize)}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandLords;


import React, { useState, useEffect } from "react";
import TableData from "../../components/TableData";
import { useNavigate } from "react-router-dom";
import { useGetAllLandlordsQuery, useDeleteLandlordMutation, useChangeStatusMutation, useLazyGetAllLandlordsQuery } from "../../redux/apis/adminApi";
import { toast } from "sonner";

const LandLords = () => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [DeleteLandlord, {
        isSuccess: DeleteIsSuccess,
        isLoading: DeleteIsLoading,
        isError: DeleteIsError,
        error: DeleteError
    }] = useDeleteLandlordMutation();
    const [getLandlords, { data, isLoading }] = useLazyGetAllLandlordsQuery();
    const navigate = useNavigate();
    const [changeStatus, {
        isSuccess: ChangeStatusIsSuccess,
        isError: ChangeStatusIsError,
        error: ChangeStatusError
    }] = useChangeStatusMutation();
    const [landlords, setLandlords] = useState([]);

    useEffect(() => {
        getLandlords()
        if (data && data.data) {
            const formattedLandlords = data.data.map((landlord) => ({
                _id: landlord._id,
                name: landlord.name,
                email: landlord.email,
                mobile: landlord.mobile,
                status: landlord.status,
            }));
            setLandlords(formattedLandlords);
        }
    }, [data]);

    useEffect(() => {
        if (DeleteIsSuccess) {
            toast.success("Landlord deleted successfully");
        } else if (DeleteIsError) {
            toast.error(DeleteError?.data?.message || "Failed to delete landlord");
        }

        if (ChangeStatusIsSuccess) {
            toast.success("Status updated successfully");
        } else if (ChangeStatusIsError) {
            toast.error(ChangeStatusError?.data?.message || "Failed to update status");
        }
    }, [DeleteIsSuccess, DeleteIsError, DeleteError, ChangeStatusIsSuccess, ChangeStatusIsError, ChangeStatusError]);

    const handleDelete = (landlordId) => {
        if (window.confirm("Are you sure you want to delete this landlord?")) {
            DeleteLandlord(landlordId)
                .unwrap()
                .then(() => {
                    setLandlords(landlords.filter((landlord) => landlord._id !== landlordId));
                })
                .catch((error) => {
                    console.error("Failed to delete landlord: ", error);
                });
        }
    };

    const handleChangeStatus = (landlordId, status) => {
        changeStatus({ id: landlordId, status })
            .unwrap()
            .then(() => {
                setLandlords((prevLandlords) =>
                    prevLandlords.map((landlord) =>
                        landlord._id === landlordId ? { ...landlord, status } : landlord
                    )
                );
            })
            .catch((error) => {
                console.error("Failed to change status: ", error);
            });
    };

    const columns = [
        { accessorKey: "name", header: "Landlord Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "mobile", header: "Phone" },
        {
            header: "Status",
            cell: (row) => (
                <button
                    className={
                        row.row.original.status === "active"
                            ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                            : "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                    }
                    onClick={() => handleChangeStatus(row.row.original._id, row.row.original.status === "inactive" ? "active" : "inactive")}
                >
                    {row.row.original.status === "active" ? "Active" : "InActive"}
                </button>
            ),
        },
        {
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
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
                <h2 className="text-lg font-bold text-gray-900">Landlords</h2>
                <button
                    onClick={() => getLandlords()}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    ReFetch
                </button>
            </div>
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <TableData
                            data={landlords}
                            columns={columns}
                            enableSorting={true}
                            enableGlobalFilter={true}
                            initialPagination={pagination}
                            totalRows={landlords.length}
                            onPaginationChange={setPagination}
                            onSortingChange={setSorting}
                            onGlobalFilterChange={setGlobalFilter}
                            totalPages={Math.ceil(landlords.length / pagination.pageSize)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandLords