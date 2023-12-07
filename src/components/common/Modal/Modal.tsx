import React, { useEffect } from "react";
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

  return (
    <article className={styles["modal-background"]}>
      <div className={styles["modal"]}>
        <button onClick={closeModal} className={styles["modal__close"]}>
          x
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal;
