import React from "react";
import { SubMenuBar } from "..";
import { Outlet, useLocation } from "react-router-dom";

interface PropsType {
  submenuList: SubMenuList[];
  baseUrl: string;
}

interface SubMenuList {
  pathname: string;
  text: string;
}

const SubMenuSection: React.FC<PropsType> = ({ submenuList, baseUrl }) => {
  const location = useLocation();
  const checkUrl = (pathname: string) => {
    if (pathname === "" && baseUrl === location.pathname) return true;
    if (pathname !== "") return location.pathname.endsWith(pathname);
  };

  return (
    <section>
      <div style={{ display: "flex" }}>
        {submenuList.map((menu) => (
          <SubMenuBar key={menu.text} selected={!!checkUrl(menu.pathname)} url={`${menu.pathname}`}>
            {menu.text}
          </SubMenuBar>
        ))}
      </div>
      <Outlet />
    </section>
  );
};

export default SubMenuSection;
