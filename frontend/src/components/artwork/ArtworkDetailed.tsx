import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHarvardArtById } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArtById } from "../../api-calls/clevelandart/clevelandart-calls";
import { LoaderIcon } from "lucide-react";
import { Button } from "../ui/button";
import { HarvardArtworkDisplay } from "../artwork/HarvardArtworkDisplay";
import { ClevelandArtworkDisplay } from "../artwork/ClevelandArtworkDisplay";
import {
  checkIfArtworkIsFavourited,
  fetchCollectionById,
} from "../../api-calls/backend/backend-calls";

export const ArtworkDetailed = () => {
  let { gallery, id } = useParams();
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

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
    if (isFavouriteData) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [isFavouriteData]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToFavourites = () => {
    console.log("Add to Favourites");
    setIsFavourite(true);
  };

  const handleRemoveFromFavourites = () => {
    console.log("Remove from Favourites");
    setIsFavourite(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Artwork Detailed</h1>

      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && (
        <div className="flex justify-start w-full">
          <Button
            className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0 cursor-pointer mt-4"
            onClick={handleBack}
          >
            BACK
          </Button>
        </div>
      )}

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
        />
      )}

      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && (
        <div className="flex justify-start w-full">
          <Button
            className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0 cursor-pointer mt-4"
            onClick={handleBack}
          >
            BACK
          </Button>
        </div>
      )}
    </div>
  );
};
