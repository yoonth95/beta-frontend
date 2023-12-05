import React from "react";
import styles from "./InputField.module.css";

/**
 * InputField Component
 * @param {React.ReactNode} children - InputField label
 * @param {string} type - InputField type
 * @param {string} placeholder - InputField placeholder
 * @param {string} value - InputField value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - InputField change event
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <InputField
 *  children="아이디"
 *  type="text"
 *  placeholder="아이디를 입력해주세요."
 *  value={id}
 *  onChange={(e) => setId(e.target.value)}
 * />
 */

interface PropsType {
  children: React.ReactNode;
  type: "text" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ children, type, placeholder, value, onChange }: PropsType) => {
  return (
    <fieldset className={styles["fieldset-box"]}>
      <label>{children}</label>
      <input type={type} placeholder={placeholder} value={value ? value : ""} onChange={onChange} />
    </fieldset>
  );
};

export default InputField;
