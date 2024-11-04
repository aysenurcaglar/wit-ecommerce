import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

const teamMembers = [
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
    { name: 'Username', role: 'Profession', image: 'https://placehold.co/400x250/thistle/white' },
];

const TeamPage = () => {
    return (
        <div className="bg-gray-50">
            {/* Header Section */}
            <section className="text-center pt-16 pb-12 max-w-[85vw] md:max-w-75vw mx-auto">
                <p className="uppercase text-gray-500 font-medium">What we do</p>
                <h1 className="text-5xl font-bold text-gray-800 my-4">Innovation tailored for you</h1>
                <Breadcrumb className="flex flex-row justify-center">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="font-bold">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <ChevronRight />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/team">Team</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </section>

            {/* Image Grid */}
            <section className="grid gap-2 py-2
      grid-cols-2 grid-rows-4
      md:grid-cols-4 md:grid-rows-4">
                <div className="col-span-2 row-span-2 
        md:row-span-4">
                    <img src="https://placehold.co/600x400/lightcoral/white" alt="Image 1" className="w-full h-full object-cover" />
                </div>
                <div className="row-start-3 
        md:row-span-2 md:col-start-3 md:row-start-1">
                    <img src="https://placehold.co/300x200/lightcoral/white" alt="Image 2" className="w-full h-full object-cover" />
                </div>
                <div className="row-start-3 
        md:row-span-2 md:col-start-4 md:row-start-1">
                    <img src="https://placehold.co/300x200/lightcoral/white" alt="Image 3" className="w-full h-full object-cover" />
                </div>
                <div className="row-start-4 
        md:row-span-2 md:col-start-3 md:row-start-3">
                    <img src="https://placehold.co/300x200/lightcoral/white" alt="Image 4" className="w-full h-full object-cover" />
                </div>
                <div className="row-start-4 
        md:row-span-2 md:col-start-4 md:row-start-3">
                    <img src="https://placehold.co/300x200/lightcoral/white" alt="Image 5" className="w-full h-full object-cover" />
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="text-center py-12 max-w-75vw mx-auto">
                <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg pb-6 flex flex-col items-center">
                            <div className={`flex items-center justify-center object-cover`}>
                                <img src={member.image} alt={member.name} />
                            </div>
                            <h3 className="text-xl font-bold mt-4">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                            <div className="flex space-x-4 mt-4">
                                <Facebook className="text-primary-color cursor-pointer" />
                                <Instagram className="text-primary-color cursor-pointer" />
                                <Twitter className="text-primary-color cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-100 py-16 text-center max-w-75vw mx-auto">
                <h3 className="text-2xl font-bold">Start your 14 days free trial</h3>
                <p className="text-gray-600 mt-2 mb-4">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.</p>
                <Button>Try it free now</Button>
                <div className="flex justify-center space-x-6 mt-6">
                    <Twitter className="text-primary-color cursor-pointer" />
                    <Facebook className="text-primary-color cursor-pointer" />
                    <Instagram className="text-primary-color cursor-pointer" />
                    <Linkedin className="text-primary-color cursor-pointer" />
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
