import { Story } from "@/components/main";
import { Carousel } from "@/components/common";
import styles from "./StorySection.module.css";

const StorySection = () => {
  return (
    <section className={styles["section"]}>
      <div className={styles["header"]}>
        <h2 className={styles["header__title"]}>스토리</h2>
        <button type="button" className={styles["header__story-btn"]}>
          <span className="a11y-hidden">스토리 추가버튼</span>
        </button>
      </div>

      <Carousel index={1}>
        {Array(5)
          .fill("/public/story-img.jpg")
          .map((img, index) => (
            <Story key={index} title={index.toString()} imgSrc={img} />
          ))}
      </Carousel>
    </section>
  );
};

export default StorySection;
