import React, { useEffect, useState } from "react";
import { Button, Carousel, Modal } from "@/components/common";
import { LikeButton, ReservationFormModal, SubMenuSection } from "@/components/detail";
import styles from "./DetaiPage.module.css";
import { NavBar } from "@/components/layouts";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { useModalStore } from "@/stores/useModalStore";
import { useQuery } from "@tanstack/react-query";
import { getShowInfo, getShowReservationInfo } from "@/apis";
import { useParams } from "react-router-dom";
import { ShowReservationInfoType } from "@/types";

const submenuList = [
  { pathname: "", text: "정보" },
  { pathname: "review", text: "후기/방명록" },
];

const DetailPage = () => {
  const { openModal, setOpenModal } = useModalStore();
  const { setShowInfo } = useShowInfoStore();
  const [showReservationInfo, setShowReservationInfo] = useState<Omit<ShowReservationInfoType, "method" | "google_form_url"> | null>(null);
  const { id: showId } = useParams();

  const {
    status,
    data: infoData,
    error,
  } = useQuery({
    queryKey: ["infoData", showId],
    queryFn: () => getShowInfo(showId!),
  });

  useEffect(() => {
    infoData && setShowInfo(infoData);
  }, [infoData]);

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const subImgs = (infoData.sub_images_url && Object.values(JSON.parse(infoData.sub_images_url))) || [];

  const handleReservationButton = async () => {
    const data = await getShowReservationInfo(showId!);
    const { method, google_form_url, ...reservationInfo } = data;
    if (method === "google") window.open(google_form_url, "_blank");
    else {
      // TODO: 회원아니면 guestAccess 모달창 띄우기
      setShowReservationInfo(reservationInfo);
      setOpenModal({ state: true, type: "reservation" });
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <Carousel index={0}>
          {[infoData.main_image_url, ...subImgs].map((img, index) => (
            <div key={index}>
              <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + img} className={styles["slider__img"]} />
            </div>
          ))}
        </Carousel>
        <div className={styles["btn-group"]}>
          <LikeButton active={false} />
          <Button borderRadius="0.5rem" onClick={handleReservationButton} disabled={!infoData.is_reservation}>
            예매하기
          </Button>
          {openModal.state && openModal.type === "reservation" && showReservationInfo && (
            <Modal title={infoData.title} width={"600px"}>
              <ReservationFormModal showReservationInfo={showReservationInfo} />
            </Modal>
          )}
        </div>
        <SubMenuSection submenuList={submenuList} baseUrl={`/detail/${showId}`} />
      </main>
    </>
  );
};

export default DetailPage;
