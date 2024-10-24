import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-dark-gray py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2024 Witty Store. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#twitter" className="hover:underline">Twitter</a>
          <a href="#facebook" className="hover:underline">Facebook</a>
          <a href="#instagram" className="hover:underline">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
