import React from "react";
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
  children?: React.ReactNode;
  type: "text" | "password" | "url" | "number";
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelHidden?: boolean;
  isConfirm?: boolean;
  required?: boolean;
  readOnly?: boolean;
  style?: React.CSSProperties;
  unit?: string;
}

const cx = classNames.bind(styles);

const InputField: React.FC<PropsType> = ({
  children,
  type,
  name,
  placeholder,
  value,
  onChange,
  labelHidden,
  isConfirm,
  required,
  readOnly = false,
  style,
  unit,
}) => {
  const isSignupPassword = name === "password" || name === "id";

  return (
    <fieldset className={styles["fieldset-box"]}>
      <label className={labelHidden ? "a11y-hidden" : ""}>{children}</label>
      <input
        required={required}
        readOnly={readOnly}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        style={{ ...style }}
      />
      {isSignupPassword && <CheckIcon className={cx("input-box__check", isConfirm && "success")} />}
      {unit && <span className={styles["input-unit"]}>{unit}</span>}
    </fieldset>
  );
};

export default InputField;
