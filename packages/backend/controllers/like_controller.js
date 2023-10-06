import express from "express";
import { UserService } from "../prisma/UserService.js";
import { LikeService } from "../prisma/LikeService.js";

const LikeController = express.Router();

LikeController.post("/", async (req, res) => {
  const { userId, postId } = req.body;
  const result = await LikeService.likePost({ userId, postId });
  res.json(result);
});
LikeController.post("/dislike", async (req, res) => {
  const { userId, postId } = req.body;
  const result = await LikeService.dislikePost({ userId, postId });
  res.json(result);
});

export default LikeController;
