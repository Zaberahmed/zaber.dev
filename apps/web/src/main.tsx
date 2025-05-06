import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RootProvider from "./providers/index.tsx";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RootProvider>
        <App />
      </RootProvider>
    </ErrorBoundary>
  </StrictMode>
);
