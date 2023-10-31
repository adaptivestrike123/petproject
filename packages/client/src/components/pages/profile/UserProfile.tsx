import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hook";
import { useNavigate } from "react-router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import "./UserProfile.css";
import { useParams } from "react-router";
import { apiAxios } from "../../axios/apiAxios";
import { Posts } from "../posts/Posts";
import { CSSTransition } from "react-transition-group";
import { Follow } from "../../follow/Follow";

interface User {
  login: string;
  id: number;
  subscribers: Subscriber[];
  subscriptions: Subscription[];
}
interface Subscriber {
  id?: number;
  subscriberId: number | undefined;
  subscriptionId: number | undefined;
  subscriberLogin: string;
}
interface Subscription {
  id?: number;
  subscriberId: number | undefined;
  subscriptionId: number | undefined;
}

export const UserProfile: FC = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { id } = useParams();
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const [modalSubscribers, setModalSubscribers] = useState<boolean>(false);
  const [modalSubscriptions, setModalSubscriptions] = useState<boolean>(false);
  const [navigateCounter, setNavigateCounter] = useState<number>(0);

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
    setModalSubscribers(false);
    setModalSubscriptions(false);
    setNavigateCounter(navigateCounter + 1);
  }, [id]);

  const subscribe = async () => {
    await apiAxios.post("/follow/subscribe", {
      subscriberId: user?.id,
      subscriptionId: userProfile?.id,
      subscriberLogin: user?.login,
      subscriptionLogin: userProfile?.login,
    });

    setUserProfile({
      ...userProfile!,
      subscribers: [
        ...userProfile!.subscribers,
        {
          subscriberId: user?.id,
          subscriptionId: userProfile?.id,
          subscriberLogin: user!.login,
        },
      ],
    });
  };

  const unsubscribe = async () => {
    const { data } = await apiAxios.post("/follow/unsubscribe", {
      subscriberId: user?.id,
      subscriptionId: userProfile?.id,
    });
    setUserProfile({
      ...userProfile!,
      subscribers: userProfile!.subscribers.filter(
        (elem) => elem.subscriberId != user?.id
      ),
    });
  };

  return (
    <div className="user-profile">
      <CSSTransition
        in={modalSubscribers}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Follow
          user={userProfile!}
          modal={modalSubscribers}
          setModal={setModalSubscribers}
          option="subscribers"
        ></Follow>
      </CSSTransition>
      <CSSTransition
        in={modalSubscriptions}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Follow
          user={userProfile!}
          modal={modalSubscriptions}
          setModal={setModalSubscriptions}
          option="subscriptions"
        ></Follow>
      </CSSTransition>
      <div className="user">
        <div className="user-align">
          <div className="layout">
            <div className="profile">
              <img
                className="avatar"
                src={`http://localhost:5000/static/uploads/${
                  userProfile?.id
                }.png?${Date.now()}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "http://localhost:5000/static/uploads/empty-photo.png";
                }}
              ></img>
              <h1>{userProfile?.login}</h1>
              {userProfile?.subscribers?.find(
                (elem) => elem.subscriberId == user?.id
              ) ? (
                <div className="follow" onClick={() => unsubscribe()}>
                  <HowToRegIcon
                    style={{ width: "35px", height: "35px" }}
                  ></HowToRegIcon>
                </div>
              ) : (
                <div className="follow" onClick={() => subscribe()}>
                  <PersonAddIcon
                    style={{
                      width: "35px",
                      height: "35px",
                      transform: "scaleX(-1)",
                    }}
                  ></PersonAddIcon>
                </div>
              )}
              <div className="user-info">
                <p onClick={() => setModalSubscribers(!modalSubscribers)}>
                  Подписчики:{" "}
                  <b>
                    {userProfile?.subscribers
                      ? userProfile.subscribers.length
                      : 0}
                  </b>
                </p>
                <p onClick={() => setModalSubscriptions(!modalSubscriptions)}>
                  Подписки:{" "}
                  <b>
                    {userProfile?.subscriptions
                      ? userProfile.subscriptions.length
                      : 0}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Posts authorId={Number(id)} navigateCounter={navigateCounter}></Posts>
    </div>
  );
};
