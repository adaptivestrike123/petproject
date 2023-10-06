import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CommentService {
  static async addComment({ authorId, postId, text, authorLogin }) {
    const data = await prisma.comment.create({
      data: {
        authorId,
        postId,
        text,
        authorLogin,
      },
    });

    return data;
  }
  static async deleteComment({ id }) {
    const data = await prisma.comment.delete({
      where: {
        id,
      },
    });
    return data;
  }
}
