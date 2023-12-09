import React from "react";
import styles from "./CheckBox.module.css";

interface PropsType {
  children: React.ReactNode;
  inputId: string;
  name?: string;
  checked: boolean;
}

const CheckBox: React.FC<PropsType> = ({ children, inputId, name, checked }) => {
  return (
    <fieldset className={styles["fieldset"]}>
      <input className={styles["fieldset__checkbox"]} type="checkbox" id={inputId} name={name} checked={checked} />
      <label className={styles["fieldset__label"]} htmlFor={inputId}>
        {children}
      </label>
    </fieldset>
  );
};

export default CheckBox;
