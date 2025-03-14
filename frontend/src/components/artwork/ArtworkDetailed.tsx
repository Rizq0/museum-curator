import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHarvardArtById } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArtById } from "../../api-calls/clevelandart/clevelandart-calls";
import { LoaderIcon } from "lucide-react";
import { HarvardArtworkDisplay } from "../artwork/HarvardArtworkDisplay";
import { ClevelandArtworkDisplay } from "../artwork/ClevelandArtworkDisplay";
import {
  checkIfArtworkIsFavourited,
  fetchCollectionById,
  addArtworkToCollection,
  deleteArtworkFromCollection,
} from "../../api-calls/backend/backend-calls";
import toast from "react-hot-toast";
import { BackButton } from "../utility/BackButton";

export const ArtworkDetailed = () => {
  let { gallery, id } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAddingToFavourites, setIsAddingToFavourites] = useState(false);
  const [isRemovingFromFavourites, setIsRemovingFromFavourites] =
    useState(false);
  const queryClient = useQueryClient();

  const harvardQueryEnabled = gallery === "harvard" && id !== undefined;
  const clevelandQueryEnabled = gallery === "cleveland" && id !== undefined;

  const {
    data: harvardArt,
    isLoading: harvardLoad,
    error: harvardError,
  } = useQuery({
    queryKey: ["harvardArt", id],
    queryFn: () => getHarvardArtById(Number(id)),
    enabled: harvardQueryEnabled,
  });

  const {
    data: clevelandArt,
    isLoading: clevelandLoad,
    error: clevelandError,
  } = useQuery({
    queryKey: ["clevelandArt", id],
    queryFn: () => getClevelandArtById(Number(id)),
    enabled: clevelandQueryEnabled,
  });

  const { data: isFavouriteData } = useQuery({
    queryKey: ["isFavourite", id, gallery],
    queryFn: () => checkIfArtworkIsFavourited(id ?? "", gallery ?? ""),
    enabled: id !== undefined && gallery !== undefined,
    staleTime: 0,
    gcTime: 0,
  });

  const collectionId = isFavouriteData?.data?.favourite_list_id;
  const {
    data: collectionData,
    isLoading: collectionLoading,
    error: collectionError,
  } = useQuery({
    queryKey: ["collectionData", collectionId],
    queryFn: () => fetchCollectionById(collectionId ?? 0),
    enabled: !!collectionId,
  });

  useEffect(() => {
    if (isFavouriteData?.data) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [isFavouriteData]);

  const handleAddToFavourites = (selectedCollectionId: number) => {
    if (!id || !gallery) {
      toast.error("Missing artwork information");
      return;
    }

    setIsAddingToFavourites(true);

    toast.promise(
      addArtworkToCollection(selectedCollectionId, id, gallery),
      {
        loading: "Adding to collection...",
        success: () => {
          setIsFavourite(true);
          queryClient.invalidateQueries({
            queryKey: ["isFavourite", id, gallery],
          });
          queryClient.invalidateQueries({
            queryKey: ["collectionData", selectedCollectionId],
          });
          setIsAddingToFavourites(false);
          return "Added to collection!";
        },
        error: (err) => {
          console.error("Error adding to collection:", err);
          setIsAddingToFavourites(false);
          return "Failed to add to collection";
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

  const handleRemoveFromFavourites = () => {
    if (!id || !collectionId) {
      toast.error("Missing artwork or collection information");
      return;
    }

    setIsRemovingFromFavourites(true);

    toast.promise(
      deleteArtworkFromCollection(collectionId, id),
      {
        loading: "Removing from collection...",
        success: () => {
          setIsFavourite(false);
          queryClient.invalidateQueries({
            queryKey: ["isFavourite", id, gallery],
          });
          queryClient.invalidateQueries({
            queryKey: ["collectionData", collectionId],
          });
          setIsRemovingFromFavourites(false);
          return "Removed from collection!";
        },
        error: (err) => {
          console.error("Error removing from collection:", err);
          setIsRemovingFromFavourites(false);
          return "Failed to remove from collection";
        },
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 3000,
          icon: "✅",
        },
        error: {
          duration: 3000,
          icon: "❌",
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Artwork Detailed</h1>

      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && <BackButton />}

      {(harvardLoad || clevelandLoad) && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}

      {(harvardError || clevelandError) && (
        <h1 className="mt-4">Error fetching Artwork</h1>
      )}

      {gallery === "harvard" && harvardArt && (
        <HarvardArtworkDisplay
          artwork={harvardArt}
          isFavourite={isFavourite}
          collectionData={collectionData}
          collectionLoading={collectionLoading}
          collectionError={!!collectionError}
          addToFavourites={handleAddToFavourites}
          removeFromFavourites={handleRemoveFromFavourites}
          isAddingToFavourites={isAddingToFavourites}
          isRemovingFromFavourites={isRemovingFromFavourites}
        />
      )}

      {gallery === "cleveland" && clevelandArt && (
        <ClevelandArtworkDisplay
          artwork={clevelandArt}
          isFavourite={isFavourite}
          collectionData={collectionData}
          collectionLoading={collectionLoading}
          collectionError={!!collectionError}
          addToFavourites={handleAddToFavourites}
          removeFromFavourites={handleRemoveFromFavourites}
          isAddingToFavourites={isAddingToFavourites}
          isRemovingFromFavourites={isRemovingFromFavourites}
        />
      )}

      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && <BackButton />}
    </div>
  );
};
