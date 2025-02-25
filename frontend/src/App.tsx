import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { getHarvardArt } from "./api-calls/harvardart/harvardart-calls";
import { useEffect } from "react";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["harvardArt"],
    queryFn: getHarvardArt,
  });

  useEffect(() => {
    console.log(data?.data.records);
  }, [data]);

  return (
    <>
      <Layout>
        <h1>Hello</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading art data</div>}
      </Layout>
    </>
  );
}

export default App;
