import express from "express";
import { UserService } from "../prisma/UserService.js";

const AuthController = express.Router();

AuthController.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const data = await UserService.authUser(login, password);

  res.json(data);
});
AuthController.post("/getUser", async (req, res) => {
  const { id } = req.body;

  const data = await UserService.findUserById({ id });

  res.json(data);
});
AuthController.post("/register", async (req, res) => {
  const { login, password } = await req.body;

  const data = await UserService.createUser(login, password);
  return res.json(data);
});
AuthController.post("/refresh", async (req, res) => {
  const { login } = req.body;
  const data = await UserService.findUserByLogin(login);
  res.json(data);
});
export default AuthController;
