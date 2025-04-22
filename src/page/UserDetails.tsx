import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Mail,
  Phone,
  Building2,
  Globe,
  StickyNote,
  Image,
  CheckCircle,
  ArrowLeft,
  XCircle,
} from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => setUser(res.data));
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((res) => setPosts(res.data));
      axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`).then((res) => setAlbums(res.data));
      axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`).then((res) => setTodos(res.data));
    }
  }, [id]);

  if (!user) return <div className="text-center py-20">Loading user details...</div>;

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-8 border-t-8 border-[#d90f1c]">
          <h1 className="text-3xl font-bold text-[#d90f1c] mb-4">{user.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {user.phone}</p>
            <p className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {user.company.name}</p>
            <p className="flex items-center gap-2"><Globe className="w-4 h-4" /> {user.website}</p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
            {posts.slice(0, 3).map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <Link to={`/posts?userId=${id}`} className="inline-block mt-3 text-blue-600 hover:underline text-sm">
            View all posts
          </Link>
        </div>

        {/* Albums Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">Albums</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            {albums.slice(0, 3).map((album) => (
              <li key={album.id}>
                {album.title}
                <Link
                  to={`/photos?albumId=${album.id}`}
                  className="ml-2 text-blue-600 hover:underline text-sm"
                >
                  View photos
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Todos Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Todos</h2>
          </div>
          <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5">
            {todos.slice(0, 3).map((todo) => (
              <li key={todo.id} className="flex items-center gap-2">
                {todo.title}
                {todo.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </li>
            ))}
          </ul>
          <Link to={`/todos?userId=${id}`} className="inline-block mt-3 text-blue-600 hover:underline text-sm">
            View all todos
          </Link>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <Link
            to="/users"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserDetails;
