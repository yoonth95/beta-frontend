import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "@/components/common";
import { ReservationListModal } from "@/components/mypage";
import { useModalStore } from "@/stores/useModalStore";
import { getAdminReservationList } from "@/apis/";
import classNames from "classnames/bind";
import styles from "./ReservationManage.module.css";

const cx = classNames.bind(styles);

const ReservationManage = () => {
  const { openModal, setOpenModal } = useModalStore();
  const [clickedId, setClickedShowId] = useState<number | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const { data, status, error } = useQuery({
    queryKey: ["reservationList"],
    queryFn: () => getAdminReservationList(),
    select: (list) => list.filter((item) => item.is_reservation === 1),
  });

  const handleClickDetailBtn = (id: number, title: string) => () => {
    setClickedShowId(id);
    setModalTitle(title);
    setOpenModal({ state: true, type: "list" });
  };

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <>
      <ul className={cx("list-container", "gray-scrollbar")}>
        {data.map((item, index) => (
          <li key={index} className={styles["list-item"]}>
            <div>
              <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
              <p className={styles["list-item__date"]}>
                {item.start_date} ~ {item.end_date}
              </p>
            </div>
            <Button reverseColor={true} onClick={handleClickDetailBtn(item.id, item.title)}>
              예매 현황
            </Button>
          </li>
        ))}
      </ul>

      {openModal.state && openModal.type === "list" && (
        <Modal title={modalTitle}>
          <ReservationListModal id={clickedId} />
        </Modal>
      )}
    </>
  );
};

export default ReservationManage;
