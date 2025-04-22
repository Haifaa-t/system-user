import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';


type Todo = {
  id: number;
  title: string;
  completed: boolean;
};


const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then((res) => setTodos(res.data));
    }
  }, [userId]);

  if (!todos.length) return <div className="text-center py-20">Loading todos...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow border-t-8 border-[#d90f1c] mb-8">
        <h2 className="text-2xl font-bold text-[#d90f1c]">User Todos</h2>
        <p className="text-gray-700">List of tasks assigned to the user</p>
      </div>
      <div className="max-w-5xl mx-auto">
        <ul className="list-disc pl-8 space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
              {todo.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="text-base text-gray-800">{todo.title}</span>
            </li>
          ))}
        </ul>
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

export default Todos;
