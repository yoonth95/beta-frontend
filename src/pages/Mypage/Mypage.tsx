import React from "react";
import { useSearchParams } from "react-router-dom";
import { NavigationBar, Profile, LikeManage, ReviewManage, StoryManage, Reservation, ReservationManage, PostManage } from "@/components/mypage";
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
      return <Profile />;
    case "like":
      return <LikeManage />;
    case "review":
      return <ReviewManage />;
    case "story":
      return <StoryManage />;
    case "reservation":
      return <Reservation />;
    case "reservation-manage":
      return <ReservationManage />;
    case "post":
      return <PostManage />;
    default:
      return <Profile />;
  }
};

export default Mypage;
