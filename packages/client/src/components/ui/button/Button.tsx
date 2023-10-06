import React, { FC } from "react";
import "..//button/Button.css";

interface Props {
  handleClick: () => void;
  title?: any;
  disabled?: boolean;
}
export const Button: FC<Props> = ({ handleClick, title, disabled }) => {
  return (
    <button onClick={() => handleClick()} disabled={disabled}>
      {title}
    </button>
  );
};
