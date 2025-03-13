import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHarvardArtById } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArtById } from "../../api-calls/clevelandart/clevelandart-calls";
import { LoaderIcon } from "lucide-react";
import { Button } from "../ui/button";
import NoImage from "../../assets/No-Image-Placeholder.svg";
import { IconHeartPlus, IconHeartMinus } from "@tabler/icons-react";
import { checkIfArtworkIsFavourited } from "../../api-calls/backend/backend-calls";

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
            onClick={() => handleBack()}
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
        <div className="bg-lbg-purple dark:bg-dbg-purple border-dbg-purple dark:border-lbg-purple overflow-hidden mt-4">
          {(harvardArt.data.primaryimageurl && (
            <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
              <img
                src={harvardArt.data.primaryimageurl}
                alt={harvardArt.data.title}
                className="max-h-[1080px] min-w-[341px] max-w-full object-contain"
              />
            </div>
          )) || (
            <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
              <img
                src={NoImage}
                alt={harvardArt.data.title}
                className="max-h-[1080px] min-w-[341px] max-w-full object-contain"
              />
            </div>
          )}

          <div className="p-6 bg-dbg-purple dark:bg-dheadline-white mt-4 rounded-2xl">
            <div className="flex flex-row justify-between flex-wrap">
              <h2 className="text-2xl font-bold text-dheadline-white dark:text-dbg-purple mb-4">
                {harvardArt.data.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {harvardArt.data.dated && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Date
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {harvardArt.data.dated}
                  </p>
                </div>
              )}

              {harvardArt.data.culture && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Culture
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {harvardArt.data.culture}
                  </p>
                </div>
              )}

              {harvardArt.data.classification && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Classification
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {harvardArt.data.classification}
                  </p>
                </div>
              )}

              {harvardArt.data.technique && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Technique
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {harvardArt.data.technique}
                  </p>
                </div>
              )}
              {harvardArt.data.period && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Period
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {harvardArt.data.period}
                  </p>
                </div>
              )}
              {harvardArt.data.copyright && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Copyright
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {harvardArt.data.copyright}
                  </p>
                </div>
              )}
            </div>

            {harvardArt.data.description && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                  Description
                </h3>
                <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                  {harvardArt.data.description}
                </p>
              </div>
            )}
            {!isFavourite ? (
              <div className="flex flex-row justify-center my-6">
                <IconHeartPlus
                  className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
                  height={48}
                  width={48}
                  onClick={() => handleAddToFavourites()}
                />
              </div>
            ) : (
              <div className="flex flex-row justify-center my-6">
                <IconHeartMinus
                  className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
                  height={48}
                  width={48}
                  onClick={() => handleRemoveFromFavourites()}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {gallery === "cleveland" && clevelandArt && (
        <div className="bg-lbg-purple dark:bg-dbg-purple border-dbg-purple dark:border-lbg-purple overflow-hidden mt-4">
          {(clevelandArt.data.data.images &&
            clevelandArt.data.data.images.web && (
              <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
                <img
                  src={clevelandArt.data.data.images.web.url}
                  alt={clevelandArt.data.data.title}
                  className="max-h-[1080px] min-w-[341px] max-w-full object-contain"
                />
              </div>
            )) || (
            <div className="relative bg-lbg-purple dark:bg-dbg-purple flex justify-center mt-4">
              <img
                src={NoImage}
                alt={clevelandArt.data.data.title}
                className="max-h-[1080px] min-w-[341px] max-w-full object-contain"
              />
            </div>
          )}

          <div className="p-6 bg-dbg-purple dark:bg-dheadline-white mt-4 rounded-2xl">
            <div className="flex flex-row justify-between flex-wrap">
              <h2 className="text-2xl font-bold text-dheadline-white dark:text-dbg-purple mb-4">
                {clevelandArt.data.data.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {clevelandArt.data.data.creation_date && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Date
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {clevelandArt.data.data.creation_date}
                  </p>
                </div>
              )}

              {clevelandArt.data.data.culture && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Culture
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {clevelandArt.data.data.culture[0]}
                  </p>
                </div>
              )}

              {clevelandArt.data.data.type && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Type
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {clevelandArt.data.data.type}
                  </p>
                </div>
              )}

              {clevelandArt.data.data.technique && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Technique
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {clevelandArt.data.data.technique}
                  </p>
                </div>
              )}
              {clevelandArt.data.data.copyright && (
                <div>
                  <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                    Copyright
                  </h3>
                  <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                    {clevelandArt.data.data.copyright}
                  </p>
                </div>
              )}
            </div>

            {clevelandArt.data.data.description && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-dheadline-white dark:text-dbg-purple">
                  Description
                </h3>
                <p className="mt-1 text-dheadline-white dark:text-dbg-purple">
                  {clevelandArt.data.data.description}
                </p>
              </div>
            )}
            {!isFavourite ? (
              <div className="flex flex-row justify-center my-6">
                <IconHeartPlus
                  className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
                  height={48}
                  width={48}
                  onClick={() => handleAddToFavourites()}
                />
              </div>
            ) : (
              <div className="flex flex-row justify-center my-6">
                <IconHeartMinus
                  className="cursor-pointer hover:text-dbuttonbg-pink text-dheadline-white dark:text-dbg-purple"
                  height={48}
                  width={48}
                  onClick={() => handleRemoveFromFavourites()}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && (
        <div className="flex justify-start w-full">
          <Button
            className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0 cursor-pointer mt-4"
            onClick={() => handleBack()}
          >
            BACK
          </Button>
        </div>
      )}
    </div>
  );
};
