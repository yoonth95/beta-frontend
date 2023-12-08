import React from "react";
import { SubMenuBar } from "..";
import { Outlet, useLocation } from "react-router-dom";

interface PropsType {
  submenuList: SubMenuList[];
}

interface SubMenuList {
  pathname: string;
  text: string;
}

const SubMenuSection: React.FC<PropsType> = ({ submenuList }) => {
  const location = useLocation();
  return (
    <section>
      <div style={{ display: "flex" }}>
        {submenuList.map((menu) => (
          <SubMenuBar key={menu.text} selected={location.pathname.includes(menu.pathname)} url={`./${menu.pathname}`}>
            {menu.text}
          </SubMenuBar>
        ))}
      </div>
      <Outlet />
    </section>
  );
};

export default SubMenuSection;
