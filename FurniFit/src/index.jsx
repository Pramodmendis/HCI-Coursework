import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css"; // Tailwind entry

const root = createRoot(document.getElementById("root"));
root.render(<App />);
