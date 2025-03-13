import "./index.css";
import { Layout } from "./components/Layout";
import { ArtworkDetailed } from "./components/artwork/ArtworkDetailed";
import { Route, Routes, Navigate } from "react-router-dom";
import { Homepage } from "./components/homepage/Homepage";
import { CollectionHome } from "./components/collections/CollectionHome";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage/cleveland/1" />} />
          <Route path="/homepage/:gallery/:page" element={<Homepage />} />
          <Route path="/artwork/:gallery/:id" element={<ArtworkDetailed />} />
          <Route path="/collections" element={<CollectionHome />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
