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

const item = {
  id: 1,
  organizer: "고려대학교 미술학과",
  imgSrc: ["/concert-img.jpg", "/concert-img2.jpg", "/concert-img3.jpg", "/card-image.png"],
  title: "고려대 전시회에 놀러오세요",
  location: "고려대학교 박물관 지하 1층 (백주년기념 삼성관) 기획 전시실 Ⅱ",
  date: "2023.11.23 - 2023.11.29",
  tags: ["abc", "def", "ghi", "jkl", "mno"],
  position: {
    lat: 37.5069494959122,
    lng: 127.055596615858,
  },
};

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
      <Outlet context={{ item }} />
    </section>
  );
};

export default SubMenuSection;
