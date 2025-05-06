// import React from 'react';
// import { useParams } from 'react-router-dom';
// import UserNavbar from './UserNavbar';
// import { useGetPropertyByIdQuery } from '../../redux/apis/userApi';

// const PropertyDetails = () => {
//     const { id } = useParams();
//     const { data: property, isLoading, isError } = useGetPropertyByIdQuery(id);
//     if (isLoading) {
//         return <div className="text-center text-lg font-semibold mt-20">Loading property details...</div>;
//     }
//     if (isError || !property) {
//         return <div className="text-center text-red-500 font-bold text-xl">Property Not Found</div>;
//     }
//     return (
//         <>
//             <UserNavbar />
//             <div className="w-full min-h-screen bg-gray-100 py-10 px-5 md:px-10 flex flex-col items-center">
//                 <div className="max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
//                     <div className="w-full">
//                         <img
//                             src={property?.images?.[0] || 'https://via.placeholder.com/600'}
//                             alt={property.name}
//                             className="w-full h-96 object-cover rounded-t-xl"
//                         />
//                     </div>
//                     <div className="p-8">
//                         <h2 className="text-4xl font-bold text-gray-800">{property.name}</h2>
//                         <div className="grid md:grid-cols-2 gap-6 mt-6">
//                             <div>
//                                 <p className="text-lg text-gray-700"><strong>Location:</strong> {property.location}</p>
//                                 <p className="text-lg text-gray-700"><strong>Type:</strong> {property.type}</p>
//                                 <p className="text-lg text-gray-700"><strong>Size:</strong> {property.size}</p>
//                             </div>
//                             <div>
//                                 <p className="text-lg text-gray-700"><strong>Landlord:</strong> {property.landlord.name}</p>
//                                 <p className="text-lg font-semibold">
//                                     <strong>Status:</strong>
//                                     <span className={`px-3 py-1 rounded ${property.isRented ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
//                                         {property.isRented ? 'Rented' : 'Available'}
//                                     </span>
//                                 </p>
//                                 <p className="text-lg font-semibold text-blue-600">
//                                     <strong>Rent Price:</strong> ₹{property.rentPrice.toLocaleString()}
//                                 </p>
//                             </div>
//                         </div>
//                         <p className="mt-6 text-gray-700">{property.description}</p>
//                         {property.documents?.length > 0 && (
//                             <div className="mt-6">
//                                 <h3 className="text-xl font-semibold text-gray-800">Documents:</h3>
//                                 <ul className="list-disc list-inside text-gray-700">
//                                     {property.documents.map((doc, index) => (
//                                         <li key={index} className="mt-2">
//                                             <a
//                                                 href={doc}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-600 hover:underline"
//                                             >
//                                                 Document {index + 1}
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PropertyDetails







import React from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { useGetPropertyByIdQuery } from '../../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const PropertyDetails = () => {
    const { id } = useParams();
    const { data: property, isLoading, isError } = useGetPropertyByIdQuery(id);
    const { user } = useSelector((state) => state.auth);

    const handleBookProperty = () => {
        if (!user) {
            toast.error("You must be logged in to book this property.");
            return;
        }
        // Booking logic goes here
        console.log("Booking property:", property.name);
        toast.success("Booking request sent successfully!");
    };

    if (isLoading) {
        return <div className="text-center text-lg font-semibold mt-20">Loading property details...</div>;
    }
    if (isError || !property) {
        return <div className="text-center text-red-500 font-bold text-xl">Property Not Found</div>;
    }
    return (
        <>
            <UserNavbar />
            <div className="w-full min-h-screen bg-gray-100 py-10 px-5 md:px-10 flex flex-col items-center">
                <div className="max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="w-full">
                        <img
                            src={property?.images?.[0] || 'https://via.placeholder.com/600'}
                            alt={property.name}
                            className="w-full h-96 object-cover rounded-t-xl"
                        />
                    </div>
                    <div className="p-8">
                        <h2 className="text-4xl font-bold text-gray-800">{property.name}</h2>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <p className="text-lg text-gray-700"><strong>Location:</strong> {property.location}</p>
                                <p className="text-lg text-gray-700"><strong>Type:</strong> {property.type}</p>
                                <p className="text-lg text-gray-700"><strong>Size:</strong> {property.size}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-700"><strong>Landlord:</strong> {property.landlord.name}</p>
                                <p className="text-lg font-semibold">
                                    <strong>Status:</strong>
                                    <span className={`px-3 py-1 rounded ${property.isRented ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                        {property.isRented ? 'Rented' : 'Available'}
                                    </span>
                                </p>
                                <p className="text-lg font-semibold text-blue-600">
                                    <strong>Rent Price:</strong> ₹{property.rentPrice.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="mt-6 text-gray-700">{property.description}</p>
                        {property.documents?.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800">Documents:</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {property.documents.map((doc, index) => (
                                        <li key={index} className="mt-2">
                                            <a
                                                href={doc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Document {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Booking Button */}
                        <button
                            onClick={handleBookProperty}
                            disabled={property.isRented}
                            className={`mt-6 w-full px-6 py-3 rounded-xl text-white font-bold ${property.isRented ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {property.isRented ? 'Property Already Rented' : 'Book Now'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyDetails;
