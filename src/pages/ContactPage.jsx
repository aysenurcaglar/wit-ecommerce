import React from 'react';
import { Printer, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ContactPage = () => {
    const locations = [
        {
            city: 'Paris',
            address: '1901 Thorn Ridge Cir.',
            zip: '75000 Paris',
            phone: '+451 215 215',
            fax: '+451 215 215'
        },
        {
            city: 'New York',
            address: '2715 Ash Dr. San Jose,',
            zip: '75000 Paris',
            phone: '+451 215 215',
            fax: '+451 215 215'
        },
        {
            city: 'Berlin',
            address: '4140 Parker Rd.',
            zip: '75000 Paris',
            phone: '+451 215 215',
            fax: '+451 215 215'
        },
        {
            city: 'London',
            address: '3517 W. Gray St. Utica,',
            zip: '75000 Paris',
            phone: '+451 215 215',
            fax: '+451 215 215'
        }
    ];

    return (
        <div className="min-h-screen relative">
            {/* Background image with gradient overlay */}
            <div className="absolute inset-0 bg-[url('/shop-hero-1-product-slide-1.jpg')] bg-cover">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-[85vw] md:max-w-75vw relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12 gap-16">
                {/* Contact Us */}
                <div className="max-w-lg justify-center md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-bold text-white mb-8">CONTACT US</h1>
                    <p className="text-lg text-white mb-8">
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                    <Button>
                        CONTACT US
                    </Button>
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:w-1/2 text-left">
                    {locations.map((location) => (
                        <div key={location.city} className="text-white">
                            <h2 className="text-2xl font-bold mb-4">{location.city}</h2>
                            <div className="space-y-3">
                                <p className="text-lg">{location.address}</p>
                                <div className="w-12 h-0.5 bg-primary-color my-2" />
                                <p className="text-lg">{location.zip}</p>
                                <p className="text-lg">Phone : {location.phone}</p>
                                <p className="text-lg">Fax : {location.fax}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;