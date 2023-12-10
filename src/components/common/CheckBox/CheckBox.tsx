import React from "react";
import styles from "./CheckBox.module.css";

interface PropsType {
  children: React.ReactNode;
  inputId: string;
  name?: string;
  checked: boolean;
  onChange: React.ChangeEventHandler;
}

const CheckBox: React.FC<PropsType> = ({ children, inputId, name, checked, onChange }) => {
  return (
    <fieldset className={styles["fieldset"]}>
      <input className={styles["fieldset__checkbox"]} type="checkbox" id={inputId} name={name} checked={checked} onChange={onChange} />
      <label className={styles["fieldset__label"]} htmlFor={inputId}>
        {children}
      </label>
    </fieldset>
  );
};

export default CheckBox;
