import React, { useState } from "react";
import { Button, InputField, RadioButtonGroup } from "@/components/common";
import useInputs from "@/hooks/useInputs";
import styles from "./PostUpload.module.css";

const categoryList = ["공연", "전시", "스포츠"];
const concertCategoryList = ["음악", "연극", "기타"];
const sportsCategoryList = ["야구", "축구", "농구"];
const dummyItem = {
  main_image_url: "/concert-img.jpg",
  sub_images_url: ["/concert-img2.jpg", "/concert-img3.jpg", "/card-image.png"],
  show_type: "공연",
  show_sub_type: "연극",
  title: "서울대학교 산업디자인학과 23년 졸전으로 오세영~",
  univ: "서울대학교",
  department: "산업디자인학과",
  start_date: "2023-12-10",
  end_date: "2023-12-17",
  location: "서울특별시 강남구 서울특별시 강남구 테헤란로 443 애플트리타워/2충",
  // position: { lat: 37.5069494959122, lng: 127.055596615858 },
  tags: ["css", "html", "javascript"],
  content: "<h1>많은 관심 부탁드립니다</h1>",
  is_reservation: "아니오",
  method: "구글폼",
  google_form_url: "",
  price: "0",
  notice:
    "<p>본 예매는 1인 1예매로 진행됩니다.</p><p>본 공연은 좌석 지정이 불가합니다.</p><p>예매는 해당 회차의 공연 전 날 정오에 마감됩니다.</p><p>예매 확정 문자는 전송되지 않습니다.</p><p>별도의 연락이 없는 경우 예매 확정입니다.</p><p> 예매 후 공연 관람이 불가한 경우, 카카오톡 채널로 연락주시기 바랍니다.</p><p>개인 연락처를 통한 문의는 회신하지 않습니다.</p><p> 예매 취소 및 관련 문의: 카카오톡 채널 동국대학교 ALL SHOOK UP</p>",
};

const PostUpload = () => {
  const [initialForm, setInitialForm] = useState({
    ...dummyItem,
    location1: dummyItem.location.split("/")[0],
    location2: dummyItem.location.split("/")[1],
  });
  const [form, onChange] = useInputs(initialForm);
  return (
    <form className={styles["post-upload-section-form"]}>
      <section>
        <h2>공연/전시/스포츠 이미지</h2>
      </section>

      <section>
        <h2>카테고리</h2>
        <RadioButtonGroup radioList={categoryList} name="show_type" onChange={onChange} />
        {form.show_type === "공연" && <RadioButtonGroup radioList={concertCategoryList} name="show_sub_type" onChange={onChange} />}
        {form.show_type === "스포츠" && <RadioButtonGroup radioList={sportsCategoryList} name="show_sub_type" onChange={onChange} />}
      </section>

      <section>
        <h2 className="a11y-hidden">주최 정보</h2>
        <InputField type="text" name="title" placeholder="제목을 입력해주세요." value={form.title as string}>
          제목
        </InputField>
        <InputField type="text" name="univ" placeholder="대학을 입력해주세요." value={form.univ as string}>
          대학
        </InputField>
        <InputField type="text" name="department" placeholder="학과 또는 학부를 입력해주세요." value={form.department as string}>
          학과
        </InputField>
      </section>

      <section>
        <h2>기간</h2>
        <div className={styles["l_date"]}>
          <InputField type="text" name="start_date" placeholder="시작일" value={form.start_date as string} labelHidden>
            시작일
          </InputField>
          <InputField type="text" name="start_date" placeholder="종료일" value={form.end_date as string} labelHidden>
            종료일
          </InputField>
        </div>
      </section>

      <section>
        <h2>주소</h2>
        <div className={styles["l_address"]}>
          <InputField type="text" name="location1" placeholder="도로명 주소" value={form.location1 as string} labelHidden>
            도로명 주소
          </InputField>
          <Button>주소 찾기</Button>
        </div>
        <InputField type="text" name="location1" placeholder="상세 주소" value={form.location2 as string} labelHidden>
          상세 주소
        </InputField>
      </section>

      <section>
        <h2>태그</h2>
      </section>

      <section>
        <h2>소개</h2>
      </section>

      <section>
        <h2>예매 여부</h2>
        <RadioButtonGroup radioList={["예", "아니오"]} name="is_reservation" defaultValue={form.is_reservation as string} onChange={onChange} />
        {form.is_reservation === "예" && (
          <>
            <h3>예매 방법</h3>
            <RadioButtonGroup radioList={["구글폼", "예매 대행"]} name="method" defaultValue={form.method as string} onChange={onChange} />
            {form.method === "구글폼" ? (
              <InputField type="url" name="google_form_url" labelHidden>
                구글폼url
              </InputField>
            ) : (
              // <ReservationFrom />
              <div>예매 대행 form</div>
            )}
          </>
        )}
      </section>
    </form>
  );
};

export default PostUpload;
