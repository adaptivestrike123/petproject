import express from "express";
import { upload } from "../utils/storage_middleware.js";

export const UploadsController = express.Router();

UploadsController.post("/avatar", upload.single(`file`), async (req, res) => {
  console.log(req.body.id);
  res.json({
    message: "Фотография успешно загружена",
  });
});
