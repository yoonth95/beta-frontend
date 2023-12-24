import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { BasicCard, FilterButton, TicketCard } from "@/components/common";
import { getUserLikeList } from "@/apis";
import styles from "./LikeManage.module.css";

const cx = classNames.bind(styles);

const categories = ["공연", "전시"];

const LikeManage = () => {
  const [filter, setFilter] = useState("공연");

  const handleClickFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent: value } = e.target as HTMLButtonElement;
    setFilter(value!);
  };

  const {
    status,
    error,
    data: userLikeList,
  } = useQuery({
    queryKey: ["userLikeList"],
    queryFn: () => getUserLikeList(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const renderLikeList = () => {
    return (
      <ul className={cx(filter === "전시" ? "exhibition-list" : "concert-list")}>
        {userLikeList
          .filter((data) => data.show_type === filter)
          .map((item) => (
            <li key={item.id}>{filter === "전시" ? <BasicCard item={item} /> : <TicketCard item={item} />}</li>
          ))}
      </ul>
    );
  };

  return (
    <div className={styles["filter-row"]}>
      <div className={styles["filter-contents"]}>
        {categories.map((item) => (
          <FilterButton key={item} selected={filter === item} onClick={handleClickFilterButton}>
            {item}
          </FilterButton>
        ))}
      </div>
      {renderLikeList()}
    </div>
  );
};

export default LikeManage;
