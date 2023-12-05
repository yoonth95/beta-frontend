import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button/Button";
import InputField from "@/components/common/InputField/InputField";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id, password, userType);
  };

  return (
    <main className={styles["login-main"]}>
      <section className={styles["login-section"]}>
        <div className={styles["login-section-buttons"]}>
          <button
            type="button"
            className={`${styles["login-section-button"]} ${userType === "User" ? styles["active"] : ""}`}
            onClick={() => setUserType("User")}
          >
            일반회원 로그인
          </button>
          <button
            type="button"
            className={`${styles["login-section-button"]} ${userType === "Admin" ? styles["active"] : ""}`}
            onClick={() => setUserType("Admin")}
          >
            관리자 로그인
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles["login-section-form"]}>
          <InputField children="아이디" type="text" placeholder="아이디를 입력해주세요." value={id} onChange={(e) => setId(e.target.value)} />
          <InputField
            children="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button children="로그인" type="submit" />
        </form>
      </section>
      <section className={styles["login-link"]}>
        <Link to="/signup">회원가입</Link>
        <span className={styles["login-link-span"]}>|</span>
        <Link to="/findPW">비밀번호 찾기</Link>
      </section>
    </main>
  );
};

export default LoginPage;
