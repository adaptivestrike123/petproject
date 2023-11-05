import React, { FC } from "react";
import "./Modal.css";

interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  title?: string;
  info: string;
}

export const Modal: FC<ModalProps> = ({ modal, setModal, info, title }) => {
  return (
    <div className="modal" onClick={() => setModal(!modal)}>
      <div className="modal-layout" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{info}</p>
        <button onClick={() => setModal(!modal)}>Подтвердить</button>
      </div>
    </div>
  );
};
