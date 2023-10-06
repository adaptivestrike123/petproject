import express from "express";
import { PostService } from "../prisma/PostService.js";
import { uploadPost } from "../utils/storage_middleware.js";
import { ImageService } from "../prisma/ImageService.js";

export const PostController = express.Router();

PostController.get("/", async (req, res) => {
  const data = await PostService.findAllPosts();

  const postsLikedField = PostService.addLikedField({
    likedPosts: req.user.likes,
    allPosts: data,
  });
  res.json(postsLikedField);
});

PostController.post("/byId", async (req, res) => {
  const { authorId } = req.body;

  const data = await PostService.findPostsByAuthorId({ authorId });

  const postsLikedField = PostService.addLikedField({
    likedPosts: req.user.likes,
    allPosts: data,
  });
  console.log(postsLikedField);
  res.json(postsLikedField);
});

PostController.post("/", uploadPost.array("file", 5), async (req, res) => {
  try {
    const { text } = req.body;

    const { id } = req.user;

    const data = await PostService.createPost({ text, authorId: id });
    await Promise.all(
      req.files.map(async (elem) => {
        const res = await ImageService.uploadImage({
          imageUrl: elem.originalname,
          postId: data.id,
        });
      })
    );
    return res.json(data);
  } catch (error) {
    console.log({ message: error.message });
  }
});
PostController.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const data = PostService.deletePost({ id });
    res.json(data);
  } catch (error) {
    console.log({ message: error.message });
  }
});
