import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class PostService {
  static async findPostsByAuthorId({ authorId }) {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        images: true,
        author: {
          select: {
            login: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
    return posts.map((elem) => ({
      ...elem,
      likes: elem.likes.length,
    }));
  }
  static async findAllPosts() {
    const posts = await prisma.post.findMany({
      include: {
        images: true,
        author: {
          select: {
            login: true,
          },
        },
        comments: {
          orderBy: {
            id: "desc",
          },
        },
        likes: true,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });

    return posts.map((elem) => ({ ...elem, likes: elem.likes.length }));
  }
  static addLikedField({ likedPosts, allPosts }) {
    const likedPostsMap = {};
    likedPosts.map((elem) => (likedPostsMap[elem.postId] = true));

    const res = allPosts.map((elem) => ({
      ...elem,
      liked: likedPostsMap[elem.id] ? true : false,
    }));

    return res;
  }
  static async createPost({ text, authorId }) {
    try {
      const result = await prisma.post.create({
        data: {
          text,
          authorId,
          createdAt: `${new Date().getDate()}.${
            new Date().getMonth() + 1
          }.${new Date().getFullYear()}`,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async deletePost({ id }) {
    try {
      const result = await prisma.post.delete({
        where: {
          id,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}
