import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "antd/dist/reset.css";
import Lab3 from "./pages/Lab3";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Lab3 />
    </BrowserRouter>
  </StrictMode>
);
