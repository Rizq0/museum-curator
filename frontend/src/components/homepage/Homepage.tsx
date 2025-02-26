import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getHarvardArt } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArt } from "../../api-calls/clevelandart/clevelandart-calls";
import { PageControls } from "../utility/PageControls";
import { LoaderIcon } from "lucide-react";

export const Homepage = () => {
  let { page, gallery } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [currentGallery, setCurrentGallery] = useState(gallery);

  useEffect(() => {
    navigate(`/homepage/${currentGallery}/${currentPage}`);
  }, [currentPage, currentGallery]);

  const {
    data: harvardAll,
    isLoading: harvardLoad,
    error: harvardError,
  } = useQuery({
    queryKey: ["harvardArt", page],
    queryFn: () => getHarvardArt(Number(page)),
    enabled: gallery === "harvard",
  });

  const {
    data: clevelandAll,
    isLoading: clevelandLoad,
    error: clevelandError,
  } = useQuery({
    queryKey: ["clevelandArt", page],
    queryFn: () => getClevelandArt(Number(page)),
    enabled: gallery === "cleveland",
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="flex flex-col items-center">
      <PageControls
        previous={handlePreviousPage}
        next={handleNextPage}
        setCurrentGallery={setCurrentGallery}
        currentPage={currentPage}
      />
      {(harvardLoad || clevelandLoad) && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}
      {(harvardError || clevelandError) && (
        <h1 className="mt-4">Error fetching Artwork</h1>
      )}
      {gallery === "harvard" && harvardAll && (
        <div className="mt-4">
          <ul>
            {harvardAll.data.records.map((art: any) => (
              <li key={art.id}>
                {art.title}
                {art.id}
              </li>
            ))}
          </ul>
        </div>
      )}

      {gallery === "cleveland" && clevelandAll && (
        <div className="mt-4">
          <ul>
            {clevelandAll.data.data.map((art: any) => (
              <li key={art.id}>
                {art.title}
                {art.id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
