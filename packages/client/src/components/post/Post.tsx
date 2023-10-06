import React, { FC, useEffect } from "react";
import "./Post.css";
import { apiAxios } from "../axios/apiAxios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { Carousel } from "../ui/carousel/Carousel";
import { IPost } from "../pages/posts/Posts";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import { Comments } from "../comments/Comments";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  post: IPost;
  deletePost: (id: number) => void;
}

export const Post: FC<Props> = ({ post, deletePost }) => {
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const userId = user?.id;
  const [currentPost, setCurrentPost] = useState(post);
  const [viewComment, setViewComment] = useState<boolean>(false);

  const updateLikes = async () => {
    await apiAxios.post(`/like${currentPost.liked ? `/dislike` : ``}`, {
      userId,
      postId: currentPost.id,
    });
    setCurrentPost({
      ...currentPost,
      liked: currentPost.liked ? false : true,
      likes: currentPost.liked ? currentPost.likes - 1 : currentPost.likes + 1,
    });
  };

  const addComment = async (postId: number, text: string) => {
    const { data } = await apiAxios.post("/comment", {
      postId,
      text,
      authorId: user?.id,
      authorLogin: user?.login,
    });
    setCurrentPost({
      ...currentPost,
      comments: [...currentPost.comments, data],
    });
  };

  const deleteComment = async (id: number) => {
    const { data } = await apiAxios.post("/comment/delete", { id });
    setCurrentPost({
      ...currentPost,
      comments: currentPost.comments.filter((elem) => elem.id != data.id),
    });
  };

  return (
    <div className="post">
      <div className="post-layout">
        <div className="post-align">
          {currentPost.authorId == user?.id && (
            <div
              className="post-delete"
              onClick={() => deletePost(currentPost.id)}
            >
              <ClearIcon className="post-delete-icon"></ClearIcon>
            </div>
          )}
          <div className="profile-bar">
            <Link to={`/profile/${currentPost.authorId}`}>
              <div className="profile-bar-wrapper">
                <img
                  className="profile-avatar"
                  src={`http://localhost:5000/static/uploads/${
                    currentPost.authorId
                  }.png?${Date.now()}`}
                ></img>
                <b>{currentPost.author.login}</b>
              </div>
            </Link>
          </div>

          <div className="post-content">
            <p>{currentPost.text}</p>
            {currentPost.images && (
              <Carousel images={currentPost.images}></Carousel>
            )}
          </div>
          <div className="interaction">
            <div className="interaction-wrapper">
              <div
                className="interaction-material-wrapper"
                onClick={updateLikes}
              >
                <FavoriteIcon
                  className={currentPost.liked ? `liked` : `notLiked`}
                  style={{ width: "23px", height: "23px" }}
                ></FavoriteIcon>
                <p>{currentPost.likes}</p>
              </div>
              <div
                className="interaction-material-wrapper"
                onClick={() => setViewComment(!viewComment)}
              >
                <CommentIcon
                  style={{ width: "23px", height: "23px" }}
                ></CommentIcon>
                <p>{currentPost.comments.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CSSTransition
        in={viewComment}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Comments
          key={currentPost.comments.length}
          comments={currentPost.comments}
          postId={currentPost.id}
          addComment={addComment}
          deleteComment={deleteComment}
        ></Comments>
      </CSSTransition>
    </div>
  );
};
