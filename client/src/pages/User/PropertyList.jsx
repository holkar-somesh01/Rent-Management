import React from 'react';
import { Link } from 'react-router-dom';

const properties = [
    {
        id: 1,
        name: "Luxury Villa",
        type: "Residential",
        location: "Los Angeles, CA",
        size: "4500 sq.ft",
        rentPrice: 2500000,
        documents: ["deed.pdf", "inspection_report.pdf"],
        images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&auto=format&fit=crop&q=60"],
        landlord: "John Doe",
        isRented: false,
        isDeleted: false,
        description: "A beautiful luxury villa with modern amenities and a great view."
    },
    {
        id: 2,
        name: "Modern Apartment",
        type: "Residential",
        location: "New York, NY",
        size: "1200 sq.ft",
        rentPrice: 850000,
        documents: ["lease_agreement.pdf"],
        images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop&q=60"],
        landlord: "Sarah Smith",
        isRented: true,
        isDeleted: false,
        description: "A sleek and modern apartment in the heart of the city."
    },
    {
        id: 3,
        name: "Beachfront House",
        type: "Residential",
        location: "Miami, FL",
        size: "3500 sqft",
        rentPrice: 1800000,
        documents: ["ownership_certificate.pdf"],
        images: ["https://plus.unsplash.com/premium_photo-1680300960892-bd11b59b469b?w=600&auto=format&fit=crop&q=60"],
        landlord: "Michael Brown",
        isRented: false,
        isDeleted: false,
        description: "A stunning beachfront house with breathtaking ocean views."
    }
];

const PropertyList = () => {
    return (
        <>
            <div className="w-full min-h-screen bg-white py-10 px-5 md:px-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Featured Properties</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={property.images[0]}
                                alt={property.name}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
                                <p className="text-gray-600">{property.location}</p>
                                <p className="text-lg font-bold text-blue-600 mt-2">
                                    Rent Price: ${property.rentPrice.toLocaleString()}
                                </p>
                                <Link
                                    to={`/property-details/${property.id}`}
                                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PropertyList;
