import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UseForm';
import { useUserContext } from '../context/UserContext';
import { NewUser, UserActionType } from '../types/types';

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useUserContext();
  const [success, setSuccess] = useState(false);

  const handleAddUser = (userData: NewUser) => {
    dispatch({
      type: UserActionType.ADD_NEW_USER,
      payload: userData
    });
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="py-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New User</h2>

      {success ? (
        <div className="bg-green-100 text-green-800 py-4 px-6 rounded-lg text-center mb-6">
          User added successfully! Redirecting...
        </div>
      ) : (
        <UserForm onSubmit={handleAddUser} />
      )}
    </div>
  );
};

export default AddUserPage;
