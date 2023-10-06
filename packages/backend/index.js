import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { checkAuth } from "./utils/checkAuth.js";

import router from "./controllers/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(checkAuth);
app.use("/static", express.static("static"));
app.use("/uploads", express.static("uploads"));
app.use("/uploadsPost", express.static("post_images"));

app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
