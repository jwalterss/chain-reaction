import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 px-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="mb-2 md:mb-0">
          © {currentYear} Chain Reaction
        </div>
        
        <div className="flex items-center">
          <span className="mr-1">Made out of spite, by Jeremy Walters</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;