import React from 'react';

const FeaturedPosts = () => {
  const posts = [
    { title: 'Loudest #1', date: '23 May 2024', image: 'unsplash_hHdHCfAifHU.jpg' },
    { title: 'Loudest #2', date: '24 May 2024', image: 'unsplash_tVEqStC2uz8.jpg' },
    { title: 'Loudest #3', date: '25 May 2024', image: 'unsplash_dEGu-oCuB1Y.jpg' },
  ];

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, idx) => (
          <div key={idx} className="border rounded-md">
            <img src={post.image} alt={post.title} className="w-full object-scale-down" />
            <h3 className=" font-bold">{post.title}</h3>
            <p className="text-light-gray">{post.date}</p>
            <a href="#" className="my-4 block text-blue-600">Learn more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
