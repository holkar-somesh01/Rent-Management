import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <aside className="w-64 h-screen bg-white shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <nav className="space-y-2">
                <Link to="/superAdmin/superAdmin-register" className="block p-2 rounded hover:bg-gray-200">
                    Register Landlord's
                </Link>
                {/* <Link to="/superAdmin/all-tenants" className="block p-2 rounded hover:bg-gray-200">
                    All Tenants
                </Link> */}
                <Link to="/superAdmin/all-landlords" className="block p-2 rounded hover:bg-gray-200">
                    All Landlords
                </Link>
                {/* <Link to="/superAdmin/payment" className="block p-2 rounded hover:bg-gray-200">
                    Payment's
                </Link> */}
                {/* <Link to="/superAdmin/properties" className="block p-2 rounded hover:bg-gray-200">
                    Properties
                </Link> */}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
