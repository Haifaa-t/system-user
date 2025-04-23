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
  XCircle,
  ArrowLeft,
  User,
} from 'lucide-react';

type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

type Album = {
  id: number;
  title: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7f7f7] px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-3xl w-full border-t-8 border-[#d90f1c]">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold text-[#d90f1c]">{user.name}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-gray-700 mb-8">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <p>{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <p>{user.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <p>{user.company.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <p>{user.website}</p>
          </div>
        </div>

        <div className="space-y-8">
    
          <section>
            <div className="flex items-center gap-2 mb-2">
              <StickyNote className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {posts.slice(0, 3).map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
           <Link
  to={`/posts?userId=${userId}`}
  className="text-[#d90f1c] hover:underline mt-2 inline-block"
>
  View all posts
</Link>

          </section>

       
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800">Albums</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {albums.slice(0, 3).map((album) => (
                <li key={album.id}>
                  <p>{album.title}</p>
                 <Link
  to={`/photos?albumId=${album.id}`}
  className="ml-2 text-[#d90f1c] hover:underline text-sm"
>
  View photos
</Link>

                </li>
              ))}
            </ul>
          </section>

     
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Todos</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {todos.slice(0, 3).map((todo) => (
                <li key={todo.id} className="flex items-center gap-2">
                  {todo.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span>{todo.title}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10">
          <Link
            to="/users"
            className="inline-flex items-center gap-2 text-sm text-[#d90f1c] hover:underline transition"
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

