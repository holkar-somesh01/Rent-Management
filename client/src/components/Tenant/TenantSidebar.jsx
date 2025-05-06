import React from 'react';
import { Home, CreditCard, Wrench, User, Bell, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const TenantSidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/tenant/dashboard' },
        { name: 'Rent Payments', icon: CreditCard, path: '/tenant/payments' },
        { name: 'Maintenance', icon: Wrench, path: '/tenant/maintenance' },
        { name: 'Profile', icon: User, path: '/tenant/profile' },
        { name: 'Notifications', icon: Bell, path: '/tenant/notifications' },
        { name: 'Support', icon: HelpCircle, path: '/tenant/support' }
    ];

    return (
        <div className="bg-gray-800 text-white h-screen p-4 w-64">
            <ul className="space-y-4">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TenantSidebar;
