import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { IconHeartMinus } from "@tabler/icons-react";

type RemoveFromFavouritesProps = {
  collectionData: any;
  collectionLoading: boolean;
  collectionError: boolean;
  removeFromFavourites: () => void;
};

export const RemoveFromFavourites = ({
  collectionData,
  collectionLoading,
  collectionError,
  removeFromFavourites,
}: RemoveFromFavouritesProps) => {
  return (
    <div className="flex flex-row justify-center my-6">
      <Popover>
        <PopoverTrigger asChild>
          <IconHeartMinus
            className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
            height={48}
            width={48}
            aria-label="Remove from favorites"
          />
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-dbg-purple dark:bg-dheadline-white">
          <h3 className="font-medium text-dheadline-white dark:text-dbg-purple text-lg mb-2">
            Remove from Favorites?
          </h3>

          {collectionLoading && (
            <p className="text-dheadline-white dark:text-dbg-purple mb-4">
              Loading collection information...
            </p>
          )}

          {collectionError && (
            <p className="text-dheadline-white dark:text-dbg-purple mb-4">
              Error loading collection information
            </p>
          )}

          {collectionData && (
            <p className="text-dheadline-white dark:text-dbg-purple mb-4">
              This artwork is part of your "{collectionData.data.name}"
              collection
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark"
              onClick={removeFromFavourites}
            >
              Remove
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
