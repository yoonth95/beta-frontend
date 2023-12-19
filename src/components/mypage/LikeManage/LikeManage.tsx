import React, { useEffect, useState } from "react";
import { BasicCard, FilterButton } from "@/components/common";
import styles from "./LikeManage.module.css";
import { TicketCard } from "@/components/mainConcert";
import axios from "axios";

const dummyData = [
  {
    id: 1,
    user_id: 3,
    show_type: "공연",
    show_sub_type: "연극",
    title: "사랑의 묘약",
    start_date: "2023-12-01",
    end_date: "2023-12-31",
    location: "서울시 강남구 대학로 예술극장",
    location_detail: null,
    position: '{"lat": 37.5069494959122, "lng": 127.055596615858}',
    main_image_url: "/show/aaadb1cf-d39e-4e80-a0f3-32d01361ad05.jpg",
    main_image_color: null,
    sub_images_url:
      '{"1": "/show/f48b59ae-f78a-4d89-8dd4-a2c0f2ff7c30.jpg", "2": "/show/3549261d-30db-4dba-af06-9448557adce5.jpg", "3": "/show/0ff57092-4957-4c5c-9d45-35b34d6b02ab.png", "4": "/show/404670852_18168423643293747_605813767255233837_n.jpg"}',
    univ: "서울대학교",
    department: "연극과",
    tags: '{"1": "abc", "2": "def", "3": "ghi"}',
    content: {
      type: "Buffer",
      data: [],
    },
    is_reservation: 1,
    created_at: "2023-12-07T23:28:49.000Z",
    likes_count: 1,
  },
];

const categories = ["공연", "전시", "스포츠"];

const LikeManage = () => {
  const [filter, setFilter] = useState("공연");

  const handleClickFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent: value } = e.target as HTMLButtonElement;
    setFilter(value!);
  };

  return (
    <>
      <div className={styles["filter-row"]}>
        <div className={styles["filter-contents"]}>
          {categories.map((item) => (
            <FilterButton key={item} selected={filter === item} onClick={handleClickFilterButton}>
              {item}
            </FilterButton>
          ))}
        </div>
        {filter === "전시" ? (
          <ul className={styles["exhibition-list"]}>
            {dummyData.map((item) => (
              <li key={item.id}>
                <BasicCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles["concert-list"]}>
            {dummyData.map((item) => (
              <li key={item.id}>
                <TicketCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default LikeManage;
