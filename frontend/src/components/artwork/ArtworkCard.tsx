import NoImage from "../../assets/No-Image-Placeholder.svg";

interface Artwork {
  primaryimageurl: string;
  title: string;
  artist: string;
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
  return (
    <div className="p-4 border-2 max-w-[365px] cursor-pointer">
      <li className="flex flex-col items-center">
        {currentGallery === "harvard" && (
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold mt-2 text-center">
              {artwork.title}
            </h1>
            <img
              className="w-64 h-64 object-cover rounded-lg mt-2"
              src={artwork.primaryimageurl ? artwork.primaryimageurl : NoImage}
              alt={artwork.title}
            />
          </div>
        )}
        {currentGallery === "cleveland" && (
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold mt-2 text-center">
              {artwork.title}
            </h1>
            <img
              className="w-64 h-64 object-cover rounded-lg mt-2"
              src={
                artwork.images?.print?.url ? artwork.images.print.url : NoImage
              }
              alt={artwork.title}
            />
          </div>
        )}
      </li>
    </div>
  );
};
