interface Artwork {
  primaryimageurl: string;
  title: string;
  artist: string;
}

export const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  return (
    <div className="p-4 border-2 max-w-[365px] cursor-pointer">
      <li className="flex flex-col items-center">
        <h1 className="text-lg font-bold mt-2">{artwork.title}</h1>
        <img
          className="w-64 h-64 object-cover rounded-lg"
          src={artwork.primaryimageurl}
          alt={artwork.title}
        />
      </li>
    </div>
  );
};
