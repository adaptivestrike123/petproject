import React, { FC, useEffect } from "react";
import "./Post.css";
import { apiAxios } from "../axios/apiAxios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../store/hook";
import CircleIcon from "@mui/icons-material/Circle";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { Carousel } from "../ui/carousel/Carousel";
import { IPost } from "../pages/posts/Posts";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import { Comments } from "../comments/Comments";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CreatePost } from "../createPost/CreatePost";
import { EditPost } from "../editPost/EditPost";

interface Props {
  post: IPost;
  deletePost: (id: number) => void;
}

export const Post: FC<Props> = ({ post, deletePost }) => {
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const userId = user?.id;
  const [currentPost, setCurrentPost] = useState(post);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [editPostModal, setEditPostModal] = useState<boolean>(false);

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
      comments: [data, ...currentPost.comments],
    });
  };

  const deleteComment = async (id: number) => {
    const { data } = await apiAxios.post("/comment/delete", { id });
    setCurrentPost({
      ...currentPost,
      comments: currentPost.comments.filter((elem) => elem.id != data.id),
    });
  };
  const handleEditPost = async (formData: FormData) => {
    const { data } = await apiAxios.patch("/post", formData);
    setCurrentPost({ ...currentPost, images: data.images, text: data.text });
    {
      console.log(data);
    }
    setEditPostModal(!editPostModal);
  };
  return (
    <div className="post">
      <div className="post-layout">
        <div className="post-align">
          {currentPost.authorId == user?.id && (
            <div
              className={modalConfirm ? `post-delete-active` : `post-delete`}
              onMouseEnter={() => setModalConfirm(true)}
              onMouseLeave={() => setModalConfirm(false)}
            >
              <MoreVertIcon className="post-delete-icon"></MoreVertIcon>
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
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "http://localhost:5000/static/uploads/empty-photo.png";
                  }}
                ></img>
                <div className="post-info">
                  <b>{currentPost.author.login}</b>
                  <p>{currentPost.createdAt}</p>
                </div>
              </div>
            </Link>
          </div>
          <CSSTransition
            in={modalConfirm}
            timeout={300}
            classNames="modal-widget"
            unmountOnExit
          >
            <div
              className={`options`}
              onMouseEnter={() => setModalConfirm(true)}
              onMouseLeave={() => setModalConfirm(false)}
            >
              <p
                className="options-p"
                onClick={() => setEditPostModal(!editPostModal)}
              >
                Изменить
              </p>
              <p
                className="options-p"
                onClick={() => deletePost(currentPost.id)}
              >
                Удалить
              </p>
            </div>
          </CSSTransition>
          <CSSTransition
            in={editPostModal}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <EditPost
              handleEditPost={handleEditPost}
              setModal={setEditPostModal}
              modal={editPostModal}
              postId={currentPost.id}
              images={currentPost.images}
            ></EditPost>
          </CSSTransition>
          <div className="post-content">
            <p className="post-content-title">{currentPost.text}</p>
            {currentPost.images.length > 0 && (
              <Carousel
                images={currentPost.images}
                counter={counter}
                setCounter={setCounter}
              ></Carousel>
            )}
          </div>
          {currentPost.images.length > 1 && (
            <div className="counter">
              {currentPost.images.map((_, index) => (
                <CircleIcon
                  className={
                    index == counter ? `circle-icon-active` : `circle-icon`
                  }
                  style={{ width: "11px" }}
                ></CircleIcon>
              ))}
            </div>
          )}
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
        classNames="modal-widget"
        unmountOnExit
      >
        <Comments
          key={currentPost.comments.length}
          comments={currentPost.comments}
          postId={currentPost.id}
          addComment={addComment}
          deleteComment={deleteComment}
          handleDeleteAuthor={post.authorId == user?.id}
        ></Comments>
      </CSSTransition>
    </div>
  );
};
