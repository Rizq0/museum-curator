import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getHarvardArt } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArt } from "../../api-calls/clevelandart/clevelandart-calls";

export const Homepage = () => {
  let { page, gallery } = useParams();
  const [artwork, setArtwork] = useState([]);

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

  return (
    <div>
      {(harvardLoad || clevelandLoad) && <h1>Loading...</h1>}
      {(harvardError || clevelandError) && <h1>Error fetching Artwork</h1>}
      {gallery === "harvard" && harvardAll && <h1>Harvard Data Fetched</h1>}
      {gallery === "cleveland" && clevelandAll && (
        <h1>Cleveland Data Fetched</h1>
      )}
    </div>
  );
};
