import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class LikeService {
  static async likePost({ userId, postId }) {
    const data = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    return data;
  }
  static async dislikePost({ userId, postId }) {
    const data = await prisma.like.deleteMany({
      where: {
        userId,
        postId,
      },
    });
    return data;
  }
}
