import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { getHarvardArt } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArt } from "../../api-calls/clevelandart/clevelandart-calls";

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
    <div>
      {(harvardLoad || clevelandLoad) && <h1>Loading...</h1>}
      {(harvardError || clevelandError) && <h1>Error fetching Artwork</h1>}
      {gallery === "harvard" && harvardAll && (
        <div>
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
        <div>
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
      <div>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage}>Next Page</Button>
      </div>
    </div>
  );
};
