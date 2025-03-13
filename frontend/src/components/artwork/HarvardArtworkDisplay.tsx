import NoImage from "../../assets/No-Image-Placeholder.svg";
import { RemoveFromFavourites } from "./RemoveFromFavourites";
import { AddToFavourites } from "./AddToFavourites";

type HarvardArtworkDisplayProps = {
  artwork: any;
  isFavourite: boolean;
  collectionData: any;
  collectionLoading: boolean;
  collectionError: boolean;
  addToFavourites: () => void;
  removeFromFavourites: () => void;
};

export const HarvardArtworkDisplay = ({
  artwork,
  isFavourite,
  collectionData,
  collectionLoading,
  collectionError,
  addToFavourites,
  removeFromFavourites,
}: HarvardArtworkDisplayProps) => {
  const artData = artwork.data;

  return (
    <div className="bg-lbg-purple dark:bg-dbg-purple border-dbg-purple dark:border-lbg-purple overflow-hidden mt-4">
      {artData.primaryimageurl ? (
        <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
          <img
            src={artData.primaryimageurl}
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
          {artData.dated && <DetailItem label="Date" value={artData.dated} />}

          {artData.culture && (
            <DetailItem label="Culture" value={artData.culture} />
          )}

          {artData.classification && (
            <DetailItem label="Classification" value={artData.classification} />
          )}

          {artData.technique && (
            <DetailItem label="Technique" value={artData.technique} />
          )}

          {artData.period && (
            <DetailItem label="Period" value={artData.period} />
          )}

          {artData.copyright && (
            <DetailItem label="Copyright" value={artData.copyright} />
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
          <AddToFavourites addToFavourites={addToFavourites} />
        ) : (
          <RemoveFromFavourites
            collectionData={collectionData}
            collectionLoading={collectionLoading}
            collectionError={collectionError}
            removeFromFavourites={removeFromFavourites}
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
