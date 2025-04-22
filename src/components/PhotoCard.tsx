// src/components/PhotoCard.tsx

type Props = {
  title: string;
  thumbnailUrl: string;
};

const PhotoCard = ({ title, thumbnailUrl }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
  );
};

export default PhotoCard;
