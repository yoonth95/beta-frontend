import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { NavigationBar } from "@/components/mypage";
import styles from "./Mypage.module.css";

const Mypage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <main className={styles["mypage-main"]}>
      <NavigationBar />
      <section>
        <h2 className={styles["title-hidden"]}>{getMypageTitle(pathname)}</h2>
        <Outlet />
      </section>
    </main>
  );
};

const getMypageTitle = (pathname: string) => {
  const sequences = pathname.split("/");
  const tab = sequences[sequences.length - 1];
  switch (tab) {
    case "profile":
      return "프로필 설정";
    case "like":
      return "좋아요 관리";
    case "review":
      return "댓글 관리";
    case "story":
      return "스토리 관리";
    case "reservation":
      return "예매 내역";
    case "reservation-manage":
      return "예매 관리";
    case "post":
      return "게시글 관리";
  }
};

export default Mypage;
