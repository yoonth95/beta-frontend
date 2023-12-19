import React from "react";
import DeleteIcon from "@/assets/plus.svg?react";
import styles from "./DeleteButton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  onClick: () => void;
  spanHidden: string;
  forImage?: boolean;
}

const DeleteButton: React.FC<PropsType> = ({ onClick, spanHidden, forImage = false }) => {
  return (
    <button onClick={onClick} type="button" className={cx("delete-btn", forImage && "img-delete-btn")}>
      <DeleteIcon />
      <span className="a11y-hidden">{spanHidden}</span>
    </button>
  );
};

export default DeleteButton;
