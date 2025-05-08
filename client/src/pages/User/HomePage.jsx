// import { useNavigate } from "react-router-dom";
// import UserNavbar from './UserNavbar';
// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Footer from './Footer';
// import { useGetPropertyQuery } from '../../redux/apis/userApi';

// const HomePage = () => {
//     const { data, isSuccess, isLoading, isError, error } = useGetPropertyQuery();
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const navigate = useNavigate();

//     const prevSlide = () => {
//         setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
//     };

//     const nextSlide = () => {
//         setCurrentIndex((prev) => (prev === data?.length - 1 ? 0 : prev + 1));
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             nextSlide();
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [currentIndex, data]);

//     // Navigate to details page
//     const handleNavigate = (id) => {
//         navigate(`/property/${id}`);
//     };

//     return (
//         <div className="w-full h-screen">
//             <div className="fixed w-full z-30 shadow-md bg-white/80 backdrop-blur-md">
//                 <UserNavbar />
//             </div>

//             <div className="relative w-full pt-20 overflow-hidden">
//                 {isLoading && <p className="text-center text-lg">Loading properties...</p>}
//                 {isError && <p className="text-center text-red-500">Error: {error.message}</p>}

//                 {isSuccess && data.length > 0 && (
//                     <div
//                         className="w-full h-[70vh] md:h-[80vh] lg:h-[85vh] relative rounded-lg shadow-xl p-5 cursor-pointer"
//                         onClick={() => handleNavigate(data[currentIndex]?._id)}
//                     >
//                         <div className="relative w-full h-full overflow-hidden rounded-lg">
//                             <img
//                                 src={data[currentIndex]?.images[0]}
//                                 alt={`Property ${currentIndex + 1}`}
//                                 className="w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out"
//                             />
//                             <button
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     prevSlide();
//                                 }}
//                                 className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-gray-900/70 text-white p-3 rounded-full hover:bg-gray-800 transition"
//                             >
//                                 <ChevronLeft size={30} />
//                             </button>
//                             <button
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     nextSlide();
//                                 }}
//                                 className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-gray-900/70 text-white p-3 rounded-full hover:bg-gray-800 transition"
//                             >
//                                 <ChevronRight size={30} />
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <div className="mt-10">
//                     <h2 className="text-center text-2xl font-bold">Available Properties</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
//                         {isSuccess && data.map((property) => (
//                             <div
//                                 key={property._id}
//                                 className="border p-4 rounded-lg shadow-lg cursor-pointer"
//                                 onClick={() => handleNavigate(property._id)}
//                             >
//                                 <img src={property.images[0]} alt={property.name} className="w-full h-48 object-cover rounded-lg" />
//                                 <h3 className="text-xl font-semibold mt-3">{property.name}</h3>
//                                 <p className="text-gray-600">Type: {property.type}</p>
//                                 <p className="text-gray-600">Location: {property.location}</p>
//                                 <p className="text-green-600 font-semibold">Rent: ₹{property.rentPrice}/month</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default HomePage;









// src/pages/HomePage.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="font-sans text-gray-800">
            {/* Header */}
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">RentManage</h1>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        <a href="#features" className="hover:text-blue-600">Features</a>
                        <a href="#about" className="hover:text-blue-600">About</a>
                        <a href="#contact" className="hover:text-blue-600">Contact</a>
                        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-blue-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <nav className="md:hidden px-4 pb-4 space-y-2">
                        <a href="#features" className="block hover:text-blue-600">Features</a>
                        <a href="#about" className="block hover:text-blue-600">About</a>
                        <a href="#contact" className="block hover:text-blue-600">Contact</a>
                        <a href="/login" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</a>
                    </nav>
                )}
            </header>

            {/* Hero Section */}
            <section className="bg-blue-50 py-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4 text-blue-700">Simplify Your Rent Management</h2>
                    <p className="text-lg mb-6 text-gray-700">Manage tenants, payments, and properties all in one place. Save time and reduce hassle.</p>
                    <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">Get Started</a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-3xl font-semibold text-center mb-12">Features</h3>
                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard
                            title="Tenant Management"
                            description="Track tenant information, lease dates, and contact details in one place."
                        />
                        <FeatureCard
                            title="Payment Tracking"
                            description="View rent payment history, pending dues, and generate reports effortlessly."
                        />
                        <FeatureCard
                            title="Property Overview"
                            description="Manage multiple properties with details, documents, and images."
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Take Control of Your Rentals?</h3>
                <p className="mb-6">Join hundreds of landlords already using RentManage to simplify their business.</p>
                <a href="/login" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition">Start Free Trial</a>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} RentManage. All rights reserved.</p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ title, description }) => (
    <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-700">{description}</p>
    </div>
);

export default HomePage;
