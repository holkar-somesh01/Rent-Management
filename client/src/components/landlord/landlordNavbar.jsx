import { Bell, LogOut, Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useLogoutUserMutation } from '../../redux/apis/authApi';
import { toast } from 'sonner';
import UpgradeToPremium from './UpgradeToPremium';

const LandlordNavbar = () => {
    const [LogoutLandlord, { isSuccess, isError, error, isLoading }] = useLogoutUserMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Logout successful!");
        }
        if (isError) {
            toast.error("Logout failed! Please try again.");
        }
    }, [isSuccess, isError]);

    const handleLogout = async () => {
        try {
            await LogoutLandlord().unwrap();
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <>
            <div className="w-full fixed top-0  left-0 bg-orange-500 text-white text-sm py-2 px-4 flex justify-between items-center z-50 shadow-md">
                <p className="font-semibold">
                    🚀 Unlock more features – Upgrade to <span className="underline">Premium</span> now!
                </p>
                <UpgradeToPremium />
            </div>
            <nav className="flex pt-10 justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">Landlord Dashboard</h1>
                <div className="flex items-center gap-4">
                    <button className="relative text-gray-600 hover:text-blue-600 transition">
                        <Bell size={24} />
                    </button>
                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex items-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
                        <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>
            </nav>

        </>
    );
};

export default LandlordNavbar;
