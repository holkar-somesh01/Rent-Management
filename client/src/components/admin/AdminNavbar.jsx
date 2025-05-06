import { Link, useNavigate } from "react-router-dom";
import { useLogoutAdminMutation } from "../../redux/apis/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { LogOut, Settings, LayoutDashboard } from "lucide-react";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const [logOutAdmin, { isSuccess, isError, error, isLoading }] = useLogoutAdminMutation();

    useEffect(() => {

        if (isSuccess) {
            toast.dismiss()
            toast.success("Logged out successfully!", { duration: 3000 });
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }
        if (isError) {
            toast.error(error?.data?.message || "Logout failed. Please try again.");
        }
    }, [isSuccess, isError, error, navigate]);

    const handleLogout = async () => {
        await logOutAdmin();
    };

    return (
        <nav className="flex justify-between items-center px-4">
            {/* Brand Logo */}
            <Link to="/superAdmin/dashboard" className="text-2xl font-bold text-blue-600 tracking-wide">
                SuperAdmin<span className="text-gray-800">Panel</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/settings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                            <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75"></path>
                        </svg>
                    ) : (
                        <>
                            <LogOut size={20} />
                            <span>Logout</span>
                        </>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
