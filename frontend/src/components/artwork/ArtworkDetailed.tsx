import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHarvardArtById } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArtById } from "../../api-calls/clevelandart/clevelandart-calls";
import { LoaderIcon } from "lucide-react";
import { Button } from "../ui/button";

export const ArtworkDetailed = () => {
  let { gallery, id } = useParams();
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log(harvardArt);
    console.log(clevelandArt);
  }, [harvardArt, clevelandArt]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Artwork Detailed</h1>
      <div className="flex justify-start w-full">
        <Button
          className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0 cursor-pointer mt-4"
          onClick={() => handleBack()}
        >
          BACK
        </Button>
      </div>

      {(harvardLoad || clevelandLoad) && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}
      {(harvardError || clevelandError) && (
        <h1 className="mt-4">Error fetching Artwork</h1>
      )}
      {gallery === "harvard" && harvardArt && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-4">
          {harvardArt.data.primaryimageurl && (
            <div className="relative bg-gray-100 flex justify-center">
              <img
                src={harvardArt.data.primaryimageurl}
                alt={harvardArt.data.title}
                className="max-h-[400px]"
              />
            </div>
          )}

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {harvardArt.data.title}
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {harvardArt.data.dated && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-gray-500">{harvardArt.data.dated}</p>
                </div>
              )}

              {harvardArt.data.culture && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Culture</h3>
                  <p className="mt-1 text-gray-500">
                    {harvardArt.data.culture}
                  </p>
                </div>
              )}

              {harvardArt.data.classification && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Classification
                  </h3>
                  <p className="mt-1 text-gray-500">
                    {harvardArt.data.classification}
                  </p>
                </div>
              )}

              {harvardArt.data.technique && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Technique
                  </h3>
                  <p className="mt-1 text-gray-500">
                    {harvardArt.data.technique}
                  </p>
                </div>
              )}
            </div>

            {harvardArt.data.description && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-gray-700">
                  {harvardArt.data.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {gallery === "cleveland" && clevelandArt && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-4">
          {clevelandArt.data.data.images &&
            clevelandArt.data.data.images.web && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img
                  src={clevelandArt.data.data.images.web.url}
                  alt={clevelandArt.data.data.title}
                  className="object-contain w-full h-full"
                />
              </div>
            )}

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {clevelandArt.data.data.title}
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {clevelandArt.data.data.creation_date && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-gray-500">
                    {clevelandArt.data.data.creation_date}
                  </p>
                </div>
              )}

              {clevelandArt.data.data.culture && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Culture</h3>
                  <p className="mt-1 text-gray-500">
                    {clevelandArt.data.data.culture[0]}
                  </p>
                </div>
              )}

              {clevelandArt.data.data.type && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="mt-1 text-gray-500">
                    {clevelandArt.data.data.type}
                  </p>
                </div>
              )}

              {clevelandArt.data.data.technique && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Technique
                  </h3>
                  <p className="mt-1 text-gray-500">
                    {clevelandArt.data.data.technique}
                  </p>
                </div>
              )}
            </div>

            {clevelandArt.data.data.description && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-gray-700">
                  {clevelandArt.data.data.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-start w-full">
        <Button
          className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0 cursor-pointer mt-4"
          onClick={() => handleBack()}
        >
          BACK
        </Button>
      </div>
    </div>
  );
};
