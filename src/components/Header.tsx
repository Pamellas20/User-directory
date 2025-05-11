import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Directory</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/add-user" className="hover:underline">Add User</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;