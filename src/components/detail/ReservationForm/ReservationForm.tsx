import { Button, CheckBox, InputField, InputFieldGroup, RadioButtonGroup } from "@/components/common";
import useInputs from "@/hooks/useInputs";
import { UserReservationFormType, UserReservationInputsType, AgencyReservationInfoType, MemberType } from "@/types";
import styles from "./ReservationForm.module.css";

interface PropsType {
  showInfo: AgencyReservationInfoType;
  userInfo: MemberType;
  goToPaymentStep: () => void;
}

const ReservationForm: React.FC<PropsType> = ({ showInfo, userInfo, goToPaymentStep }) => {
  const [form, onChange] = useInputs<UserReservationInputsType>({
    show_times_id: 0,
    is_receive_email: false,
  });

  const { location, price, notice, date_time } = showInfo;
  const show_date_time = date_time.map((item) => item.date_time);

  const { user_name, user_email, phone_number } = userInfo;
  const [email1, email2] = user_email.split("@");
  const [phone1, phone2, phone3] = phone_number.split("-");
  const noticeBufferData = notice && new Uint8Array(notice.data);
  const noticeDecodedString = noticeBufferData && new TextDecoder("utf-8").decode(noticeBufferData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: UserReservationFormType = {
      user_id: userInfo.id,
      show_id: showInfo.show_id,
      show_times_id: form.show_times_id,
      is_receive_email: form.is_receive_email ? 1 : 0,
    };
    if (price === 0) {
      //  post 요청
      return;
    }

    goToPaymentStep();
  };

  return (
    <>
      <div className={styles["show-info"]}>
        <h2>공연 정보</h2>
        <p>
          <span>장소: </span>
          {location}
        </p>
        <p>
          <span>가격: </span>
          {price}원
        </p>
      </div>

      <div className={styles["show-notice"]}>
        <h2>티켓 예매 시 유의 사항</h2>
        <div>{noticeDecodedString}</div>
      </div>

      <form id="reservation" onSubmit={handleSubmit}>
        <div className={styles["show-round"]}>
          <h2>회차 선택</h2>
          <RadioButtonGroup radioList={show_date_time} name="round" onChange={onChange} flexDirectionColumn />
        </div>

        <div className={styles["show-reservation-user-info"]}>
          <h2>예약자 정보</h2>
          <InputField type="text" name="name" value={user_name} readOnly>
            이름
          </InputField>
          <InputFieldGroup type="phone" name="phone" values={{ phone1, phone2, phone3 }} readOnly />
          <InputFieldGroup type="email" name="email" values={{ email1, email2 }} readOnly />

          <CheckBox inputId="이메일받기" name="is_receive_email" checked={!!form.is_receive_email} onChange={onChange}>
            예약 완료 이메일 전송 동의
          </CheckBox>
        </div>
      </form>

      <Button type="submit" form="reservation">
        예매하기
      </Button>
    </>
  );
};

export default ReservationForm;

{
  /* TODO: show_sub_type일때  */
}
{
  /* {show_sub_type === "연극" && (
        <div className={styles["show-agreement"]}>
          <h2 className="a11y-hidden">동의서</h2>
          <CheckBox inputId="외부 유출 금지 동의">
            본 공연에 대한 권리는 모두 00대학교 oo학과 및 '제목' 제작진에게 있으므로 관람 시 무단 녹화, 캡처, 녹음 및 유출 등 모든 외부 유출을 절대
            금지합니다.
          </CheckBox>
          <CheckBox inputId="노쇼 (NO SHOW) 및 양도 방지">
            예매자 본인은 본 공연을 관람 가능한 일시에 예매 하고 있으며, 확정된 예매 티켓을 타인에게 무단으로 양도하지 않을 것을 동의합니다. 이후
            사전에 취소 절차를 진행하지 않고 공연을 노쇼(NO SHOW)하게 될 경우 이에 따르는 불이익을 예매자 본인이 책임지는 것에 동의합니다.
            <span>*노쇼 (NO SHOW)및 무단양도 관객의 경우 다음 oo대학교 oo학과 공연 예매가 제한 될 수 있음을 안내드립니다.</span>
          </CheckBox>
        </div>
      )} */
}
