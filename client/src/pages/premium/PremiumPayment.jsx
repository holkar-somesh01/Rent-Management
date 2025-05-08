// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import {
//     useCreatePremiumOrderMutation,
//     useVerifyPremiumPaymentMutation
// } from '../../redux/apis/premiumApi';

// const PremiumPayment = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const plan = state?.plan;

//     const [createOrder] = useCreatePremiumOrderMutation();
//     const [verifyPayment] = useVerifyPremiumPaymentMutation();

//     if (!plan) return (
//         <p className="text-center mt-20 text-red-500 font-semibold">
//             No plan selected.
//         </p>
//     );

//     const loadRazorpayScript = () =>
//         new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });

//     const handlePayment = async () => {
//         const isLoaded = await loadRazorpayScript();
//         if (!isLoaded) {
//             toast.error('Razorpay SDK failed to load.');
//             return;
//         }

//         try {
//             const res = await createOrder({ amount: plan.price * 100 }).unwrap();

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: res.amount,
//                 currency: res.currency,
//                 name: "RentManage Premium",
//                 description: `${plan.name} (${plan.type})`,
//                 order_id: res.orderId,
//                 handler: async (response) => {
//                     const verifyRes = await verifyPayment({
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                     }).unwrap();

//                     if (verifyRes.success) {
//                         toast.success("Payment Successful! Premium Activated.");
//                         navigate('/dashboard');
//                     } else {
//                         toast.error("Payment verification failed");
//                     }
//                 },
//                 prefill: {
//                     name: res.user.name,
//                     email: res.user.email,
//                 },
//                 theme: {
//                     color: "#10b981",
//                 },
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (err) {
//             console.error(err);
//             toast.error(err?.data?.message || "Payment initiation failed");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
//             <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-6">
//                 <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//                     Confirm Your {plan.type === 'yearly' ? 'Yearly' : 'Monthly'} Plan
//                 </h1>
//                 <div className="mb-4">
//                     <h2 className="text-xl font-semibold text-blue-600">{plan.name}</h2>
//                     <p className="text-gray-600 mt-1 mb-2">{plan.description}</p>
//                     <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
//                         {plan.features.map((feature, i) => (
//                             <li key={i}>{feature}</li>
//                         ))}
//                     </ul>
//                     <p className="text-lg font-bold text-gray-900">
//                         Price: ₹{plan.price} / {plan.type === 'yearly' ? 'year' : 'month'}
//                     </p>
//                 </div>

//                 <button
//                     onClick={handlePayment}
//                     className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
//                 >
//                     Proceed to Pay
//                 </button>

//                 <button
//                     onClick={() => navigate('/plans')}
//                     className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md font-medium transition"
//                 >
//                     Go Back
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PremiumPayment;







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
    useCreatePremiumOrderMutation,
    useVerifyPremiumPaymentMutation
} from '../../redux/apis/premiumApi';

const PremiumPlans = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(null);

    const [createOrder] = useCreatePremiumOrderMutation();
    const [verifyPayment] = useVerifyPremiumPaymentMutation();

    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handlePayment = async () => {
        if (!selectedPlan) return toast.error("Please select a plan.");

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) return toast.error('Razorpay SDK failed to load.');

        try {
            const res = await createOrder({ planType: selectedPlan }).unwrap();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: res.amount,
                currency: res.currency,
                name: "RentManage Premium",
                description: `${selectedPlan} Plan`,
                order_id: res.orderId,
                handler: async (response) => {
                    const verifyRes = await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        planType: selectedPlan,
                        paymentMethod: 'Razorpay',
                    }).unwrap();

                    if (verifyRes.success) {
                        toast.success("Payment Successful! Premium Activated.");
                        navigate('/dashboard');
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                theme: {
                    color: "#10b981",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Payment initiation failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4">Choose Your Plan</h1>

                <div className="space-y-4">
                    {['Monthly', 'Yearly'].map((plan) => (
                        <div
                            key={plan}
                            onClick={() => setSelectedPlan(plan)}
                            className={`border rounded-md p-4 cursor-pointer ${selectedPlan === plan
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-300'
                                }`}
                        >
                            <h2 className="text-xl font-semibold">{plan} Plan</h2>
                            <p className="text-gray-600">
                                {plan === 'Monthly' ? '₹499 / month' : '₹4999 / year'}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handlePayment}
                    disabled={!selectedPlan}
                    className="w-full mt-6 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
                >
                    Proceed to Pay
                </button>

                <button
                    onClick={() => navigate('/landlord')}
                    className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PremiumPlans;
