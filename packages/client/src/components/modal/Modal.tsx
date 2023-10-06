import React, { FC } from "react";
import "./Modal.css";

interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  info: string;
}

export const Modal: FC<ModalProps> = ({ modal, setModal, info }) => {
  return (
    <div className="modal">
      <div className="modal-layout">
        <p>{info}</p>
        <button onClick={() => setModal(!modal)}>Хорошо</button>
      </div>
    </div>
  );
};
