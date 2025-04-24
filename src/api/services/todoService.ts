import api from '../axios';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoResponse {
  data: Todo[];
  error: string | null;
  loading: boolean;
}

export const getTodosByUserId = async (userId: number): Promise<TodoResponse> => {
  try {
    const response = await api.get<Todo[]>(`/todos?userId=${userId}`);
    return { data: response.data, error: null, loading: false };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Error fetching todos',
      loading: false
    };
  }
};
