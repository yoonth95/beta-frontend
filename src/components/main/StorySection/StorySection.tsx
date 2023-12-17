import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Modal } from "@/components/common";
import { StoryCard, StoryUploadModal, StoryViewModal } from "@/components/main";
import { useModalStore } from "@/stores/useModalStore";
import { useCarouselDragStore } from "@/stores/useCarouselDragStore";
import { getStories } from "@/apis";
import styles from "./StorySection.module.css";

const StorySection = () => {
  const { openModal, setOpenModal } = useModalStore();
  const [initialSlide, setInitialSlide] = useState(0);
  const { isDragging } = useCarouselDragStore();

  const { data, status, error } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => await getStories(),
    select: (item) => item.slice(0, 7),
  });

  const handleClickUploadBtn = () => {
    setOpenModal({ state: true, type: "upload" });
  };

  const handleClickMoreBtn = () => {
    setInitialSlide(8);
    setOpenModal({ state: true, type: "more" });
  };

  const handleClickStoryCard = (slideNum: number) => (e: React.MouseEvent) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }
    setInitialSlide(slideNum);
    setOpenModal({ state: true, type: "more" });
  };

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["header__title"]}>스토리</h2>
          <button type="button" className={styles["story-add-btn"]} onClick={handleClickUploadBtn}>
            <span className="a11y-hidden">스토리 추가버튼</span>
          </button>
          <button className={styles["story-more-btn"]} type="button" onClick={handleClickMoreBtn}>
            더보기
          </button>
        </div>

        <Carousel index={1}>
          {data.map((item, index) => (
            <StoryCard key={item.id} item={item} onClick={handleClickStoryCard(index)} />
          ))}
        </Carousel>
        {openModal.state && (
          <>
            {openModal.type === "upload" ? (
              <Modal width={"18.75rem"} height={"33.75rem"} title={"스토리 업로드"}>
                <StoryUploadModal />
              </Modal>
            ) : (
              <Modal title={"스토리"} titleHidden={true}>
                <StoryViewModal initialSlide={initialSlide} />
              </Modal>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default StorySection;
