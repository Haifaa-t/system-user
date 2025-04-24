
import api from '../axios';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface AlbumResponse {
  data: Album[];
  error: string | null;
}

export const getAlbumsByUserId = async (userId: number): Promise<AlbumResponse> => {
  try {
    const response = await api.get<Album[]>(`/albums?userId=${userId}`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch albums',
    };
  }
};
