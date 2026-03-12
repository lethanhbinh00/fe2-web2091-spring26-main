import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "antd/dist/reset.css";
import Lab2 from "./pages/Lab2";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Lab2 />
    </BrowserRouter>
  </StrictMode>
);
