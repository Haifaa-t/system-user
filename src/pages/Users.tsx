import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
      

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
