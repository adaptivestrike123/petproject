import React, { FC } from "react";
import "./Comments.css";
import { Scrollbar } from "react-scrollbars-custom";
import { useState } from "react";
import { useAppSelector } from "../../store/hook";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "../ui/button/Button";
import { apiAxios } from "../axios/apiAxios";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

interface Props {
  comments: Comments[];
  postId: number;
  addComment: any;
  deleteComment: any;
  key: number;
  handleDeleteAuthor: boolean;
}
interface Comments {
  id: number;
  text: string;
  authorId: number;
  authorLogin: string;
  createdAt: string;
}

export const Comments: FC<Props> = ({
  comments,
  postId,
  addComment,
  deleteComment,
  handleDeleteAuthor,
}) => {
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const [text, setText] = useState<string>("");
  return (
    <div className="comments">
      <div className="comments-layout">
        <div className="comment-input">
          <img
            className="profile-avatar"
            src={`http://localhost:5000/static/uploads/${
              user?.id
            }.png?${Date.now()}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "http://localhost:5000/static/uploads/empty-photo.png";
            }}
          ></img>
          <input
            placeholder="Написать комментарий..."
            onChange={(e) => setText(e.target.value)}
          ></input>
          <Button
            disabled={text.length > 0 ? false : true}
            handleClick={() => addComment(postId, text)}
            title={<SendIcon></SendIcon>}
          ></Button>
        </div>
        {comments?.map((elem) => (
          <div className="comment-wrapper">
            <div className="comment-image-wrapper">
              <Link to={`/profile/${elem.authorId}`}>
                <img
                  src={`http://localhost:5000/static/uploads/${
                    elem.authorId
                  }.png?${Date.now()}`}
                  className="profile-avatar"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "http://localhost:5000/static/uploads/empty-photo.png";
                  }}
                ></img>
              </Link>
            </div>

            <div className="comment-info">
              <Link to={`/profile/${elem.authorId}`}>
                <b>{elem.authorLogin}:</b>
              </Link>
              <p>{elem.text}</p>
              <p className="comment-info-p">
                <p>{elem.createdAt}</p>
              </p>
            </div>
            {user?.id == elem.authorId || handleDeleteAuthor ? (
              <div
                className="comment-delete"
                onClick={() => deleteComment(elem.id)}
              >
                <ClearIcon
                  className="comment-delete-icon"
                  style={{ width: "20px", height: "20px" }}
                ></ClearIcon>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
