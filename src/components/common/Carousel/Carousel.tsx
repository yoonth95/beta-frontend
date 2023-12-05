import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

interface PropsType {
  imgs: string[];
}

const Carousel: React.FC<PropsType> = ({ imgs }) => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className={styles["slider-wrapper"]}>
      <h2 className="a11y-hidden">포스터 슬라이드</h2>
      <Slider {...settings}>
        {imgs.map((img, index) => (
          <div key={index}>
            <img src={img} className={styles["slider__img"]} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
