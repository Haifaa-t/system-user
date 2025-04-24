type Props = {
  title: string;
  thumbnailUrl: string;
};

const PhotoCard = ({ title, thumbnailUrl }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <p className="text-sm text-gray-700">{title}</p>
    </div>
  );
};

export default PhotoCard;
