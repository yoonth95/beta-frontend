import React from "react";
import styles from "./SubMenu.module.css";
import { Link } from "react-router-dom";

interface PropsType {
  children: React.ReactNode;
  selected: boolean;
  url: string;
}

const SubMenu: React.FC<PropsType> = ({ children, selected, url }) => {
  return (
    <Link to={url} className={`${styles.submenu} ${selected && styles.selected}`}>
      {children}
    </Link>
  );
};

export default SubMenu;
