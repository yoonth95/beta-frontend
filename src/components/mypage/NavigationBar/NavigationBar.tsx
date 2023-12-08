import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NavigationBar.module.css";

const cx = classNames.bind(styles);

const userNavList = [
  { type: "info", pathname: "profile", text: "프로필" },
  { type: "manage", pathname: "like", text: "좋아요" },
  { type: "manage", pathname: "review", text: "후기" },
  { type: "manage", pathname: "story", text: "스토리" },
  { type: "manage", pathname: "reservation", text: "예매내역" },
];

const adminNavList = [
  { type: "info", pathname: "profile", text: "프로필" },
  { type: "manage", pathname: "post", text: "게시글" },
  { type: "manage", pathname: "reservation-manage", text: "예매관리" },
];

const Navigation = () => {
  const [isAdmin, setIsAdmin] = useState(false); // 전역 상태로 관리할 예정
  const [searchParams] = useSearchParams();
  const urlPathname = searchParams.get("tab");

  const checkUrl = (urlPathname: string | null, pathname: string) => {
    return urlPathname ? pathname === urlPathname : pathname === "profile";
  };

  const navList = isAdmin ? adminNavList : userNavList;

  return (
    <nav className={styles["nav-container"]}>
      <ul className={styles["nav-ul"]}>
        <li>개인정보</li>
        {navList
          .filter((item) => item.type === "info")
          .map((item) => (
            <NavLink key={item.pathname} to={`?tab=${item.pathname}`} className={cx(checkUrl(urlPathname, item.pathname) && "active")}>
              {item.text}
            </NavLink>
          ))}
        <li>관리</li>
        {navList
          .filter((item) => item.type === "manage")
          .map((item) => (
            <NavLink key={item.pathname} to={`?tab=${item.pathname}`} className={cx(checkUrl(urlPathname, item.pathname) && "active")}>
              {item.text}
            </NavLink>
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;
