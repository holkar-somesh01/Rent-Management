// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export const plans = [
//     {
//         id: "basic",
//         name: "Basic Plan",
//         price: 0,
//         description: "Manage up to 5 tenants for free.",
//         features: ["Up to 5 tenants", "Basic Support"],
//     },
//     {
//         id: "pro",
//         name: "Pro Plan",
//         price: 499,
//         description: "Manage up to 50 tenants.",
//         features: ["Up to 50 tenants", "Priority Support", "Reports"],
//     },
//     {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         price: 999,
//         description: "Unlimited tenant management.",
//         features: ["Unlimited tenants", "24/7 Support", "Custom Reports"],
//     },
// ];

// const Plans = () => {
//     const navigate = useNavigate();

//     const handlePlanSelect = (plan) => {
//         navigate('/premium-payment', { state: { planId: plan.id } });
//     };


//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className='flex justify-between items-center'>
//                 <button
//                     onClick={() => navigate("/landlord")}
//                     className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
//                 >Back</button>
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Select a Plan That Fits You</h1>
//                 <div></div>
//             </div>
//             <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {plans.map((plan) => (
//                     <div
//                         key={plan.id}
//                         className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
//                     >
//                         <div>
//                             <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{plan.name}</h2>
//                             <p className="text-gray-600 mb-4">{plan.description}</p>
//                             <ul className="text-sm text-gray-500 space-y-2 mb-6">
//                                 {plan.features.map((feature, i) => (
//                                     <li key={i} className="flex items-start gap-2">
//                                         <span className="text-green-600 font-bold">✔</span>
//                                         {feature}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div className="text-center">
//                             <p className="text-xl font-bold text-gray-800 mb-4">₹{plan.price}</p>
//                             <button
//                                 onClick={() => handlePlanSelect(plan)}
//                                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
//                             >
//                                 Choose {plan.name}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Plans;

















import React from 'react';
import { useNavigate } from 'react-router-dom';

export const plans = [
    {
        id: "monthly",
        name: "Monthly Premium",
        price: 499,
        description: "Access premium features for 1 month",
        duration: "Monthly",
    },
    {
        id: "yearly",
        name: "Yearly Premium",
        price: 4999,
        description: "Access premium features for 1 year",
        duration: "Yearly",
    }
];

const Plans = () => {
    const navigate = useNavigate();

    const handlePlanSelect = (plan) => {
        navigate('/premium-payment', { state: { plan } });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className='flex justify-between items-center'>
                <button
                    onClick={() => navigate("/landlord")}
                    className="px-6 cursor-pointer py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >Back</button>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Select a Plan That Fits You</h1>
                <div></div>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{plan.name}</h2>
                            <p className="text-gray-600 mb-4">{plan.description}</p>
                            <ul className="text-sm text-gray-500 space-y-2 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✔</span>
                                    {plan.duration} Plan
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-gray-800 mb-4">₹{plan.price}</p>
                            <button
                                onClick={() => handlePlanSelect(plan)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                            >
                                Choose {plan.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
