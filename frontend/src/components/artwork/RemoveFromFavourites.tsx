import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { IconHeartMinus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type RemoveFromFavouritesProps = {
  collectionData: any;
  collectionLoading: boolean;
  collectionError: boolean;
  removeFromFavourites: () => void;
  isRemovingFromFavourites?: boolean;
};

export const RemoveFromFavourites = ({
  collectionData,
  collectionLoading,
  collectionError,
  removeFromFavourites,
  isRemovingFromFavourites = false,
}: RemoveFromFavouritesProps) => {
  const [open, setOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleRemove = () => {
    if (isConfirmed) {
      removeFromFavourites();
      setOpen(false);
      setIsConfirmed(false);
    }
  };

  useEffect(() => {
    if (isRemovingFromFavourites && open) {
      setOpen(false);
      setIsConfirmed(false);
    }
  }, [isRemovingFromFavourites, open]);

  return (
    <div className="flex flex-row justify-center my-6">
      <Popover
        open={open}
        onOpenChange={(isOpen) => !isRemovingFromFavourites && setOpen(isOpen)}
      >
        <PopoverTrigger asChild>
          <IconHeartMinus
            className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
            height={48}
            width={48}
            aria-label="Remove from favorites"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[365px] p-4 bg-lbg-purple dark:bg-dbg-purple">
          <h3 className="font-medium text-dbg-purple dark:text-lbuttonbg-white text-lg mb-2">
            Remove from Favorites?
          </h3>

          {collectionLoading && (
            <div className="flex flex-col items-center py-4">
              <LoaderIcon className="animate-spin mb-2 text-dbg-purple dark:text-lbuttonbg-white" />
              <p className="text-dbg-purple dark:text-lbuttonbg-white">
                Loading collection information...
              </p>
            </div>
          )}

          {collectionError && (
            <div className="py-4">
              <p className="text-dbg-purple dark:text-lbuttonbg-white mb-2">
                Error loading collection information
              </p>
              <p className="text-dbg-purple dark:text-lbuttonbg-white text-sm">
                Please try again later
              </p>
            </div>
          )}

          {collectionData && !collectionLoading && !collectionError && (
            <>
              <div className="py-4">
                <p className="text-dbg-purple dark:text-lbuttonbg-white mb-2">
                  Are you sure you want to remove this artwork from your
                  collection?
                </p>
              </div>

              <RadioGroup
                value={isConfirmed ? "confirm" : ""}
                onValueChange={(value) => setIsConfirmed(value === "confirm")}
                className="space-y-1 my-4 text-dbg-purple dark:text-lbuttonbg-white"
              >
                <div className="flex items-center space-x-2 text-dbg-purple dark:text-lbuttonbg-white">
                  <RadioGroupItem
                    value="confirm"
                    id="confirm-remove"
                    className="text-dbg-purple dark:text-lbuttonbg-white border-dbg-purple dark:border-lbuttonbg-white"
                  />
                  <Label
                    htmlFor="confirm-remove"
                    className="text-dbg-purple dark:text-lbuttonbg-white"
                  >
                    Yes, remove from "
                    {collectionData.data?.name || "collection"}"
                  </Label>
                </div>
              </RadioGroup>
            </>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              onClick={handleRemove}
              disabled={
                !isConfirmed ||
                collectionLoading ||
                collectionError ||
                !collectionData ||
                isRemovingFromFavourites
              }
            >
              Remove
            </Button>
            <Button
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              onClick={() => setOpen(false)}
              disabled={isRemovingFromFavourites}
            >
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
