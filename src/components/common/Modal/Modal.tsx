import React from "react";
import styles from "./Modal.module.css";

interface PropsType {
  children: React.ReactNode;
}

const Modal: React.FC<PropsType> = ({ children }) => {
  return (
    <article className={styles["modal-background"]}>
      <div className={styles["modal"]}>
        <button className={styles["modal__close"]}>x</button>
        {children}
      </div>
    </article>
  );
};

export default Modal;
