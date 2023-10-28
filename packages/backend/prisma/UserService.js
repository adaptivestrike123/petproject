import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class UserService {
  static async findUserById({ id }) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        likes: true,
        posts: true,
        subscribers: true,
        subscriptions: true,
      },
    });

    return user;
  }

  static async authUser(login, password) {
    const user = await this.findUserByLogin(login);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign(
          {
            id: user.id,
          },
          `someone`,
          { expiresIn: `30d` }
        );

        return {
          ...user,
          token,
        };
      } else {
        return "Неправильный логин или пароль";
      }
    } else {
      return "Неправильный логин или пароль";
    }
  }

  static async findUserByLogin(login) {
    const user = await prisma.user.findFirst({
      where: {
        login,
      },
      include: {
        posts: true,
        likes: true,
        subscribers: true,
        subscriptions: true,
      },
    });
    return user;
  }

  static async createUser(login, password) {
    const candidate = await UserService.findUserByLogin(login);
    if (candidate) {
      return "Пользователь уже существует";
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const result = await prisma.user.create({
        data: {
          login,
          password: hash,
        },
      });
      const { id } = result;

      const token = jwt.sign(
        {
          id,
        },
        `someone`,
        { expiresIn: `30d` }
      );

      return { login, id, token };
    }
  }
}
