import { useGetLandlordPropertyQuery } from "../../redux/apis/landlordApi";
import { useGetMonthlyPaymentQuery, useGetPendingPaymentQuery } from "../../redux/apis/paymentApi";

const LandlordDashboard = () => {
    const { data, isSuccess, isError, isLoading, error } = useGetLandlordPropertyQuery()
    const { data: collectedRent } = useGetMonthlyPaymentQuery()
    const { data: pendingPayment } = useGetPendingPaymentQuery()
    return (
        <div className="mt-10 pt-10">
            <div className="flex-1 min-h-screen bg-gray-50">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Welcome, Landlord!</h2>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {/* Total Properties */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800">Total Properties</h3>
                            <p className="text-3xl font-bold text-blue-600">{data && data?.length}</p>
                        </div>

                        {/* Monthly Rent */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xs font-semibold text-gray-800">Monthly Rent Collected</h3>
                            <p className="text-3xl font-bold text-blue-400">{collectedRent && collectedRent.month}</p>
                            <p className="text-3xl font-bold text-green-600">₹{collectedRent && collectedRent.totalCollectedRent}</p>
                        </div>

                        {/* Pending Payments */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800">Pending Payments</h3>
                            <p className="text-3xl font-bold text-red-600">₹{pendingPayment && pendingPayment?.pendingPayments.map(item => item)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandlordDashboard;
