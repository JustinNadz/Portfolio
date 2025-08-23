import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black relative">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-semibold">ButDev</div>
            <p className="text-gray-600 mt-2">Building Tomorrow's Digital Solutions</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {currentYear} ButDev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


