import React, { useEffect, useState } from "react";
import { Button, DatePicker, Editor, InputField, RadioButtonGroup, TagInput } from "@/components/common";
import useInputs from "@/hooks/useInputs";
import { ReservationForm } from "..";
import ImgUploadIcon from "@/assets/ImgUploadIcon.svg?react";
import reduceImageSize from "@/utils/reduceImageSize";
import converArrayToObject from "@/utils/convertArrayToObject";
import { useColor } from "color-thief-react";
import { DateInputType, ShowReservationInfoType, ShowType } from "@/types";
import styles from "./PostUpload.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const categoryList = ["공연", "전시", "스포츠"];
const concertCategoryList = ["음악", "연극", "기타"];
const sportsCategoryList = ["야구", "축구", "농구"];
const isReservationList = ["예", "아니오"];
const methodList = ["구글폼", "예매 대행"];

const dummyItem: ShowType = {
  id: 1,
  main_image_url: "/show/aaadb1cf-d39e-4e80-a0f3-32d01361ad05.jpg",
  sub_images_url:
    '{"1": "/show/f48b59ae-f78a-4d89-8dd4-a2c0f2ff7c30.jpg", "2": "/show/3549261d-30db-4dba-af06-9448557adce5.jpg", "3": "/show/0ff57092-4957-4c5c-9d45-35b34d6b02ab.png", "4": "/show/404670852_18168423643293747_605813767255233837_n.jpg"}',
  main_image_color: null,
  show_type: "",
  show_sub_type: "",
  title: "사랑의 묘약",
  univ: "서울대학교",
  department: "산업디자인학과",
  start_date: "2023-12-01",
  end_date: "2023-12-07",
  location: "서울시 강남구 대학로 예술극장",
  location_detail: null,
  position: '{"lat": 37.5069494959122, "lng": 127.055596615858}',
  tags: '{"1": "abc", "2": "def", "3": "ghi"}',
  content: {
    type: "Buffer",
    data: [
      236, 130, 172, 235, 158, 145, 236, 157, 152, 32, 235, 172, 152, 236, 149, 189, 32, 236, 151, 176, 234, 183, 185, 32, 235, 130, 180, 236, 154,
      169, 46, 46, 46,
    ],
  },
  is_reservation: 1,
  created_at: "2023-12-07T23:28:49.000Z",
};

const reservationDummyItem: ShowReservationInfoType = {
  id: 1,
  show_id: 1,
  method: "agency",
  google_form_url: null,
  price: 1000,
  location: "서울시 강남구 대학로 예술극장",
  location_detail: null,
  position: '{"lat": 37.5069494959122, "lng": 127.055596615858}',
  head_count: 20,
  notice: {
    type: "Buffer",
    data: [
      236, 130, 172, 235, 158, 145, 236, 157, 152, 32, 235, 172, 152, 236, 149, 189, 32, 236, 151, 176, 234, 183, 185, 32, 235, 130, 180, 236, 154,
      169, 46, 46, 46,
    ],
  },
};

// TODO: 수정 페이지 고려
const PostUpload = () => {
  const [initialForm, setInitialForm] = useState({
    main_image_url: "",
    sub_images_url: [],
    show_type: "공연",
    show_sub_type: "연극",
    title: "",
    univ: "",
    department: "",
    start_date: "",
    end_date: "",
    location: "",
    location_detail: "",
    position: {},
    tags: [],
    content: "",
    is_reservation: dummyItem.is_reservation ? "예" : "아니오",
    method: reservationDummyItem.method === "google" ? "구글폼" : "예매 대행",
    google_form_url: reservationDummyItem.google_form_url || "",
    price: reservationDummyItem.price || 0,
    head_count: reservationDummyItem.head_count || 0,
    notice: reservationDummyItem.notice || "",
  });
  const [form, onChange] = useInputs(initialForm);

  const [tagsInput, setTagInputs] = useState<string[]>([]);
  const [objUrls, setObjUrls] = useState<string[]>([]);
  const [date, setDate] = useState({
    start_date: dummyItem.start_date || "",
    end_date: dummyItem.end_date || "",
  });
  const [editorData, setEditorData] = useState<string>("");

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const previewImgSrc = [...e.target.files].map((file) => URL.createObjectURL(file));
    setObjUrls([...objUrls, ...previewImgSrc]);
  };
  useEffect(() => {
    return () => {
      if (objUrls) {
        objUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl));
      }
    };
  }, [objUrls]);

  const handleDateInput = (event: DateInputType) => {
    const { name, value } = event.target;
    setDate({ ...date, [name]: value });
  };

  const handleChangeTags = (tags: string[]) => {
    setTagInputs(tags);
  };

  const { data: main_image_color } = useColor(objUrls[0], "hex");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!objUrls) return;
    const imgFiles = await Promise.all(
      objUrls.map(async (objUrl) => {
        const jpeg = await reduceImageSize(objUrl);
        return new File([jpeg], new Date().toString(), { type: "image/jpeg" });
      }),
    );

    // if (!tagsInput) return;
    const tags = JSON.stringify(converArrayToObject(tagsInput));

    const base64EncodedContents = btoa(encodeURIComponent(editorData));

    const result = {
      ...form,
      main_image_url: imgFiles[0],
      sub_images_url: imgFiles.slice(1),
      main_image_color,
      show_sub_type: form.show_type === "전시" ? null : form.show_sub_type,
      start_date: date.start_date,
      end_date: date.end_date,
      tags,
      method: form.method === "구글폼" ? "google" : "agency",
      contents: base64EncodedContents,
    };
    console.log(result);

    // const formData = new FormData();

    // // 이미지 파일
    // formData.append('mainImage', file[0])               // 메인 이미지
    // for (let i = 0; i<files.length; i++) {
    // 	formData.append('subImages', files[i] || null)    // 서브 이미지
    // }

    // // 텍스트
    // formData.append('show_type', '공연' || '전시')
    // formData.append('show_sub_type', '연극' || '음악' || '기타' || null)
    // formData.append('title', '제목')
    // formData.append('start_date', '2023-12-16')
    // formData.append('end_date', '2023-12-16')
    // formData.append('location', '도로명주소')
    // formData.append('location_detail', '상세주소' || null)
    // formData.append('position', JSON.strigify({"lat":37.5069494959122,"lng":127.055596615858}))
    // formData.append('main_image_url', '이미지 파일 이름')
    // formData.append('main_image_color', '#123456' || null)
    // formData.append('sub_images_url', JSON.strigify({1: "이미지 이름", 2: "이미지 이름"}) || null)
    // formData.append('univ', '서울대학교')
    // formData.append('department', '디자인학과')
    // formData.append('tags', JSON.strigify({1: "a", 2: "b"}) || null)
    // formData.append('content', btoa(unescape(encodeURIComponent(content innerHTML 값))))
    // formData.append('is_reservation', '0' || '1')
    // formData.append('method', 'agency' || 'google' || null)
    // formData.append('google_form_url', '구글 폼 주소' || null)
    // formData.append('price', 1000 || null)
    // formData.append('head_count', 20 || null)
    // formData.append('notice', btoa(unescape(encodeURIComponent(notice innerHTML 값))) || null)
  };

  return (
    <form className={styles["post-upload-section-form"]} onSubmit={handleSubmit}>
      <section>
        <h2 className={styles["title"]}>공연/전시/스포츠 이미지</h2>
        <div className={styles["upload-imgs-wrapper"]}>
          <label className={styles["upload-img-input"]}>
            <ImgUploadIcon />
            <input type="file" accept="image/*" multiple onChange={handleChangeImage} />
          </label>
          <ul className={styles["imgs-list"]}>
            {objUrls.map((image) => (
              <li key={image}>
                <div className={styles["img-cover"]}>
                  <img src={image} alt="" />
                  <button type="button" className={styles["img-delete-btn"]}>
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className={styles["title"]}>카테고리</h2>
        <RadioButtonGroup radioList={categoryList} name="show_type" onChange={onChange} />
        {form.show_type === "공연" && (
          <RadioButtonGroup radioList={concertCategoryList} name="show_sub_type" defaultValue={form.show_sub_type} onChange={onChange} />
        )}
        {form.show_type === "스포츠" && (
          <RadioButtonGroup radioList={sportsCategoryList} name="show_sub_type" defaultValue={form.show_sub_type} onChange={onChange} />
        )}
      </section>

      <section>
        <h2 className={cx("a11y-hidden", "title")}>주최 정보</h2>
        <InputField type="text" name="title" placeholder="제목을 입력해주세요." value={form.title} onChange={onChange}>
          제목
        </InputField>
        <InputField type="text" name="univ" placeholder="대학을 입력해주세요." value={form.univ} onChange={onChange}>
          대학
        </InputField>
        <InputField type="text" name="department" placeholder="학과 또는 학부를 입력해주세요." value={form.department} onChange={onChange}>
          학과
        </InputField>
      </section>

      <section>
        <h2 className={styles["title"]}>기간</h2>
        <div className={styles["l_date"]}>
          <DatePicker type="period" startDate={date.start_date} endDate={date.end_date} onChange={handleDateInput} />
        </div>
      </section>

      <section>
        <h2 className={styles["title"]}>주소</h2>
        <div className={styles["l_address"]}>
          <InputField type="text" name="location" placeholder="도로명 주소" value={form.location} onChange={onChange} labelHidden>
            도로명 주소
          </InputField>
          <Button>주소 찾기</Button>
        </div>
        <InputField type="text" name="location_detail" placeholder="상세 주소" value={form.location_detail} onChange={onChange} labelHidden>
          상세 주소
        </InputField>
      </section>

      <section>
        <h2 className={styles["title"]}>태그</h2>
        <TagInput handleChange={handleChangeTags} />
      </section>

      <section>
        <h2 className={styles["title"]}>소개</h2>
        <Editor editorData={editorData} setEditorData={setEditorData} />
      </section>

      <section>
        <h2 className={styles["title"]}>예매 여부</h2>
        <RadioButtonGroup radioList={isReservationList} name="is_reservation" defaultValue={form.is_reservation} onChange={onChange} />
        {form.is_reservation === "예" && (
          <>
            <h3 className={styles["title"]}>예매 방법</h3>
            <RadioButtonGroup radioList={methodList} name="method" defaultValue={form.method} onChange={onChange} />
            {form.method === "구글폼" ? (
              <InputField
                type="url"
                name="google_form_url"
                placeholder="구글폼 URL을 입력해주세요."
                labelHidden
                value={form.google_form_url}
                onChange={onChange}
                // pattern="https://.*"
              >
                구글폼url
              </InputField>
            ) : (
              <ReservationForm />
            )}
          </>
        )}
      </section>

      <Button type="submit">업로드하기</Button>
    </form>
  );
};

export default PostUpload;
