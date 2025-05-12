// // // import React, { useState } from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import { toast } from 'sonner';
// // // import {
// // //     useCreatePremiumOrderMutation,
// // //     useVerifyPremiumPaymentMutation
// // // } from '../../redux/apis/premiumApi';

// // // const PremiumPlans = () => {
// // //     const navigate = useNavigate();
// // //     // const [selectedPlan, setSelectedPlan] = useState(null);
// // //     const location = useLocation();
// // //     const selectedPlan = location.state?.plan;
// // //     const [createOrder] = useCreatePremiumOrderMutation();
// // //     const [verifyPayment] = useVerifyPremiumPaymentMutation();

// // //     const loadRazorpayScript = () =>
// // //         new Promise((resolve) => {
// // //             const script = document.createElement('script');
// // //             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // //             script.onload = () => resolve(true);
// // //             script.onerror = () => resolve(false);
// // //             document.body.appendChild(script);
// // //         });

// // //     const handlePayment = async () => {
// // //         if (!selectedPlan) return toast.error("Please select a plan.");

// // //         const isLoaded = await loadRazorpayScript();
// // //         if (!isLoaded) return toast.error('Razorpay SDK failed to load.');

// // //         try {
// // //             const res = await createOrder({ planType: selectedPlan }).unwrap();

// // //             const options = {
// // //                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// // //                 amount: res.amount,
// // //                 currency: res.currency,
// // //                 name: "RentManage Premium",
// // //                 description: `${selectedPlan} Plan`,
// // //                 order_id: res.orderId,
// // //                 handler: async (response) => {
// // //                     const verifyRes = await verifyPayment({
// // //                         razorpay_order_id: response.razorpay_order_id,
// // //                         razorpay_payment_id: response.razorpay_payment_id,
// // //                         razorpay_signature: response.razorpay_signature,
// // //                         planType: selectedPlan,
// // //                         paymentMethod: 'Razorpay',
// // //                     }).unwrap();

// // //                     if (verifyRes.success) {
// // //                         toast.success("Payment Successful! Premium Activated.");
// // //                         navigate('/landlord');
// // //                     } else {
// // //                         toast.error("Payment verification failed");
// // //                     }
// // //                 },
// // //                 theme: {
// // //                     color: "#10b981",
// // //                 },
// // //             };

// // //             const rzp = new window.Razorpay(options);
// // //             rzp.open();
// // //         } catch (err) {
// // //             console.error(err);
// // //             toast.error(err?.data?.message || "Payment initiation failed");
// // //         }
// // //     };

// // //     return (
// // //         <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
// // //             <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
// // //                 <h1 className="text-2xl font-bold text-center mb-4">Choose Your Plan</h1>

// // //                 <div className="space-y-4">
// // //                     {['Monthly', 'Yearly'].map((plan) => (
// // //                         <div
// // //                             key={plan}
// // //                             onClick={() => setSelectedPlan(plan)}
// // //                             className={`border rounded-md p-4 cursor-pointer ${selectedPlan === plan
// // //                                 ? 'border-green-500 bg-green-50'
// // //                                 : 'border-gray-300'
// // //                                 }`}
// // //                         >
// // //                             <h2 className="text-xl font-semibold">{plan} Plan</h2>
// // //                             <p className="text-gray-600">
// // //                                 {plan === 'Monthly' ? '₹499 / month' : '₹4999 / year'}
// // //                             </p>
// // //                         </div>
// // //                     ))}
// // //                 </div>

// // //                 <button
// // //                     onClick={handlePayment}
// // //                     disabled={!selectedPlan}
// // //                     className="w-full mt-6 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
// // //                 >
// // //                     Proceed to Pay
// // //                 </button>

// // //                 <button
// // //                     onClick={() => navigate('/landlord')}
// // //                     className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium transition"
// // //                 >
// // //                     Cancel
// // //                 </button>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default PremiumPlans;
























// // // import React from 'react';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import { toast } from 'sonner';
// // // import {
// // //     useCreatePremiumOrderMutation,
// // //     useVerifyPremiumPaymentMutation
// // // } from '../../redux/apis/premiumApi';

// // // const PremiumPlans = () => {
// // //     const navigate = useNavigate();
// // //     const location = useLocation();
// // //     const selectedPlan = location.state?.plan;

// // //     const [createOrder] = useCreatePremiumOrderMutation();
// // //     const [verifyPayment] = useVerifyPremiumPaymentMutation();

// // //     const loadRazorpayScript = () =>
// // //         new Promise((resolve) => {
// // //             const script = document.createElement('script');
// // //             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // //             script.onload = () => resolve(true);
// // //             script.onerror = () => resolve(false);
// // //             document.body.appendChild(script);
// // //         });

// // //     const handlePayment = async () => {
// // //         if (!selectedPlan) return toast.error("Plan details not found.");

// // //         const isLoaded = await loadRazorpayScript();
// // //         if (!isLoaded) return toast.error('Razorpay SDK failed to load.');

// // //         try {
// // //             const res = await createOrder({ planType: selectedPlan.id }).unwrap();

// // //             const options = {
// // //                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// // //                 amount: res.amount,
// // //                 currency: res.currency,
// // //                 name: "RentManage Premium",
// // //                 description: selectedPlan.name,
// // //                 order_id: res.orderId,
// // //                 handler: async (response) => {
// // //                     const verifyRes = await verifyPayment({
// // //                         razorpay_order_id: response.razorpay_order_id,
// // //                         razorpay_payment_id: response.razorpay_payment_id,
// // //                         razorpay_signature: response.razorpay_signature,
// // //                         planType: selectedPlan.id,
// // //                         paymentMethod: 'Razorpay',
// // //                     }).unwrap();

// // //                     if (verifyRes.success) {
// // //                         toast.success("Payment Successful! Premium Activated.");
// // //                         navigate('/landlord');
// // //                     } else {
// // //                         toast.error("Payment verification failed");
// // //                     }
// // //                 },
// // //                 theme: {
// // //                     color: "#10b981",
// // //                 },
// // //             };

// // //             const rzp = new window.Razorpay(options);
// // //             rzp.open();
// // //         } catch (err) {
// // //             console.error(err);
// // //             toast.error(err?.data?.message || "Payment initiation failed");
// // //         }
// // //     };

// // //     if (!selectedPlan) {
// // //         return (
// // //             <div className="min-h-screen flex items-center justify-center">
// // //                 <div className="text-center">
// // //                     <h2 className="text-2xl font-bold mb-4">No plan selected</h2>
// // //                     <button
// // //                         onClick={() => navigate('/plans')}
// // //                         className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // //                     >
// // //                         Go to Plans
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
// // //             <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
// // //                 <h1 className="text-2xl font-bold text-center mb-4">Confirm Your Plan</h1>

// // //                 <div className="border rounded-md p-4 bg-green-50 border-green-500">
// // //                     <h2 className="text-xl font-semibold">{selectedPlan.name}</h2>
// // //                     <p className="text-gray-600">{selectedPlan.description}</p>
// // //                     <ul className="mt-2 text-sm text-gray-500 space-y-1">
// // //                         {selectedPlan.features.map((feature, index) => (
// // //                             <li key={index} className="flex items-center gap-2">
// // //                                 <span className="text-green-600">✔</span>
// // //                                 {feature}
// // //                             </li>
// // //                         ))}
// // //                     </ul>
// // //                     <p className="mt-4 text-lg font-bold text-gray-800">
// // //                         {selectedPlan.price === 0 ? 'Free' : `₹${selectedPlan.price}`}
// // //                     </p>
// // //                 </div>

// // //                 <button
// // //                     onClick={handlePayment}
// // //                     className="w-full mt-6 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700"
// // //                 >
// // //                     Proceed to Pay
// // //                 </button>

// // //                 <button
// // //                     onClick={() => navigate('/plans')}
// // //                     className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium transition"
// // //                 >
// // //                     Cancel
// // //                 </button>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default PremiumPlans;
















































// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { toast } from 'sonner';
// // import {
// //     useCreatePremiumOrderMutation,
// //     useVerifyPremiumPaymentMutation
// // } from '../../redux/apis/premiumApi';
// // import { plans } from './Plans';

// // const PremiumPlans = () => {
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     const selectedPlanId = location.state?.planId;

// //     const selectedPlan = plans.find(p => p.id === selectedPlanId);

// //     const [duration, setDuration] = useState('Monthly'); // Monthly or Yearly

// //     const [createOrder] = useCreatePremiumOrderMutation();
// //     const [verifyPayment] = useVerifyPremiumPaymentMutation();

// //     const loadRazorpayScript = () =>
// //         new Promise((resolve) => {
// //             const script = document.createElement('script');
// //             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //             script.onload = () => resolve(true);
// //             script.onerror = () => resolve(false);
// //             document.body.appendChild(script);
// //         });

// //     const getAmount = () => {
// //         const basePrice = selectedPlan?.price || 0;
// //         if (duration === 'Yearly') return basePrice * 10; // Example: Yearly is 10x monthly
// //         return basePrice;
// //     };

// //     const handlePayment = async () => {
// //         if (!selectedPlan) return toast.error("Plan not selected");

// //         const isLoaded = await loadRazorpayScript();
// //         if (!isLoaded) return toast.error('Razorpay SDK failed to load.');

// //         try {
// //             const res = await createOrder({
// //                 planType: selectedPlan.id,
// //                 duration,
// //                 amount: getAmount()
// //             }).unwrap();

// //             const options = {
// //                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// //                 amount: res.amount,
// //                 currency: res.currency,
// //                 name: "RentManage Premium",
// //                 description: `${selectedPlan.name} - ${duration}`,
// //                 order_id: res.orderId,
// //                 handler: async (response) => {
// //                     const verifyRes = await verifyPayment({
// //                         razorpay_order_id: response.razorpay_order_id,
// //                         razorpay_payment_id: response.razorpay_payment_id,
// //                         razorpay_signature: response.razorpay_signature,
// //                         planType: selectedPlan.id,
// //                         duration,
// //                         paymentMethod: 'Razorpay',
// //                     }).unwrap();

// //                     if (verifyRes.success) {
// //                         toast.success("Payment Successful! Premium Activated.");
// //                         navigate('/landlord');
// //                     } else {
// //                         toast.error("Payment verification failed");
// //                     }
// //                 },
// //                 theme: { color: "#10b981" },
// //             };

// //             const rzp = new window.Razorpay(options);
// //             rzp.open();
// //         } catch (err) {
// //             console.error(err);
// //             toast.error(err?.data?.message || "Payment initiation failed");
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
// //             <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
// //                 <h1 className="text-2xl font-bold text-center mb-4">{selectedPlan?.name} Plan</h1>

// //                 <div className="space-y-4">
// //                     {['Monthly', 'Yearly'].map((option) => (
// //                         <div
// //                             key={option}
// //                             onClick={() => setDuration(option)}
// //                             className={`border rounded-md p-4 cursor-pointer ${duration === option
// //                                 ? 'border-green-500 bg-green-50'
// //                                 : 'border-gray-300'
// //                                 }`}
// //                         >
// //                             <h2 className="text-xl font-semibold">{option}</h2>
// //                             <p className="text-gray-600">
// //                                 ₹{option === 'Monthly' ? selectedPlan?.price : selectedPlan?.price * 10}
// //                             </p>
// //                         </div>
// //                     ))}
// //                 </div>

// //                 <button
// //                     onClick={handlePayment}
// //                     disabled={!selectedPlan}
// //                     className="w-full mt-6 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
// //                 >
// //                     Pay ₹{getAmount()}
// //                 </button>

// //                 <button
// //                     onClick={() => navigate('/landlord')}
// //                     className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium transition"
// //                 >
// //                     Cancel
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PremiumPlans;
















import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
    useCreatePremiumOrderMutation,
    useVerifyPremiumPaymentMutation
} from '../../redux/apis/premiumApi';

const PremiumPlans = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPlan, setSelectedPlan] = useState(location.state?.plan || null); // Manage selected plan with useState
    const [createOrder] = useCreatePremiumOrderMutation();
    const [verifyPayment] = useVerifyPremiumPaymentMutation();

    // Load Razorpay script dynamically
    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    // Handle Payment process
    const handlePayment = async () => {
        if (!selectedPlan) return toast.error("Please select a plan.");

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) return toast.error('Razorpay SDK failed to load.');

        try {
            // Send the selected plan and its price dynamically from the frontend
            const res = await createOrder({
                planType: selectedPlan.duration,
                price: selectedPlan.price * 100, // Convert to paisa (multiply by 100)
            }).unwrap();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: res.amount,
                currency: res.currency,
                name: "RentManage Premium",
                description: `${selectedPlan.name}`,
                order_id: res.orderId,
                handler: async (response) => {
                    const verifyRes = await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        planType: selectedPlan.duration,
                        price: selectedPlan.price, // Send price dynamically
                        paymentMethod: 'Razorpay',
                    }).unwrap();

                    if (verifyRes.success) {
                        toast.success("Payment Successful! Premium Activated.");
                        navigate('/landlord');
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
                            onClick={() => setSelectedPlan({
                                duration: plan,
                                name: `${plan} Plan`,
                                price: plan === 'Monthly' ? 499 : 4999, // Dynamic price based on plan
                            })}
                            className={`border rounded-md p-4 cursor-pointer ${selectedPlan?.duration === plan
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










