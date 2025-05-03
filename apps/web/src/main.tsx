import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RootProvider from "./providers/index.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>
);
