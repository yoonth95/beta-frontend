import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { Button, Carousel, Modal } from "@/components/common";
import { NavBar } from "@/components/layouts";
import { LikeButton, ReservationModal, SubMenuSection } from "@/components/detail";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { useLoginStore } from "@/stores/useLoginStore";
import { useModalStore } from "@/stores/useModalStore";
import { AgencyReservationInfoType, ShowType } from "@/types";
import { getShowInfo, getShowReservationInfo, deleteLike, postLike } from "@/apis";
import styles from "./DetaiPage.module.css";

const submenuList = [
  { pathname: "", text: "정보" },
  { pathname: "review", text: "후기/방명록" },
];

const DetailPage = () => {
  const {
    userState: { user_role },
  } = useLoginStore();
  const { openModal, setOpenModal } = useModalStore();
  const { id: showId } = useParams();
  const { setShowInfo } = useShowInfoStore();
  const [agencyReservationInfo, setAgencyReservationInfo] = useState<AgencyReservationInfoType | null>(null);

  const {
    status,
    data: infoData,
    error,
  } = useQuery({
    queryKey: ["infoData", showId],
    queryFn: () => getShowInfo(showId!),
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      if (showId && infoData?.user_liked) {
        return await deleteLike(showId);
      }
      if (showId && !infoData?.user_liked) {
        return await postLike(showId);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["infoData", showId] });
      const oldData = queryClient.getQueryData<ShowType>(["infoData", showId]);
      queryClient.setQueryData(["infoData", showId], {
        ...oldData,
        user_liked: oldData?.user_liked ? 0 : 1,
      });
      return { oldData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["infoData", showId], { ...context?.oldData });
    },
  });

  useEffect(() => {
    infoData && setShowInfo(infoData);
  }, [infoData]);

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const subImgs = (infoData.sub_images_url && Object.values(JSON.parse(infoData.sub_images_url))) || [];

  const handleReservationButtonClick = async () => {
    const data = await getShowReservationInfo(showId!);
    const { method, google_form_url, ...rest } = data;

    if (method === "google" && google_form_url) window.open(google_form_url, "_blank");
    else {
      setAgencyReservationInfo(rest);
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
        {user_role === "user" && (
          <div className={styles["btn-group"]}>
            <LikeButton active={infoData.user_liked !== 0 && true} onClick={() => likeMutate()} />
            <Button borderRadius="0.5rem" disabled={!infoData.is_reservation} onClick={handleReservationButtonClick}>
              예매하기
            </Button>
            {openModal.state && openModal.type === "reservation" && agencyReservationInfo && (
              <Modal title={infoData.title} width={"600px"}>
                <ReservationModal agencyReservationInfo={agencyReservationInfo} />
              </Modal>
            )}
          </div>
        )}

        <SubMenuSection submenuList={submenuList} baseUrl={`/detail/${showId}`} />
      </main>
    </>
  );
};

export default DetailPage;
