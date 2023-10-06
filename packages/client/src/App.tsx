import React, { FC, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CSSTransition } from "react-transition-group";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Auth } from "./components/pages/auth/Auth";
import { Register } from "./components/pages/register/Register";
import { Home } from "./components/pages/home/Home";
import { User } from "./components/pages/user/User";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { clear } from "./store/userSlice";
import { Posts } from "./components/pages/posts/Posts";
import { UserProfile } from "./components/pages/profile/UserProfile";

const App: FC = () => {
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (pathname == "/login" || pathname == "/register" || pathname == "/") {
        navigate("/user");
      }
    }
    if (!user) {
      if (pathname == "/login" || pathname == "/register") {
      } else {
        navigate("/");
      }
    }
  }, [user, pathname]);

  const exit = () => {
    dispatch(clear());
    setModal(!modal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <div className="navbar">
        <div className="container">
          <div className="navbar-align">
            <Link to={"/posts"}>
              <div className="logo">
                <h2>Parallax</h2>
              </div>
            </Link>
            {user && (
              <div
                className={modal ? `widget-active` : `widget`}
                onClick={() => setModal(!modal)}
              >
                <div className="widget-wrapper">
                  <img
                    className="widget-avatar"
                    src={user ? user.avatarUrl : undefined}
                    alt=""
                  ></img>

                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                </div>
                <CSSTransition
                  in={modal}
                  timeout={300}
                  classNames="modal"
                  unmountOnExit
                >
                  <div className="widget-modal">
                    <Link to={"/user"} className="page">
                      Профиль
                    </Link>
                    <p className="exit" onClick={() => exit()}>
                      Выход
                    </p>
                  </div>
                </CSSTransition>
              </div>
            )}
          </div>
        </div>
      </div>

      <Routes>
        <Route
          path="/user"
          element={
            <div className="container">
              <User></User>
            </div>
          }
        ></Route>
        <Route
          path="/"
          element={
            <div className="container">
              <Home></Home>
            </div>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <div className="container">
              <Auth></Auth>
            </div>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <div className="container">
              <Register></Register>
            </div>
          }
        ></Route>
        <Route
          path="/posts/*"
          element={
            <div className="container">
              <Posts></Posts>
            </div>
          }
        ></Route>
        <Route
          path="/profile/:id"
          element={
            <div className="container">
              <UserProfile></UserProfile>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
