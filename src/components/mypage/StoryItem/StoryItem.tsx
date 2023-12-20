import React from "react";
import { DeleteButton } from "@/components/common";
import styles from "./StoryItem.module.css";

interface PropsType {
  item: {
    id: number;
    image: string;
    date: string;
  };
}

const StoryItem: React.FC<PropsType> = ({ item }) => {
  const openModal = (id: number) => {
    console.log("openModal", id);
  };
  const deleteStory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(e.currentTarget.name);
  };
  return (
    <div className={styles["StoryManage-item"]} onClick={() => openModal(item.id)}>
      <DeleteButton onClick={deleteStory} spanHidden={`${item.id}`} name={`${item.id}`} />
      <img src="/card-image.png" alt="" />
      <div>23.12.02</div>
    </div>
  );
};

export default StoryItem;
