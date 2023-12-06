import React from "react";
import styles from "./FilterButton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}
const FilterButton: React.FC<PropsType> = ({ children, selected, onClick }) => {
  return (
    <button className={cx("button", selected && "selected")} onClick={onClick}>
      {children}
    </button>
  );
};

export default FilterButton;
