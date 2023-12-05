import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignForm, Button, InputField } from "@/components/common";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"User" | "Admin">("User");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id, password, userType);
  };

  return (
    <main className={styles["login-main"]}>
      <SignForm userType={userType} setUserType={setUserType}>
        <form onSubmit={handleSubmit} className={styles["login-section-form"]}>
          <InputField type="text" placeholder="아이디를 입력해주세요." value={id} onChange={(e) => setId(e.target.value)}>
            아이디
          </InputField>
          <InputField type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)}>
            비밀번호
          </InputField>
          <Button children="로그인" type="submit" />
        </form>
      </SignForm>
      <section className={styles["login-link"]}>
        <Link to="/signup">회원가입</Link>
        <span className={styles["login-link-span"]}>|</span>
        <Link to="/findPW">비밀번호 찾기</Link>
      </section>
    </main>
  );
};

export default LoginPage;
