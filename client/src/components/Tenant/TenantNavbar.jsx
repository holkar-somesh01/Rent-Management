import { Bell, LogOut, Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useLogoutUserMutation } from '../../redux/apis/authApi';
import { toast } from 'sonner';

const TenantNavbar = () => {
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
            <nav className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">Tenant Dashboard</h1>
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
    )
}

export default TenantNavbar