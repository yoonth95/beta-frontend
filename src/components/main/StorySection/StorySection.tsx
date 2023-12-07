import { Story } from "@/components/main";
import { Carousel } from "@/components/common";
import styles from "./StorySection.module.css";

const StorySection = () => {
  const items = { imgSrc: "/public/story-img.jpg", title: "#멋지다신은수, #졸업축하해" };

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
          .fill(items)
          .map(({ imgSrc, title }) => (
            <Story key={title} title={title} imgSrc={imgSrc} />
          ))}
      </Carousel>
    </section>
  );
};

export default StorySection;
