import { Carousel } from "@/components/common";
import styles from "./Banner.module.css";

const Banner = () => {
  const imgs = ["/public/concert-img.jpg", "/public/concert-img2.jpg", "/public/concert-img3.jpg", "/public/card-image.png"];

  return (
    <>
      <Carousel index={0}>
        {imgs.map((img, index) => (
          <div key={index}>
            <img src={img} className={styles["slider__img"]} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Banner;
