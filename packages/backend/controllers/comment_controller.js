import express from "express";

import { CommentService } from "../prisma/CommentService.js";

const CommentController = express.Router();

CommentController.post("/", async (req, res) => {
  const { postId, text, authorId, authorLogin } = req.body;

  const result = await CommentService.addComment({
    authorId: authorId,
    authorLogin,
    postId,
    text,
    authorLogin: req.user.login,
  });
  res.json(result);
});
CommentController.post("/delete", async (req, res) => {
  const { id } = req.body;

  const data = await CommentService.deleteComment({ id });
  res.json(data);
});
export default CommentController;
