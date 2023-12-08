import React from "react";
import Slider from "react-slick";
import nextArrow from "@/assets/next-arrow.png";
import prevArrow from "@/assets/prev-arrow.png";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

interface PropsType {
  index: number;
  children: React.ReactNode;
}

const renderCustomDots = (dots: never) => {
  return (
    <div style={{ width: "100%", position: "absolute", bottom: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ul>{dots}</ul>
    </div>
  );
};

const NextArrows = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick} className={styles["next-arrow"]}>
      <span className="a11y-hidden">다음 사진 보기</span>
      <img src={nextArrow} alt="" />
    </button>
  );
};

const PrevArrows = (props: { onClick?: () => void }) => {
  const { onClick } = props;

  return (
    <button type="button" onClick={onClick} className={styles["prev-arrow"]}>
      <span className="a11y-hidden">이전 사진 보기</span>
      <img src={prevArrow} alt="" />
    </button>
  );
};

const settings = [
  {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: never) => renderCustomDots(dots),
    dotsClass: "dots",
    nextArrow: <NextArrows />,
    prevArrow: <PrevArrows />,
  },
  {
    infinite: false,
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  },
];

const Carousel: React.FC<PropsType> = ({ index, children }) => {
  return <Slider {...settings[index]}>{children}</Slider>;
};

export default Carousel;
