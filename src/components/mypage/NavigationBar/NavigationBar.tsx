import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NavigationBar.module.css";

const cx = classNames.bind(styles);

const userNavList = [
  { type: "info", pathname: "/mypage?tab=profile", text: "프로필" },
  { type: "manage", pathname: "/mypage?tab=like", text: "좋아요" },
  { type: "manage", pathname: "/mypage?tab=review", text: "후기" },
  { type: "manage", pathname: "/mypage?tab=story", text: "스토리" },
  { type: "manage", pathname: "/mypage?tab=reservation", text: "예매내역" },
];

const adminNavList = [
  { type: "info", pathname: "/mypage?tab=profile", text: "프로필" },
  { type: "manage", pathname: "/mypage?tab=post", text: "게시글" },
  { type: "manage", pathname: "/mypage?tab=reservation-manage", text: "예매관리" },
];

const Navigation = () => {
  const [isAdmin, setIsAdmin] = useState(false); // 전역 상태로 관리할 예정
  const location = useLocation();
  const nowLocation = location.search.split("=")[1];

  const checkIsActive = (pathname: string) => {
    if (nowLocation === pathname.split("=")[1] || (location.search === "" && pathname === "/mypage?tab=profile")) {
      return true;
    }
  };

  const navList = isAdmin ? adminNavList : userNavList;

  return (
    <nav className={styles["nav-container"]}>
      <ul className={styles["nav-ul"]}>
        <li>개인정보</li>
        {navList
          .filter((item) => item.type === "info")
          .map((item) => (
            <NavLink key={item.pathname} to={item.pathname} className={cx(checkIsActive(item.pathname) && "active")}>
              {item.text}
            </NavLink>
          ))}
        <li>관리</li>
        {navList
          .filter((item) => item.type === "manage")
          .map((item) => (
            <NavLink key={item.pathname} to={item.pathname} className={cx(checkIsActive(item.pathname) && "active")}>
              {item.text}
            </NavLink>
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;
