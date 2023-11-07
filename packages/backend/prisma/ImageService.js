import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ImageService {
  static async uploadImage({ imageUrl, postId }) {
    const result = await prisma.image.create({
      data: {
        imageUrl: imageUrl,
        postId: postId,
      },
    });
    return result;
  }
  static async deleteImage({ postId }) {
    const result = await prisma.image.deleteMany({
      where: {
        postId,
      },
    });
    return result;
  }
}
