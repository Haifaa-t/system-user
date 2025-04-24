import { useEffect, useState } from 'react';
import { getAllUsers, User } from '../api/services/userService';
import UserCard from '../components/UserCard';

const colors = ['border-[#d90f1c]', 'border-[#ffcb05]', 'border-gray-500'];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await getAllUsers();
      setUsers(data);
      setError(error);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-600">Loading users...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#d90f1c] mb-8 text-center">User Profiles</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {users.map((user, index) => (
            <UserCard key={user.id} user={user} color={colors[index % colors.length]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;

