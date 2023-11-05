import React, { FC, useEffect, useState } from "react";

import "./Follow.css";

import { User } from "../../store/userSlice";

import { Link } from "react-router-dom";

interface Props {
  modal: boolean;
  setModal: (modal: boolean) => void;
  option: string;
  user: User | any;
}

export const Follow: FC<Props> = ({ modal, setModal, option, user }) => {
  return (
    <div className="followers" onClick={() => setModal(!modal)}>
      <div className="followers-layout" onClick={(e) => e.stopPropagation()}>
        {user[option].length >= 1 ? (
          user![option as keyof User].map((elem: any) => (
            <Link
              to={`/profile/${
                elem[option.substring(0, option.length - 1) + `Id`]
              }`}
            >
              <div className="followers-item">
                <img
                  className="profile-avatar"
                  src={`http://localhost:5000/static/uploads/${
                    elem[option.substring(0, option.length - 1) + `Id`]
                  }.png?${Date.now()}`}
                ></img>
                <b>{elem[option.substring(0, option.length - 1) + `Login`]}</b>
              </div>
            </Link>
          ))
        ) : (
          <p>Здесь пусто!</p>
        )}
      </div>
    </div>
  );
};
