import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';

type Props = {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: { city: string };
    company: { name: string };
  };
};

const UserCard: FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/users/${user.id}`)}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-2xl transition duration-300 border-t-4 border-[#d90f1c] cursor-pointer"
    >
      <h2 className="text-xl font-bold text-[#d90f1c] mb-3">{user.name}</h2>
      <div className="text-gray-700 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <p>{user.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <p>{user.address.city}</p>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-500" />
          <p>{user.company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
