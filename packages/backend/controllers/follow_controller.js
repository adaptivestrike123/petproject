import express from "express";
import { FollowService } from "../prisma/FollowService.js";

const FollowController = express.Router();

FollowController.post("/subscribe", async (req, res) => {
  const { subscriberId, subscriptionId, subscriberLogin, subscriptionLogin } =
    req.body;
  const result = await FollowService.subscribe({
    subscriberId,
    subscriptionId,
    subscriptionLogin,
    subscriberLogin,
  });
  res.json(result);
});
FollowController.post("/unsubscribe", async (req, res) => {
  const { subscriberId, subscriptionId } = req.body;
  const result = await FollowService.unsubscribe({
    subscriberId,
    subscriptionId,
  });
  res.json(result);
});
FollowController.post("/getSubscribersById", async (req, res) => {
  const { id } = req.body;
  const result = await FollowService.findSubscribersById({ id });
  res.json(result);
});
FollowController.post("/getSubscriptionsById", async (req, res) => {
  const { id } = req.body;
  const result = await FollowService.findSubscriptionsById({ id });
  res.json(result);
});
export default FollowController;
