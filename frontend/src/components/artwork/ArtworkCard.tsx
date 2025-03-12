import NoImage from "../../assets/No-Image-Placeholder.svg";
import { useNavigate } from "react-router-dom";

interface Artwork {
  primaryimageurl: string;
  title: string;
  id: string;
  creation_date: string;
  dated: string;
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

  const handleClick = () => {
    navigate(`/artwork/${currentGallery}/${artwork.id}`);
  };

  return (
    <div
      className="p-4 border border-dbg-purple rounded-lg dark:border-lbg-purple max-w-[365px] cursor-pointer shadow-lg"
      onClick={() => {
        handleClick();
      }}
    >
      <li>
        <div className="flex flex-col items-center text-dbg-purple dark:text-lbuttonbg-white">
          <h1 className="text-lg font-bold mt-2 text-center line-clamp-2">
            {artwork.title}
          </h1>
          {currentGallery === "harvard" && <h2>{artwork.dated}</h2>}
          {currentGallery === "cleveland" && <h2>{artwork.creation_date}</h2>}
          <h2 className="text-sm text-center">Click for more details!</h2>
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
