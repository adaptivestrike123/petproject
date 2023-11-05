import React, { FC } from "react";

import "./Confirm.css";

interface Props {
  modalConfirm: boolean;
  setModalConfirm: (modal: boolean) => void;
  option: string;
}

export const Confirm: FC<Props> = ({
  setModalConfirm,
  modalConfirm,
  option,
}) => {
  {
    console.log(`${modalConfirm} lol`);
  }
  return (
    <div className="confirm" onClick={() => setModalConfirm(!modalConfirm)}>
      <div className="confirm-layout" onClick={(e) => e.stopPropagation()}>
        <h2>{option}</h2>
        <div className="confirm-wrapper">
          <button>Да</button>
          <button>Нет</button>
        </div>
      </div>
    </div>
  );
};
