import React, { FC, useState, useEffect, useMemo } from "react";
import { apiAxios } from "../../axios/apiAxios";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { Navigate } from "react-router";
import { registerUser } from "../../../store/userSlice";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../modal/Modal";
import { Button } from "../../ui/button/Button";
import "./Register.css";

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const regUser = async () => {
    const data = await dispatch(registerUser({ login, password }));
    if (!data.payload) {
      setInfo("Такой пользователь уже существует");
      setModal(!modal);
    }
  };
  const validation = () => {
    if (login.length >= 6 && password.length >= 6) {
      return regUser();
    } else {
      setInfo("Логин и пароль должны содержать не менее 6 символов");
      setModal(!modal);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <CSSTransition
          in={modal}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <Modal modal={modal} setModal={setModal} info={info}></Modal>
        </CSSTransition>
        <div className="fields-align">
          <h2>Регистрация</h2>

          <div className="fields-input">
            <input
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Логин"
            ></input>

            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            ></input>
          </div>

          <Button handleClick={validation} title="Зарегистрироваться"></Button>
        </div>
      </div>
    </div>
  );
};
