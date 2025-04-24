import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllUsers, User } from '../api/services/userService';
import { getPostsByUserId, Post } from '../api/services/postService';
import { getAlbumsByUserId, Album } from '../api/services/albumService';
import { getTodosByUserId, Todo } from '../api/services/todoService';
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
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = Number(id);
        const [userRes, postRes, albumRes, todoRes] = await Promise.all([
          getAllUsers(),
          getPostsByUserId(userId),
          getAlbumsByUserId(userId),
          getTodosByUserId(userId)
        ]);

        const foundUser = userRes.data.find((u) => u.id === userId);
        setUser(foundUser || null);
        setPosts(postRes.data);
        setAlbums(albumRes.data);
        setTodos(todoRes.data);
        if (userRes.error || postRes.error || albumRes.error || todoRes.error) {
          setError(userRes.error || postRes.error || albumRes.error || todoRes.error);
        }
      } catch (err) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading user details...</div>;
  if (error || !user) return <div className="text-center py-20 text-red-500">Error: {error || "User not found"}</div>;

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="bg-white rounded-xl shadow-md p-8 border-t-8 border-[#d90f1c]">
          <h1 className="text-3xl font-bold text-[#d90f1c] mb-4">{user.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {user.phone}</p>
            <p className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {user.company.name}</p>
            <p className="flex items-center gap-2"><Globe className="w-4 h-4" /> {user.website}</p>
          </div>
        </div>

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
          <Link to={`/posts?userId=${user.id}`} className="inline-block mt-3 text-blue-600 hover:underline text-sm">
            View all posts
          </Link>
        </div>

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
          <Link to={`/todos?userId=${user.id}`} className="inline-block mt-3 text-blue-600 hover:underline text-sm">
            View all todos
          </Link>
        </div>

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
