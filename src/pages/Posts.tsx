import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPostsByUserId, Post } from '../api/services/postService'; 
import PostCard from '../components/PostCard';
import { ArrowLeft } from 'lucide-react';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchPosts = async () => {
      if (userId) {
        const result = await getPostsByUserId(Number(userId));
        setPosts(result.data);
        setError(result.error);
        setLoading(result.loading);
      }
    };
    fetchPosts();
  }, [userId]);

  if (loading) return <div className="text-center py-20 text-gray-600">Loading posts...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow border-t-8 border-[#d90f1c] mb-8">
        <h2 className="text-2xl font-bold text-[#d90f1c]">User Posts</h2>
        <p className="text-gray-700">Explore all posts written by this user</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} title={post.title} body={post.body} />
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

export default Posts;


