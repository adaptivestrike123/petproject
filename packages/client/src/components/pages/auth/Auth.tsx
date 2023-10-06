import React, { FC, useState } from "react";
import { apiAxios } from "../../axios/apiAxios";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { fetchUser } from "../../../store/userSlice";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../modal/Modal";
import { Button } from "../../ui/button/Button";
import "./Auth.css";

export const Auth: FC = () => {
  const user = useAppSelector((state) => state.persist.userSlice.user);

  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modal, setModal] = useState<false | true>(false);

  const authUser = async () => {
    const data = await dispatch(fetchUser({ login, password }));
    if (!data.payload) {
      setModal(!modal);
    }
  };

  return (
    <div className="auth">
      <CSSTransition in={modal} timeout={300} classNames="modal" unmountOnExit>
        <Modal
          modal={modal}
          setModal={setModal}
          info="Неправильный логин или пароль"
        ></Modal>
      </CSSTransition>
      <div className="fields-align">
        <h2>Войти</h2>

        <div className="fields-input">
          <input
            type="text"
            placeholder="Логин"
            onChange={(e) => setLogin(e.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <Button handleClick={authUser} title="Войти" />
      </div>
    </div>
  );
};
