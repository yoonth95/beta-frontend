import React from "react";
import styles from "./Button.module.css";

/**
 * Button Component
 * @param {React.ReactNode} children - Button text
 * @param {() => void} onClick - Button click event
 * @param {boolean} disabled - Button disabled
 * @param {string} type - Button type
 * @param {string} borderRadius - Button border radius
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <Button onClick={() => console.log("click")}>Button</Button>
 * <Button disabled={true}>Button</Button>
 * <Button type="submit">Button</Button>
 * <Button borderRadius="10px">Button</Button>
 *
 * <Button onClick={() => console.log("click")} disabled type="submit" borderRadius="10px">
 *  버튼
 * </Button>
 */

interface PropsType {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  borderRadius?: string;
}

const Button = ({ children, onClick, disabled, type, borderRadius }: PropsType) => {
  return (
    <>
      <button
        className={styles["button"]}
        onClick={onClick}
        disabled={disabled ? disabled : false}
        type={type ? type : "button"}
        style={{ borderRadius: borderRadius ? borderRadius : "5px" }}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
