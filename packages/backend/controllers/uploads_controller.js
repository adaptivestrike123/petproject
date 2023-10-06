import express from "express";

import { PostService } from "../prisma/PostService.js";
import { upload } from "../utils/storage_middleware.js";

export const UploadsController = express.Router();

UploadsController.post("/avatar", upload.single(`file`), async (req, res) => {
  console.log(req.file);
  res.json({
    message: "Фотография успешно загружена",
  });
});
