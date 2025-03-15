import NoImage from "../../assets/No-Image-Placeholder.svg";
import { RemoveFromFavourites } from "./RemoveFromFavourites";
import { AddToFavourites } from "./AddToFavourites";

type ClevelandArtworkDisplayProps = {
  artwork: any;
  isFavourite: boolean;
  collectionData: any;
  collectionLoading: boolean;
  collectionError: boolean;
  addToFavourites: (selectedCollectionId: number) => void;
  removeFromFavourites: () => void;
  isAddingToFavourites?: boolean;
  isRemovingFromFavourites?: boolean;
};

export const ClevelandArtworkDisplay = ({
  artwork,
  isFavourite,
  collectionData,
  collectionLoading,
  collectionError,
  addToFavourites,
  removeFromFavourites,
  isAddingToFavourites = false,
  isRemovingFromFavourites = false,
}: ClevelandArtworkDisplayProps) => {
  const artData = artwork.data.data;

  return (
    <div className="bg-lbg-purple dark:bg-dbg-purple border-dbg-purple dark:border-lbg-purple overflow-hidden">
      {artData.images && artData.images.web ? (
        <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
          <img
            src={artData.images.web.url}
            alt={artData.title}
            className="max-h-[1080px] min-w-[341px] max-w-full object-contain"
          />
        </div>
      ) : (
        <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
          <img
            src={NoImage}
            alt={artData.title}
            className="max-h-[1080px] min-w-[341px] max-w-full object-contain"
          />
        </div>
      )}

      <div className="p-6 bg-dbg-purple dark:bg-dheadline-white mt-4 rounded-2xl">
        <div className="flex flex-row justify-between flex-wrap">
          <h2 className="text-2xl font-bold text-dheadline-white dark:text-dbg-purple mb-4">
            {artData.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {artData.creation_date && (
            <DetailItem label="Date" value={artData.creation_date} />
          )}

          {artData.culture && artData.culture.length > 0 && (
            <DetailItem label="Culture" value={artData.culture[0]} />
          )}

          {artData.type && <DetailItem label="Type" value={artData.type} />}

          {artData.technique && (
            <DetailItem label="Technique" value={artData.technique} />
          )}

          {artData.copyright && (
            <DetailItem label="Copyright" value={artData.copyright} />
          )}

          {artData.url && (
            <DetailLink label="Cleveland Art Museum URL:" value={artData.url} />
          )}
        </div>

        {artData.description && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
              Description
            </h3>
            <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
              {artData.description}
            </p>
          </div>
        )}

        {!isFavourite ? (
          <AddToFavourites
            addToFavourites={addToFavourites}
            isAddingToFavourites={isAddingToFavourites}
          />
        ) : (
          <RemoveFromFavourites
            collectionData={collectionData}
            collectionLoading={collectionLoading}
            collectionError={collectionError}
            removeFromFavourites={removeFromFavourites}
            isRemovingFromFavourites={isRemovingFromFavourites}
          />
        )}
      </div>
    </div>
  );
};

type DetailItemProps = {
  label: string;
  value: string;
};

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
      {label}
    </h3>
    <p className="mt-1 text-dheadline-white dark:text-dbg-purple">{value}</p>
  </div>
);

const DetailLink = ({ label, value }: DetailItemProps) => (
  <div>
    <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
      {label}
    </h3>
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 text-dheadline-white dark:text-dbg-purple break-words break-all"
    >
      {value}
    </a>
  </div>
);
