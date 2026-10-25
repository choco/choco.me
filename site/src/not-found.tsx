import { hydrateRoot } from "react-dom/client";
import { NotFound } from "./NotFound";
import "./styles/main.css";

const root = document.getElementById("root");
if (!root) throw new Error("404.html has no #root");
hydrateRoot(root, <NotFound />);
