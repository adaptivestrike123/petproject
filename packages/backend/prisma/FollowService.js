import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class FollowService {
  static async subscribe({
    subscriberId,
    subscriptionId,
    subscriberLogin,
    subscriptionLogin,
  }) {
    const data = await prisma.follow.create({
      data: {
        subscriberId,
        subscriptionId,
        subscriptionLogin,
        subscriberLogin,
      },
    });
    return data;
  }
  static async unsubscribe({ subscriberId, subscriptionId }) {
    const data = await prisma.follow.deleteMany({
      where: {
        subscriberId,
        subscriptionId,
      },
    });
    return data;
  }
  static async findSubscribersById({ id }) {
    const data = await prisma.follow.findMany({
      where: {
        subscriptionId: id,
      },
    });
    return data;
  }
  static async findSubscriptionsById({ id }) {
    const data = await prisma.follow.findMany({
      where: {
        subscriberId: id,
      },
    });
    return data;
  }
}
