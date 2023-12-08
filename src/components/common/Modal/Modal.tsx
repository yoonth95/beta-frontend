import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/stores/useModalStore";
import styles from "./Modal.module.css";

interface PropsType {
  children: React.ReactNode;
}

const Modal: React.FC<PropsType> = ({ children }) => {
  const { setIsOpenModal } = useModalStore();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const renderModal = (
    <article className={styles["modal-background"]}>
      <div className={styles["modal"]}>
        <button onClick={closeModal} className={styles["modal__close"]}>
          x
        </button>
        {children}
      </div>
    </article>
  );

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element with ID 'root' not found.");
    return null;
  }

  return createPortal(renderModal, rootElement);
};

export default Modal;
