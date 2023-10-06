import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hook";
import { useNavigate } from "react-router";

import "./UserProfile.css";
import { useParams } from "react-router";
import { apiAxios } from "../../axios/apiAxios";
import { Posts } from "../posts/Posts";

interface User {
  login: string;
  id: number;
}

export const UserProfile: FC = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { id } = useParams();
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const navigate = useNavigate();
  if (userProfile?.id == user?.id) {
    navigate("/user");
  }

  useEffect(() => {
    const getUser = async () => {
      const defId = Number(id);
      const { data } = await apiAxios.post("/auth/getUser", { id: defId });
      setUserProfile(data);
    };
    getUser();
  }, []);

  return (
    <div className="user-profile">
      <div className="user">
        <div className="user-align">
          <div className="layout">
            <div className="profile">
              <img
                className="avatar"
                src={`http://localhost:5000/static/uploads/${
                  userProfile?.id
                }.png?${Date.now()}`}
              ></img>
              <h1>{userProfile?.login}</h1>
              <div className="user-info">
                <p>Подписчики:</p>
                <p>Подписки:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Posts authorId={Number(id)}></Posts>
    </div>
  );
};
