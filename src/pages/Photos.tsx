import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPhotosByAlbumId } from '../api/services/photoService';
import PhotoCard from '../components/PhotoCard';
import { ArrowLeft } from 'lucide-react';



const Photos = () => {
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get('albumId');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (albumId) {
        setLoading(true);
        const result = await getPhotosByAlbumId(Number(albumId));
        setPhotos(result.data);
        setError(result.error);
        setLoading(result.loading);
      }
    };

    fetchPhotos();
  }, [albumId]);

  if (loading) return <div className="text-center py-20">Loading photos...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow border-t-8 border-[#d90f1c] mb-8">
        <h2 className="text-2xl font-bold text-[#d90f1c]">Album Photos</h2>
        <p className="text-gray-700">All photos in this album</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} title={photo.title} thumbnailUrl={photo.thumbnailUrl} />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link to="/users" className="inline-flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Photos;
