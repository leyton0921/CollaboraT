import React from "react";

interface NavProps {
  links: { href: string; name: string }[];
}

export const Navbar: React.FC<NavProps> = ({ links }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="text-green-600 text-xl font-bold">CollaboraT</div>
      <div className="space-x-6">
        {links.map((link, index) => (
          <a key={index} href={link.href} className="text-gray-600">
            {link.name}
          </a>
        ))}
      </div>
      <div className="space-x-4 flex items-center">
        <a href="#" className="text-gray-600">
          Profile
        </a>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </nav>
  );
};
