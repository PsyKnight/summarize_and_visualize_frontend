import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { InputProvider } from "./context/InputContext.tsx";

createRoot(document.getElementById("root")!).render(
  <InputProvider>
    <App />
  </InputProvider>,
);
