import React, { FC, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import "./Carousel.css";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  images: Image[];
  counter: number;
  setCounter: (counter: number) => void;
}
interface Image {
  id: number;
  imageUrl: string;
  postId: number;
}

export const Carousel: FC<Props> = ({ images, counter, setCounter }) => {
  {
    console.log(images);
  }
  return (
    <div className="carousel">
      {images.length > 1 && (
        <button
          className="array-left"
          onClick={() => setCounter(counter - 1)}
          disabled={counter == 0 ? true : false}
        >
          <KeyboardArrowLeftIcon className="array-left"></KeyboardArrowLeftIcon>
        </button>
      )}

      <img
        className="image-post"
        src={`http://localhost:5000/static/post_images/${
          images[counter].imageUrl
        }?${Date.now()}`}
      ></img>

      {images.length > 1 && (
        <button
          className="array-right"
          onClick={() => setCounter(counter + 1)}
          disabled={counter == images.length - 1 ? true : false}
        >
          <KeyboardArrowRight className="array-right"></KeyboardArrowRight>
        </button>
      )}
    </div>
  );
};
