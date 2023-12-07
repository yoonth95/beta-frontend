import React from "react";
import styles from "./FilterButton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  children: React.ReactNode;
  name?: string;
  selected?: boolean;
  value?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const FilterButton: React.FC<PropsType> = ({ children, selected = false, ...rest }) => {
  return (
    <button className={cx("button", selected && "selected")} {...rest}>
      {children}
    </button>
  );
};

export default FilterButton;
