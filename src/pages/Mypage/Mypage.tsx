import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  NavigationBar,
  Profile,
  LikeManage,
  ReviewManage,
  StoryManage,
  Reservation,
  ReservationManage,
  PostManage,
  PostUpload,
} from "@/components/mypage";
import styles from "./Mypage.module.css";

const Mypage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <main className={styles["mypage-main"]}>
      <NavigationBar />
      <section>
        <MypageItem tab={tab} />
      </section>
    </main>
  );
};

const MypageItem: React.FC<{ tab: string | null }> = ({ tab }) => {
  switch (tab) {
    case "profile":
      return (
        <>
          <h2 className={styles["title-hidden"]}>프로필 설정</h2>
          <Profile />
        </>
      );
    case "like":
      return (
        <>
          <h2 className={styles["title-hidden"]}>좋아요 관리</h2>
          <LikeManage />
        </>
      );
    case "review":
      return (
        <>
          <h2 className={styles["title-hidden"]}>댓글 관리</h2>
          <ReviewManage />
        </>
      );
    case "story":
      return (
        <>
          <h2 className={styles["title-hidden"]}>스토리 관리</h2>
          <StoryManage />
        </>
      );
    case "reservation":
      return (
        <>
          <h2 className={styles["title-hidden"]}>예매 내역</h2>
          <Reservation />
        </>
      );
    case "reservation-manage":
      return (
        <>
          <h2 className={styles["title-hidden"]}>예매 관리</h2>
          <ReservationManage />
        </>
      );
    case "post":
      return (
        <>
          <h2 className={styles["title-hidden"]}>게시글 관리</h2>
          <PostManage />
        </>
      );
    case "post-upload":
      return (
        <>
          <h2 className={styles["title-hidden"]}>게시글 업로드</h2>
          <PostUpload />
        </>
      );
    default:
      return (
        <>
          <h2 className={styles["title-hidden"]}>프로필 설정</h2>
          <Profile />
        </>
      );
  }
};

export default Mypage;
