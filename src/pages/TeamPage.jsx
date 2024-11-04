import React from 'react';

const teamMembers = [
    {
        name: 'Kristin Watson',
        role: 'Founder',
        description: 'the quick fox jumps over the lazy dog',
        imageUrl: 'https://i.pravatar.cc/500?img=5',
    },
    {
        name: 'Floyd Miles',
        role: 'Founder',
        description: 'the quick fox jumps over the lazy dog',
        imageUrl: 'https://i.pravatar.cc/500?img=6',
    },
    {
        name: 'Eleanor Pena',
        role: 'Founder',
        description: 'the quick fox jumps over the lazy dog',
        imageUrl: 'https://i.pravatar.cc/500?img=7',
    },
    {
        name: 'Jane Cooper',
        role: 'Founder',
        description: 'the quick fox jumps over the lazy dog',
        imageUrl: 'https://i.pravatar.cc/500?img=8',
    }
];

const TeamPage = () => {
    return (
        <div className="bg-gray py-16 px-8">
            <div className="max-w-75vw mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-dark-gray">Meet Our Team</h1>
                    <p className="text-light-gray font-semibold mt-4">
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
                            <div className={`w-24 h-30 rounded-full overflow-hidden flex items-center justify-center`}>
                                <img src={member.imageUrl} alt={member.name} className="rounded-full" />
                            </div>
                            <p className="text-primary-color font-semibold mt-4">{member.role}</p>
                            <h3 className="text-xl font-bold text-dark-gray">{member.name}</h3>
                            <p className="text-light-gray font-semibold text-center mt-2">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
