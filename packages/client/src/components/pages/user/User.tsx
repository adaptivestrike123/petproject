import React, {
  FC,
  MutableRefObject,
  useRef,
  useState,
  useEffect,
} from "react";

import { useAppSelector, useAppDispatch } from "../../../store/hook";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { apiAxios } from "../../axios/apiAxios";
import "./User.css";
import { updateAvatar } from "../../../store/userSlice";
import { Posts } from "../posts/Posts";
import { CSSTransition } from "react-transition-group";
import { CreatePost } from "../../createPost/CreatePost";

export const User: FC = ({}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [createdPostCount, setCreatedPostCount] = useState<number>(0);

  useEffect(() => {
    dispatch(
      updateAvatar(`http://localhost:5000/static/uploads/${user?.id}.png`)
    );
  }, []);

  const avatar = useRef() as MutableRefObject<HTMLInputElement>;

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    await apiAxios.post("/uploads/avatar", formData);

    dispatch(
      updateAvatar(
        `http://localhost:5000/static/uploads/${user?.id}.png?${Date.now()}`
      )
    );
  };
  const handleCreatePost = async (formData: FormData) => {
    const { data } = await apiAxios.post("/post", formData);
    setIsModalOpen(!isModalOpen);
    setCreatedPostCount(createdPostCount + 1);
  };

  return (
    <div className="user">
      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <CreatePost
          setModal={setIsModalOpen}
          modal={isModalOpen}
          handleCreatePost={handleCreatePost}
        ></CreatePost>
      </CSSTransition>
      <div className="user-align">
        <div className="layout">
          <div className="profile">
            <img
              className="avatar"
              src={user?.avatarUrl}
              onClick={() => avatar.current.click()}
            ></img>

            <h1>{user?.login}</h1>
            <input
              className="input-avatar"
              type="file"
              ref={avatar}
              onChange={(e) => upload(e)}
              hidden
            ></input>
            <div className="user-info">
              <p>Подписчики:</p>
              <p>Подписки:</p>
            </div>
            <div
              className="user-create-post"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <AddBoxOutlinedIcon
                style={{ width: "38px", height: "38px" }}
              ></AddBoxOutlinedIcon>
            </div>
          </div>
        </div>
        <Posts authorId={user?.id} createdPostCount={createdPostCount}></Posts>
      </div>
    </div>
  );
};
