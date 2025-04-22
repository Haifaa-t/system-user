import { useNavigate } from 'react-router-dom';
import { UsersIcon } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7f7f7] text-center px-6">
      <div className="bg-white shadow-lg p-10 rounded-2xl max-w-xl w-full border-t-8 border-[#d90f1c]">
        <h1 className="text-4xl font-semibold text-[#d90f1c] mb-4 tracking-tight">
          Welcome to the System
        </h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Explore users and their posts, albums, and todos.
        </p>
        <button
  onClick={() => navigate('/users')}
  className="inline-flex items-center gap-2 bg-[#d90f1c] hover:bg-[#b40d18] text-white text-lg font-semibold py-4 px-8 rounded-full shadow-md transition duration-300 border-none"
>
  <UsersIcon className="w-5 h-5 text-white" />
  View Users
</button>

      </div>
    </div>
  );
};

export default Home;
