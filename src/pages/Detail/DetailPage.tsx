import React from "react";
import { Button, Carousel } from "@/components/common";
import { LikeButton, SubMenuSection } from "@/components/detail";
import styles from "./DetaiPage.module.css";
import { NavBar } from "@/components/layouts";

const item = {
  id: 1,
  organizer: "고려대학교 미술학과",
  imgSrc: ["/concert-img.jpg", "/concert-img2.jpg", "/concert-img3.jpg", "/card-image.png"],
  title: "고려대 전시회에 놀러오세요",
  location: "고려대학교 박물관 지하 1층 (백주년기념 삼성관) 기획 전시실 Ⅱ",
  date: "2023.11.23 - 2023.11.29",
  tags: ["abc", "def", "ghi", "jkl", "mno"],
  position: {
    lat: 37.5069494959122,
    lng: 127.055596615858,
  },
};

const submenuList = [
  { pathname: "info", text: "정보" },
  { pathname: "review", text: "후기/방명록" },
];

const DetailPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <Carousel index={0}>
          {item.imgSrc.map((img, index) => (
            <div key={index}>
              <img src={img} className={styles["slider__img"]} />
            </div>
          ))}
        </Carousel>
        <div className={styles["btn-group"]}>
          <LikeButton active={false} />
          <Button borderRadius="0.5rem">예매하기</Button>
        </div>
        <SubMenuSection submenuList={submenuList} />
      </main>
    </>
  );
};

export default DetailPage;
