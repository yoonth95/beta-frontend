import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BasicCard, FilterButton } from "@/components/common";
import { TicketCard } from "@/components/mainConcert";
import { getUserLikeList } from "@/apis";
import styles from "./LikeManage.module.css";

const categories = ["공연", "전시", "스포츠"];

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
    queryFn: () => getUserLikeList(), // TODO: 로그인 정보에서 아이디 값 가져오기
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const renderLikeList = () => {
    return (
      <ul className={filter === "전시" ? styles["exhibition-list"] : styles["concert-list"]}>
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
