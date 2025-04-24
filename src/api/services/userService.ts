import api from '../axios';
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface UserResponse {
  data: User[];
  error: string | null;
}

export const getAllUsers = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<User[]>('/users');
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching users',
    };
  }
};
