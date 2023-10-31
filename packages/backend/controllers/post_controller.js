import express from "express";
import { PostService } from "../prisma/PostService.js";
import { uploadPost } from "../utils/storage_middleware.js";
import { ImageService } from "../prisma/ImageService.js";

export const PostController = express.Router();

PostController.get("/", async (req, res) => {
  const data = await PostService.findAllPosts();
  console.log(req.headers.authorization);
  if (req.user) {
    const postsLikedField = PostService.addLikedField({
      likedPosts: req.user.likes,
      allPosts: data,
    });
    res.json(postsLikedField);
  } else {
    res.json(data);
  }
});

PostController.post("/byId", async (req, res) => {
  try {
    const { authorId } = req.body;

    const data = await PostService.findPostsByAuthorId({ authorId });

    if (req.user.likes) {
      const postsLikedField = PostService.addLikedField({
        likedPosts: req.user.likes,
        allPosts: data,
      });
      res.json(postsLikedField);
    } else {
      res.json(data);
    }
  } catch (error) {
    res.json({ message: error });
  }
});

PostController.post("/", uploadPost.array("file", 5), async (req, res) => {
  try {
    const { text, id } = req.body;
    const defId = Number(id);

    const data = await PostService.createPost({ text, authorId: defId });
    console.log(req.files);
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
    console.log(id);
    const data = PostService.deletePost({ id });
    res.json(data);
  } catch (error) {
    console.log({ message: error.message });
  }
});
