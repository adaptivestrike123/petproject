import React, { FC } from "react";
import "./Comments.css";
import { Scrollbar } from "react-scrollbars-custom";
import { useState } from "react";
import { useAppSelector } from "../../store/hook";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "../ui/button/Button";
import { apiAxios } from "../axios/apiAxios";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  comments: Comments[];
  postId: number;
  addComment: any;
  deleteComment: any;
  key: number;
}
interface Comments {
  id: number;
  text: string;
  authorId: number;
  authorLogin: string;
}

export const Comments: FC<Props> = ({
  comments,
  postId,
  addComment,
  deleteComment,
}) => {
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const [text, setText] = useState<string>("");

  return (
    <div className="comments">
      <div className="comments-layout">
        <div className="comment-input">
          <img
            className="profile-avatar"
            src={`http://localhost:5000/static/uploads/${user?.id}.png`}
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
              <img
                src={`http://localhost:5000/static/uploads/${elem.authorId}.png`}
                className="profile-avatar"
              ></img>
            </div>

            <div className="comment-info">
              <b>{elem.authorLogin}:</b>
              <p>{elem.text}</p>
            </div>
            {user?.id == elem.authorId ? (
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