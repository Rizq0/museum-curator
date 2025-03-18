import { IconHeartPlus } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "../../api-calls/backend/backend-calls";
import { LoaderIcon } from "lucide-react";
import { PaginationOnly } from "../utility/PaginationOnly";
import { RetryError } from "../error/Errors";

type AddToFavouritesProps = {
  addToFavourites: (collectionId: number) => void;
  isAddingToFavourites?: boolean;
};

type Collection = {
  id: number;
  user_id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
};

export const AddToFavourites = ({
  addToFavourites,
  isAddingToFavourites = false,
}: AddToFavouritesProps) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: collectionsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userCollections", currentPage],
    queryFn: () => fetchCollections(currentPage),
    enabled: open,
  });

  useEffect(() => {
    if (collectionsData?.data) {
      const pagination = collectionsData.data.pagination;
      if (pagination) {
        setTotalPages(pagination.total_pages || 1);
      }
    }
  }, [collectionsData]);

  const collections = collectionsData?.data?.data || [];

  const handleAddToCollection = () => {
    if (selectedCollectionId) {
      addToFavourites(selectedCollectionId);
      setOpen(false);
      setSelectedCollectionId(null);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (isAddingToFavourites) {
      setOpen(false);
    }
  }, [isAddingToFavourites, open]);

  return (
    <div className="flex flex-row justify-center my-6">
      <Popover
        open={open}
        onOpenChange={(isOpen) => !isAddingToFavourites && setOpen(isOpen)}
      >
        <PopoverTrigger asChild>
          <IconHeartPlus
            className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
            height={48}
            width={48}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[365px] p-4 bg-lbg-purple dark:bg-dbg-purple">
          <h3 className="font-medium text-dbg-purple dark:text-lbuttonbg-white text-lg mb-2">
            Add to Collection
          </h3>

          {isLoading && (
            <div className="flex flex-col items-center py-4">
              <LoaderIcon className="animate-spin mb-2 text-dbg-purple dark:text-lbuttonbg-white" />
              <p className="text-dbg-purple dark:text-lbuttonbg-white">
                Loading your collections...
              </p>
            </div>
          )}

          {error && (
            <div className="py-4">
              <RetryError
                message="Error Fetching Collections"
                details="Could not load your collections."
                onRetry={() => refetch()}
                className="mt-16 mb-16"
              />
            </div>
          )}

          {!isLoading && !error && collections.length === 0 && (
            <div className="py-4">
              <p className="text-dbg-purple dark:text-lbuttonbg-white mb-2">
                You don't have any collections yet.
              </p>
              <p className="text-dbg-purple dark:text-lbuttonbg-white text-sm">
                Create a collection first to add artwork to it.
              </p>
            </div>
          )}

          {!isLoading && !error && collections.length > 0 && (
            <>
              <RadioGroup
                value={selectedCollectionId?.toString()}
                onValueChange={(value) =>
                  setSelectedCollectionId(Number(value))
                }
                className="space-y-1 my-4 text-dbg-purple dark:text-lbuttonbg-white"
              >
                {collections.map((collection: Collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center space-x-2 text-dbg-purple dark:text-lbuttonbg-white"
                  >
                    <RadioGroupItem
                      value={collection.id.toString()}
                      id={`collection-${collection.id}`}
                      className="text-dbg-purple dark:text-lbuttonbg-white border-dbg-purple dark:border-lbuttonbg-white"
                    />
                    <Label
                      htmlFor={`collection-${collection.id}`}
                      className="text-dbg-purple dark:text-lbuttonbg-white"
                    >
                      {collection.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {totalPages > 1 && (
                <PaginationOnly
                  previous={handlePrevPage}
                  next={handleNextPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              onClick={handleAddToCollection}
              disabled={
                selectedCollectionId === null ||
                isLoading ||
                collections.length === 0 ||
                isAddingToFavourites
              }
            >
              Add
            </Button>
            <Button
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              onClick={() => setOpen(false)}
              disabled={isAddingToFavourites}
            >
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
