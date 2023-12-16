import { useQuery } from "@tanstack/react-query";
import { Button, CheckBox, InputField, InputFieldGroup, RadioButtonGroup } from "@/components/common";
import useInputs from "@/hooks/useInputs";
import { getUserInfo } from "@/apis";
import styles from "./ReservationFormModal.module.css";

// TODO: show_times API 연결
const show_times_data = ["2023/12/08 - 오후 1시", "2023/12/08 - 오후 7시", "2023/12/10 - 오후 1시", "2023/12/10 - 오후 7시"];

const ReservationFormModal = ({ showReservationInfo }) => {
  const [form, onChange] = useInputs({
    show_times_id: "",
    is_receive_email: 0,
  });

  const {
    status,
    error,
    data: userInfo,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo("yoonth0919"), // TODO: 로그인 정보에서 아이디 값 가져오기
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const { location, price, notice } = showReservationInfo;
  const { user_name, user_email, phone_number } = userInfo;

  const [email1, email2] = user_email.split("@");
  const [phone1, phone2, phone3] = phone_number.split("-");
  const noticeBufferData = new Uint8Array(notice.data);
  const noticeDecodedString = new TextDecoder("utf-8").decode(noticeBufferData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {
      user_id: userInfo.user_id,
      show_id: showReservationInfo.show_id,
      show_times_id: form.show_times_id,
      is_receive_email: form.is_receive_email ? 1 : 0,
    };
    console.log(result);
  };

  return (
    <section className={styles["reservation-section"]}>
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
          <RadioButtonGroup radioList={show_times_data} name="round" onChange={onChange} flexDirectionColumn />
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

      {/* TODO: show_sub_type일때  */}
      {/* {show_sub_type === "연극" && (
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
      )} */}

      <Button type="submit" form="reservation">
        예매하기
      </Button>
    </section>
  );
};

export default ReservationFormModal;
