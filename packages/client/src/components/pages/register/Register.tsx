import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useRef,
  MutableRefObject,
} from "react";
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
    console.log(localStorage.getItem("token"));
    const data = await dispatch(registerUser({ login, password }));
    if (!data.payload) {
      setInfo("Такой пользователь уже существует");
      setModal(!modal);
    }
  };
  const validation = () => {
    if (login.length >= 3 && password.length >= 6) {
      return regUser();
    }
    if (password.length < 6) {
      setInfo("Пароль должен содержать не менее 6 символов");
      setModal(!modal);
    }
    if (login.length < 3) {
      setInfo("Логин должен содержать не менее 3 символов");
      setModal(!modal);
    }
  };
  {
    console.log(localStorage.getItem("token"));
  }
  return (
    <div className="register">
      <div className="container">
        <CSSTransition
          in={modal}
          timeout={300}
          classNames="modal"
          unmountOnExit
          title="Ошибка"
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
              type="password"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          <Button handleClick={validation} title="Зарегистрироваться"></Button>
        </div>
      </div>
    </div>
  );
};
