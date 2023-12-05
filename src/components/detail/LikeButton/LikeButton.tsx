import React from "react";
import LikeSvg from "@/assets/like.svg?react";
import styles from "./LikeButton.module.css";

interface PropsType {
  active: boolean;
}

const LikeButton: React.FC<PropsType> = ({ active }) => {
  return (
    <button className={`${styles["like-button"]} ${active && styles.active}`}>
      <LikeSvg className={styles["like-button__svg"]} />
      <span>좋아요</span>
    </button>
  );
};

export default LikeButton;
