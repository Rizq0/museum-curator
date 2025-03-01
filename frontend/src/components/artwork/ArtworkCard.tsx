import NoImage from "../../assets/No-Image-Placeholder.svg";
import { useNavigate } from "react-router-dom";

interface Artwork {
  primaryimageurl: string;
  title: string;
  id: string;
  images?: {
    print: {
      url: string;
    };
  };
}

export const ArtworkCard = ({
  artwork,
  currentGallery,
}: {
  artwork: Artwork;
  currentGallery: string;
}) => {
  const navigate = useNavigate();
  const getImageUrl = () => {
    switch (currentGallery) {
      case "harvard":
        return artwork.primaryimageurl || NoImage;
      case "cleveland":
        return artwork.images?.print?.url || NoImage;
      default:
        return NoImage;
    }
  };

  const handleClick = (id: string) => {
    navigate(`/artwork/${currentGallery}/${id}`);
  };

  return (
    <div
      className="p-4 border-2 max-w-[365px] cursor-pointer"
      onClick={() => {
        handleClick(artwork.id);
      }}
    >
      <li>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold mt-2 text-center line-clamp-2">
            {artwork.title}
          </h1>
          <h2>ID: {artwork.id}</h2>
          <img
            className="w-64 h-64 object-cover rounded-lg mt-2"
            src={getImageUrl()}
            alt={artwork.title}
          />
        </div>
      </li>
    </div>
  );
};
