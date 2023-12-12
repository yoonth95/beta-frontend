import React, { useState } from "react";
import { Button, CheckBox, InputField, InputFieldGroup, RadioButtonGroup } from "@/components/common";
import useInputs from "@/hooks/useInputs";
import styles from "./ReservationFormModal.module.css";
import { EmailValues, PhoneValues } from "@/components/common/InputFieldGroup/InputFieldGroupType";

const item = {
  show_id: 1,
  location: "이해랑예술극장",
  position: { lat: 123, lng: 123 },
  price: "0",
  notice:
    "<p>본 예매는 1인 1예매로 진행됩니다.</p><p>본 공연은 좌석 지정이 불가합니다.</p><p>예매는 해당 회차의 공연 전 날 정오에 마감됩니다.</p><p>예매 확정 문자는 전송되지 않습니다.</p><p>별도의 연락이 없는 경우 예매 확정입니다.</p><p> 예매 후 공연 관람이 불가한 경우, 카카오톡 채널로 연락주시기 바랍니다.</p><p>개인 연락처를 통한 문의는 회신하지 않습니다.</p><p> 예매 취소 및 관련 문의: 카카오톡 채널 동국대학교 ALL SHOOK UP</p>",
  date_time: ["2023-12-08 - 14시", "2023-12-08 - 19시", "2023-12-09 - 14시", "2023-12-09 - 19시"],
  user_name: "이멋사",
  user_email: "nice@gmail.com",
  user_id: "22",
  phone_number: "010-4700-0007",
  // 00대학교 oo학과 및 '제목' 필요
};

const ReservationFormModal = () => {
  const { location, price, notice, date_time, user_name, user_email, phone_number } = item;
  const [phone1, phone2, phone3] = phone_number.split("-");
  const [email1, email2] = user_email.split("@");
  const [initialForm, setInitialForm] = useState({
    round: "",
    name: user_name,
    phone: { phone1, phone2, phone3 },
    email: { email1, email2 },
    emailReceive: false,
  });
  const [form, onChange] = useInputs(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { round, name, phone, email, emailReceive } = form;
    console.log(form);
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
        <div>{notice}</div>
      </div>

      <form id="reservation" onSubmit={handleSubmit}>
        <div className={styles["show-round"]}>
          <h2>회차 선택</h2>
          <RadioButtonGroup radioList={date_time} name="round" onChange={onChange} flexDirectionColumn />
        </div>

        <div className={styles["show-reservation-user-info"]}>
          <h2>예약자 정보</h2>
          <InputField required type="text" name="name" placeholder="이름을 입력해주세요." value={form.name as string} onChange={onChange}>
            이름
          </InputField>
          <InputFieldGroup required type="phone" name="phone" values={form.phone as PhoneValues} onChange={onChange} />
          <InputFieldGroup required type="email" name="email" values={form.email as EmailValues} onChange={onChange} />
          <CheckBox inputId="이메일받기" name="emailReceive" checked={form.emailReceive as boolean} onChange={onChange}>
            예약 완료 이메일 전송 동의
          </CheckBox>
        </div>
      </form>

      {/* 공연일때만 적용 */}
      {/* <div className={styles["show-agreement"]}>
        <h2 className="a11y-hidden">동의서</h2>
        <CheckBox inputId="외부 유출 금지 동의">
          본 공연에 대한 권리는 모두 00대학교 oo학과 및 '제목' 제작진에게 있으므로 관람 시 무단 녹화, 캡처, 녹음 및 유출 등 모든 외부 유출을 절대
          금지합니다.
        </CheckBox>
        <CheckBox inputId="노쇼 (NO SHOW) 및 양도 방지">
          예매자 본인은 본 공연을 관람 가능한 일시에 예매 하고 있으며, 확정된 예매 티켓을 타인에게 무단으로 양도하지 않을 것을 동의합니다. 이후 사전에
          취소 절차를 진행하지 않고 공연을 노쇼(NO SHOW)하게 될 경우 이에 따르는 불이익을 예매자 본인이 책임지는 것에 동의합니다.
          <span>*노쇼 (NO SHOW)및 무단양도 관객의 경우 다음 oo대학교 oo학과 공연 예매가 제한 될 수 있음을 안내드립니다.</span>
        </CheckBox>
      </div> */}

      <Button type="submit" form="reservation">
        예매하기
      </Button>
    </section>
  );
};

export default ReservationFormModal;
