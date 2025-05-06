const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Brand Name */}
                <div className="text-lg font-semibold">
                    <span className="text-blue-500">Rent</span> Management
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-blue-400">Home</a>
                    <a href="#" className="hover:text-blue-400">About</a>
                    <a href="#" className="hover:text-blue-400">Services</a>
                    <a href="#" className="hover:text-blue-400">Contact</a>
                </div>

                {/* Contact Information */}
                <div className="text-sm mt-4 md:mt-0 text-center md:text-left">
                    <p>Email: support@rentmanagement.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Rent Street, City, Country</p>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 flex justify-center space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">LinkedIn</a>
                <a href="#" className="hover:text-blue-400">Instagram</a>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-4">
                &copy; {new Date().getFullYear()} Rent Management. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
