import React, { FC, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./Carousel.css";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  images: Image[];
}
interface Image {
  id: number;
  imageUrl: string;
  postId: number;
}

export const Carousel: FC<Props> = ({ images }) => {
  const [current, setCurrent] = useState<number>(0);

  return (
    <div className="carousel">
      <div className="counter">{`${current + 1}/${images.length}`}</div>
      <button
        className="array-left"
        onClick={() => setCurrent(current - 1)}
        disabled={current == 0 ? true : false}
      >
        <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
      </button>

      <img
        className="image-post"
        src={`http://localhost:5000/static/post_images/${images[current].imageUrl}`}
      ></img>

      <button
        className="array-right"
        onClick={() => setCurrent(current + 1)}
        disabled={current == images.length - 1 ? true : false}
      >
        <KeyboardArrowRight className="array-right"></KeyboardArrowRight>
      </button>
    </div>
  );
};
