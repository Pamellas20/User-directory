import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NewUser, UserRole } from '../types/types';


const userFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Age must be 18 or older'),
  role: z.nativeEnum(UserRole)
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const useUserForm = (onSubmit: (data: NewUser) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      role: UserRole.VIEWER
    }
  });

  const processSubmit = (data: UserFormData) => {
    onSubmit(data);
    reset();
  };

  return {
    register,
    handleSubmit: handleSubmit(processSubmit),
    errors,
    reset
  };
};