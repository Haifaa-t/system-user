import api from '../axios';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostResponse {
  data: Post[];
  error: string | null;
  loading: boolean;
}

export const getPostsByUserId = async (userId: number): Promise<PostResponse> => {
  try {
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);
    return { data: response.data, error: null, loading: false };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Error fetching posts',
      loading: false
    };
  }
};
