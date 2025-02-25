import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { getHarvardArt } from "./api-calls/harvardart/harvardart-calls";
import { useEffect, useState } from "react";
import { getClevelandArt } from "./api-calls/clevelandart/clevelandart-calls";

function App() {
  const [page, setPage] = useState(1);

  const {
    data: harvardAll,
    isLoading: harvardLoad,
    error: harvardError,
  } = useQuery({
    queryKey: ["harvardArt", page],
    queryFn: getHarvardArt,
  });

  const {
    data: clevelandAll,
    isLoading: clevelandLoad,
    error: clevelandError,
  } = useQuery({
    queryKey: ["clevelandArt", page],
    queryFn: () => getClevelandArt(page),
  });

  useEffect(() => {
    console.log(`Harvard:`, harvardAll?.data.records);
  }, [harvardAll]);

  useEffect(() => {
    console.log(`Cleveland:`, clevelandAll?.data.data);
  }, [clevelandAll]);

  return (
    <>
      <Layout>
        <h1>Hello</h1>
        {(harvardLoad || clevelandLoad) && <div>Loading...</div>}
        {(harvardError || clevelandError) && <div>Error loading art data</div>}
      </Layout>
    </>
  );
}

export default App;
