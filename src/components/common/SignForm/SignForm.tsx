import React from "react";
import styles from "./SignForm.module.css";
import classNames from "classnames/bind";

interface PropsType {
  children: React.ReactNode;
  userType: "User" | "Admin";
  setUserType: (userType: "User" | "Admin") => void;
}

const cx = classNames.bind(styles);

const SignForm: React.FC<PropsType> = ({ children, userType, setUserType }) => {
  return (
    <section className={styles["sign-section"]}>
      <div className={styles["sign-section-buttons"]}>
        <button type="button" className={cx("sign-section-button", userType === "User" && "active")} onClick={() => setUserType("User")}>
          일반회원 로그인
        </button>
        <button type="button" className={cx("sign-section-button", userType === "Admin" && "active")} onClick={() => setUserType("Admin")}>
          관리자 로그인
        </button>
      </div>
      {children}
    </section>
  );
};

export default SignForm;
