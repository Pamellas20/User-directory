import React from 'react';
import { Link } from 'react-router-dom';
import { User, NewUser } from '../types/types';

interface UserCardProps {
  user: User | NewUser;
  isNewUser?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isNewUser = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:translate-y-[-4px]">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{user.name}</h3>
      <p className="text-gray-600 mb-4">{user.email}</p>
      
      {!isNewUser && 'id' in user && (
        <Link to={`/users/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
          View Profile
        </Link>
      )}
      
      {isNewUser && 'age' in user && (
        <div className="mt-2">
          <p className="text-gray-700">Age: {user.age}</p>
          <p className="text-gray-700">Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;