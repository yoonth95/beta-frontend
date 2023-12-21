import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReservationForm, ReservationPayment } from "..";
import { useLoginStore } from "@/stores/useLoginStore";
import { AgencyReservationInfoType } from "@/types";
import { getUserInfo } from "@/apis";
import styles from "./ReservationModal.module.css";

interface PropsType {
  agencyReservationInfo: AgencyReservationInfoType;
}
const ReservationModal: React.FC<PropsType> = ({ agencyReservationInfo }) => {
  const [step, setStep] = useState("form");

  const goToPaymentStep = () => {
    setStep("payment");
  };

  const {
    userState: { login_id },
  } = useLoginStore();
  const {
    status,
    error,
    data: userInfo,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(login_id),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <section className={styles["reservation-section"]}>
      {step === "form" && <ReservationForm showInfo={agencyReservationInfo} userInfo={userInfo} goToPaymentStep={goToPaymentStep} />}

      {step === "payment" && <ReservationPayment showInfo={agencyReservationInfo} userInfo={userInfo} />}
    </section>
  );
};

export default ReservationModal;
