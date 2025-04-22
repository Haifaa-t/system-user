// src/components/PostCard.tsx

type Props = {
  title: string;
  body: string;
};

const PostCard = ({ title, body }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{body}</p>
    </div>
  );
};

export default PostCard;
