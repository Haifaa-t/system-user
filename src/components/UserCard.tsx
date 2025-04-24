import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { User } from '../api/services/userService';

type Props = {
  user: User;
  color: string;
};



const UserCard: FC<Props> = ({ user, color }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/users/${user.id}`)}
      className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transform transition hover:scale-105 border-t-8 ${color}`}
    >
      <div className="flex items-center mb-4">
      
        <div className="ml-4">
          <h2 className="text-xl font-bold text-[#d90f1c]">{user.name}</h2>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-700">
        <Phone className="inline w-4 h-4 mr-1" /> {user.phone}
        <p><MapPin className="inline w-4 h-4 mr-1" /> {user.address.city}</p>
        <p><Mail className="inline w-4 h-4 mr-1" /> {user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;

