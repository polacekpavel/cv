import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import path from "path";
import chatRouter from "./src/routes/chat.route";

const app: Express = express();
const port = 8000;

const env = process.env["NODE_ENV"];
const isDevelopment = !env || env === "development";
const prodCorsOrigin = process.env["PROD_CORS_ORIGIN"];

if (isDevelopment) {
  console.warn("Running in development mode - allowing CORS for all origins");
  app.use(cors());
} else if (prodCorsOrigin) {
  console.log(
    `Running in production mode - allowing CORS for domain: ${prodCorsOrigin}`,
  );
  const corsOptions = {
    origin: prodCorsOrigin, // Restrict to production domain
  };
  app.use(cors(corsOptions));
} else {
  console.warn("Production CORS origin not set, defaulting to no CORS.");
}

app.use(express.json());

app.use(express.static("./src/static"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./src/static/index.html"));
});

app.use("/api/chat", chatRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
