import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Modal, UserAccessModal } from "@/components/common";
import { StoryCard, StoryUploadModal, StoryViewModal, StorySectionSkeleton } from "@/components/main";
import { useModalStore } from "@/stores/useModalStore";
import { useLoginStore } from "@/stores/useLoginStore";
import { useCarouselDragStore } from "@/stores/useCarouselDragStore";
import { getStories } from "@/apis";
import { isNotUser } from "@/utils";
import styles from "./StorySection.module.css";

const StorySection = () => {
  const { openModal, setOpenModal } = useModalStore();
  const {
    userState: { user_role },
  } = useLoginStore();
  const [initialSlide, setInitialSlide] = useState(0);
  const { isDragging } = useCarouselDragStore();

  const { data, status, error } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => await getStories(),
    select: (item) => item.slice(0, 7),
  });

  const handleClickUploadBtn = () => {
    if (isNotUser(user_role)) {
      setOpenModal({ state: true, type: "guestAccess" });
      return;
    }

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

        <div className={styles["carousel-container"]}>
          {status === "pending" && <StorySectionSkeleton />}

          {status !== "pending" && (
            <Carousel index={1}>
              {data?.map((item, index) => (
                <StoryCard key={item.id} item={item} onClick={handleClickStoryCard(index)} />
              ))}
            </Carousel>
          )}
          {status === "error" && <>{error.message}</>}
        </div>
        {openModal.state && (
          <>
            {openModal.type === "upload" && (
              <Modal width={"25rem"} height={"41rem"} title={"스토리 업로드"}>
                <StoryUploadModal />
              </Modal>
            )}
            {openModal.type === "more" && (
              <Modal height={"100vh"} title={"스토리"} titleHidden>
                <StoryViewModal initialSlide={initialSlide} />
              </Modal>
            )}
            {openModal.type === "guestAccess" && (
              <Modal title="회원가입/로그인으로 이동" titleHidden width="600px" height="500px">
                <UserAccessModal />
              </Modal>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default StorySection;
