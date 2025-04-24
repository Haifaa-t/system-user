import axios from 'axios';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotoResponse {
  data: Photo[];
  error: string | null;
  loading: boolean;
}

export const getPhotosByAlbumId = async (albumId: number): Promise<PhotoResponse> => {
  try {
    const response = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return {
      data: response.data,
      error: null,
      loading: false,
    };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred.',
      loading: false,
    };
  }
};
