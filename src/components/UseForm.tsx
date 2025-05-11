import React from 'react';
import { useUserForm } from '../hooks/useUserForm';
import { NewUser, UserRole } from '../types/types';

interface UserFormProps {
  onSubmit: (data: NewUser) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useUserForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block font-medium text-gray-700 mb-1">Age</label>
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          min="18"
          className={`w-full p-2 border rounded ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="role" className="block font-medium text-gray-700 mb-1">Role</label>
        <select 
          id="role" 
          {...register('role')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <button 
        type="submit" 
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;