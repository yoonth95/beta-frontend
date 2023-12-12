import React from "react";
import styles from "./GuestAccess.module.css";
import { Link } from "react-router-dom";

const GuestAccess = () => {
  return (
    <article className={styles["guest-access"]}>
      <div className={styles["guest-access__signup"]}>
        <p>아직 회원이 아니시라면,</p>
        <Link to="/signup">회원가입</Link>
      </div>
      <div className={styles["guest-access__login"]}>
        <p>이미 가입한 아이디가 있다면,</p>
        <Link to="/login">로그인</Link>
      </div>
    </article>
  );
};

export default GuestAccess;
