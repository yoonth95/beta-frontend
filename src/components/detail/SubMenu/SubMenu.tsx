import React from "react";
import { Link } from "react-router-dom";
import styles from "./SubMenu.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  children: React.ReactNode;
  selected: boolean;
  url: string;
}

const SubMenu: React.FC<PropsType> = ({ children, selected, url }) => {
  return (
    <Link to={url} className={cx("submenu", selected && "selected")}>
      {children}
    </Link>
  );
};

export default SubMenu;
