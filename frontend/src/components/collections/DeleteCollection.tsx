import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { IconTrash } from "@tabler/icons-react";
import { deleteCollectionById } from "../../api-calls/backend/backend-calls";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteCollectionProps {
  collectionId: number;
}

export const DeleteCollection = ({ collectionId }: DeleteCollectionProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!collectionId) {
      toast.error("Collection ID not provided");
      return;
    }
    setIsDeleting(true);

    toast.promise(
      deleteCollectionById(collectionId),
      {
        loading: "Deleting collection...",
        success: () => {
          queryClient.invalidateQueries({ queryKey: ["collections"] });
          queryClient.invalidateQueries({
            queryKey: ["isFavourite"],
          });
          setIsDeleting(false);
          setOpen(false);
          return "Collection deleted!";
        },
        error: (error) => {
          console.error("Failed to delete collection:", error);
          setIsDeleting(false);
          return "Failed to delete collection!";
        },
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 3000,
          icon: "🎨",
        },
        error: {
          duration: 3000,
          icon: "❌",
        },
      }
    );
  };

  return (
    <div className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <IconTrash height={24} width={24} />
        </PopoverTrigger>
        <PopoverContent className="w-[365px] p-4 bg-lbg-purple dark:bg-dbg-purple border-1 border-dbg-purple dark:border-dbuttonbg-pink">
          <h3 className="font-medium text-dbg-purple dark:text-lbuttonbg-white text-lg mb-2">
            Delete Collection?
          </h3>
          <p className="text-dbg-purple dark:text-lbuttonbg-white">
            Are you sure you want to delete this collection?
          </p>
          <div className="flex flex-row justify-end mt-4">
            <Button
              onClick={handleDelete}
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer mr-4"
              disabled={isDeleting}
            >
              Delete
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
