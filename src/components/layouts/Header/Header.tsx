import React from "react";
import styles from "./Header.module.css";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["header-wrapper"]}>
        <h1 className={styles["header-txt"]}>
          <Link to={"/"}>BETA</Link>
        </h1>
        <Link to="/login" className={styles["button-login"]}>
          로그인
        </Link>
        <Link to="/mypage" className={styles["button-mypage"]}>
          마이페이지
        </Link>
      </div>
    </header>
  );
};

export default Header;
