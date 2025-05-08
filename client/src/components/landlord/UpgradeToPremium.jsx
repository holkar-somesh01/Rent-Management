import React from "react";
import { toast } from "sonner";
import { useCreatePremiumOrderMutation, useVerifyPremiumPaymentMutation } from "../../redux/apis/premiumApi";
import { useNavigate } from "react-router-dom";

const UpgradeToPremium = () => {
    const [createOrder] = useCreatePremiumOrderMutation();
    const [verifyPayment] = useVerifyPremiumPaymentMutation();

    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handlePayment = async () => {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            toast.error("Razorpay SDK failed to load.");
            return;
        }

        try {
            const res = await createOrder({}).unwrap(); // send user info if required
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: res.amount,
                currency: res.currency,
                name: "RentManage Premium",
                description: "Access Premium Features",
                order_id: res.orderId,
                handler: async (response) => {
                    const verifyRes = await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }).unwrap();

                    if (verifyRes.success) {
                        toast.success("Premium Activated Successfully!");
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: res.user.name,
                    email: res.user.email,
                },
                theme: {
                    color: "#2563eb",
                },
            };

            const rzp = new (window).Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment failed:", err);
            toast.error(err?.data?.message || "Payment initiation failed");
        }
    };
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate("/plans")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow font-semibold transition"
        >
            Upgrade to Premium
        </button>
    );
};

export default UpgradeToPremium;
