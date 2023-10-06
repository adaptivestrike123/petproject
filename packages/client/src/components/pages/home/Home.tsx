import React, { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";
import { User } from "../user/User";
import "./Home.css";

export const Home: FC = () => {
  return (
    <div className="home">
      <div className="home-layout">
        <Link to={"/login"}>Войти</Link>

        <Link to={"/register"}>Регистрация</Link>
      </div>
    </div>
  );
};
