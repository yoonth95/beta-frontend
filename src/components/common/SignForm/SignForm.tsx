import React from "react";
import styles from "./SignForm.module.css";

interface PropsType {
  children: React.ReactNode;
  userType: "User" | "Admin";
  setUserType: (userType: "User" | "Admin") => void;
}

const SignForm = ({ children, userType, setUserType }: PropsType) => {
  return (
    <section className={styles["sign-section"]}>
      <div className={styles["sign-section-buttons"]}>
        <button
          type="button"
          className={`${styles["sign-section-button"]} ${userType === "User" ? styles.active : ""}`}
          onClick={() => setUserType("User")}
        >
          일반회원 로그인
        </button>
        <button
          type="button"
          className={`${styles["sign-section-button"]} ${userType === "Admin" ? styles.active : ""}`}
          onClick={() => setUserType("Admin")}
        >
          관리자 로그인
        </button>
      </div>
      {children}
    </section>
  );
};

export default SignForm;
