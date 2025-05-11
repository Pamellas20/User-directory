import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { User } from '../types/types';

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !user) {
    return (
      <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center my-4">
        <p className="mb-4">{error || 'User not found'}</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Contact Information</h3>
        <p className="mb-1">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="mb-1">
          <span className="font-medium">Phone:</span> {user.phone}
        </p>
        <p className="mb-1">
          <span className="font-medium">Website:</span> {user.website}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Address</h3>
        <p className="mb-1">
          {user.address.street}, {user.address.suite}
        </p>
        <p className="mb-1">
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Company</h3>
        <p className="mb-1">
          <span className="font-medium">Name:</span> {user.company.name}
        </p>
        <p className="mb-1">
          <span className="font-medium">Catch Phrase:</span> "{user.company.catchPhrase}"
        </p>
        <p className="mb-1">
          <span className="font-medium">Business:</span> {user.company.bs}
        </p>
      </div>

      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block mt-2">
        Back to Home
      </Link>
    </div>
  );
};

export default UserProfilePage;