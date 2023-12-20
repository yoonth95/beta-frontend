import React from "react";
import StoryItem from "../StoryItem/StoryItem";
import styles from "./StoryManage.module.css";

const dummy = [
  {
    id: 1,
    image: "/card-image.png",
    date: "23.12.02",
  },
  {
    id: 2,
    image: "/concert-img.jpg",
    date: "23.12.02",
  },
  {
    id: 3,
    image: "/concert-img2.jpg",
    date: "23.12.02",
  },
  {
    id: 4,
    image: "/concert-img3.jpg",
    date: "23.12.02",
  },
];

const StoryManage = () => {
  return (
    <div className={styles["story-container"]}>
      {dummy.map((item) => (
        <StoryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default StoryManage;
