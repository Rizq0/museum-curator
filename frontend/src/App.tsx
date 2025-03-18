import "./index.css";
import { Layout } from "./components/Layout";
import { ArtworkDetailed } from "./components/artwork/ArtworkDetailed";
import { Route, Routes, Navigate } from "react-router-dom";
import { Homepage } from "./components/homepage/Homepage";
import { Toaster } from "react-hot-toast";
import { CollectionHome } from "./components/collections/CollectionHome";
import { CollectionDetailed } from "./components/collections/CollectionDetailed";
import { NotFoundPage } from "./components/error/Errors";

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage/cleveland/1" />} />
          <Route path="/homepage/:gallery/:page" element={<Homepage />} />
          <Route path="/artwork/:gallery/:id" element={<ArtworkDetailed />} />
          <Route path="/collections" element={<CollectionHome />} />
          <Route
            path="/collection/:collection"
            element={<CollectionDetailed />}
          />
          <Route path="*" element={<NotFoundPage className="mt-16 mb-16" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
