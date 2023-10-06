import React, { FC, useState, useEffect } from "react";

import "./Posts.css";
import { apiAxios } from "../../axios/apiAxios";
import { Post } from "../../post/Post";

interface Props {
  authorId?: number;
  key?: any;
  createdPostCount?: number;
}
export interface IPost {
  title: string;
  text: string;
  id: number;
  authorId: number;
  images: Image[] | false;
  comments: Comment[];
  author: Author;
  likes: number;
  liked: boolean;
}

interface Author {
  login: string;
}
interface Image {
  id: number;
  imageUrl: string;
  postId: number;
}
interface Comment {
  id: number;
  text: string;
  authorId: number;
  authorLogin: string;
}

export const Posts: FC<Props> = ({ authorId, createdPostCount }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (!authorId) {
      const getPosts = async () => {
        const { data } = await apiAxios.get("/post");
        setPosts(data);
      };
      getPosts();
    }
    if (authorId) {
      const getPostsByAuthorId = async () => {
        const { data } = await apiAxios.post("/post/byId", { authorId });
        setPosts(data);
      };
      getPostsByAuthorId();
    }
  }, [createdPostCount]);

  const deletePost = async (id: number) => {
    const { data } = await apiAxios.post("/post/delete", { id });

    setPosts(posts.filter((elem) => elem.id != id));
  };

  return (
    <div className="posts">
      <div className="posts-align">
        {posts.length > 0 ? (
          posts.map((elem) => (
            <Post key={elem.id} post={elem} deletePost={deletePost}></Post>
          ))
        ) : (
          <div className="posts-none">
            <p>Посты отсутствуют!</p>
          </div>
        )}
      </div>
    </div>
  );
};