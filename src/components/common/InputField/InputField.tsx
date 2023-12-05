import React from "react";
import { useLocation } from "react-router-dom";
import CheckIcon from "@/assets/icon-check.svg?react";
import styles from "./InputField.module.css";
import classNames from "classnames/bind";

/**
 * InputField Component
 * @param {React.ReactNode} children - InputField label
 * @param {string} type - InputField type
 * @param {string} placeholder - InputField placeholder
 * @param {string} value - InputField value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - InputField change event
 * @param {boolean} isConfirm - InputField confirm
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <InputField
 *  children="아이디"
 *  type="text"
 *  placeholder="아이디를 입력해주세요."
 *  value={id}
 *  onChange={(e) => setId(e.target.value)}
 *  isConfirm={true}
 * />
 */

interface PropsType {
  children: React.ReactNode;
  type: "text" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isConfirm?: boolean;
}

const cx = classNames.bind(styles);

const InputField: React.FC<PropsType> = ({ children, type, placeholder, value, onChange, isConfirm }) => {
  const location = useLocation();

  return (
    <fieldset className={styles["fieldset-box"]}>
      {children && <label>{children}</label>}
      <input type={type} placeholder={placeholder} value={value || ""} onChange={onChange} />
      {location.pathname.includes("signup") && type === "password" ? (
        <CheckIcon className={cx("input-box__check", isConfirm ? "success" : "fail")} />
      ) : undefined}
    </fieldset>
  );
};

export default InputField;
