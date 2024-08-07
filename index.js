import express from "express";
import { Bootstrap } from "./src/bootstrap/Bootstrap.js";
import { v1Router } from "./src/routers/v1.router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the logbookImages directory
app.use("/public/files", express.static(path.join(__dirname, 'public/files')));

app.use("/api/v1/", v1Router);

Bootstrap(app);
