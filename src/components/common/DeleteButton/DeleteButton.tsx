import React from "react";
import DeleteIcon from "@/assets/plus.svg?react";
import styles from "./DeleteButton.module.css";

const DeleteButton = ({ onClick, spanHidden }) => {
  return (
    <button onClick={onClick} type="button" className={styles["delete-btn"]}>
      <DeleteIcon />
      <span className="a11y-hidden">{spanHidden}</span>
    </button>
  );
};

export default DeleteButton;
