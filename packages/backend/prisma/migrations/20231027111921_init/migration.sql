-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_subscriberId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_subscriptionId_fkey";

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
