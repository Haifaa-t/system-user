import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '@/components/PostCard';
import { ArrowLeft } from 'lucide-react';


type Post = {
  id: number;
  title: string;
  body: string;
};


const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => setPosts(res.data));
    }
  }, [userId]);

  if (!posts.length) return <div className="text-center py-20">Loading posts...</div>;

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
