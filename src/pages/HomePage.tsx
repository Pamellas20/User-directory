import React, { useEffect, useState } from 'react';
import UserCard from '../components/UseCard';
import Loading from '../components/Loading';
import { useUserContext } from '../context/UserContext';
import { UserActionType } from '../types/types';

const HomePage: React.FC = () => {
  const { state, dispatch } = useUserContext();
  const { users, newUsers, loading, error } = state;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: UserActionType.FETCH_USERS_START });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        dispatch({ type: UserActionType.FETCH_USERS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: UserActionType.FETCH_USERS_ERROR,
          payload: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users.length]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNewUsers = newUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center my-4">{error}</div>;
  }

  return (
    <div className="py-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-800">API Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="text-gray-500">No API users found.</p>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-800">New Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredNewUsers.length > 0 ? (
          filteredNewUsers.map((user, index) => (
            <UserCard key={`new-${index}`} user={user} isNewUser />
          ))
        ) : (
          <p className="text-gray-500">No new users added yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;