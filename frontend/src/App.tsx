import "./index.css";
import { Layout } from "./components/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { Homepage } from "./components/homepage/Homepage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage/cleveland/1" />} />
          <Route path="/homepage/:gallery/:page" element={<Homepage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
