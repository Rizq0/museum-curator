import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

const basename = import.meta.env.DEV ? "/" : "/museum-curator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter basename={basename}>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>
);
