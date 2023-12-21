import React, { useEffect, useState } from "react";
import { Button, DatePicker, DeleteButton, Editor, InputField, RadioButtonGroup, TagInput } from "@/components/common";
import { Postcode } from "@/components/mypage";
import useInputs from "@/hooks/useInputs";
import { ReservationForm } from "..";
import ImgUploadIcon from "@/assets/ImgUploadIcon.svg?react";
import reduceImageSize from "@/utils/reduceImageSize";
import convertArrayToObject from "@/utils/convertArrayToObject";
import { useColor } from "color-thief-react";
import { DateInputType, ShowReservationInfoType, ShowType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import postShow from "@/apis/postShow";
import { toast } from "react-toastify";
import styles from "./PostUpload.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const categoryList = ["공연", "전시", "스포츠"];
const concertCategoryList = ["음악", "연극", "기타"];
const sportsCategoryList = ["야구", "축구", "농구"];
const isReservationList = ["예", "아니오"];
const methodList = ["구글폼", "예매 대행"];

const showingDummy: ShowType = {
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
  content: "",
  is_reservation: 1,
  // user_liked: 0,
  created_at: "2023-12-07T23:28:49.000Z",
};

const showReservationInfoDummy: ShowReservationInfoType = {
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

// TODO: api type
const showTimesDummy = {
  show_id: 1,
  date_time: '{"1": "2023/12/08 - 오후 1시", "2": "2023/12/08 - 오후 5시", "3": "2023/12/10 - 오후 1시", "4": "2023/12/10 - 오후 5시"}',
  head_count: 20,
};

// 인코딩
function bytesToBase64(bytes: Uint8Array): string {
  const binString = String.fromCodePoint(...Array.from(bytes));
  return btoa(binString);
}

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
    position: (showingDummy.position && JSON.parse(showingDummy.position)) || { lat: 0, lng: 0 },
    tags: [],
    content: "",
    is_reservation: showingDummy.is_reservation ? "예" : "아니오",
    method: showReservationInfoDummy.method === "google" ? "구글폼" : "예매 대행",
    google_form_url: showReservationInfoDummy.google_form_url || "",
    price: showReservationInfoDummy.price || 0,
    head_count: showReservationInfoDummy.head_count || 0,
    date_time: (showTimesDummy.date_time && Object.values(JSON.parse(showTimesDummy.date_time))) || [],
    notice: showReservationInfoDummy.notice || "",
  });
  const [form, onChange] = useInputs(initialForm);

  const [tagsInput, setTagInputs] = useState<string[]>([]);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreviewUrls, setImgPreviewUrls] = useState<string[]>([]);
  const [location, setLocation] = useState<string>(form.location || "");
  const [position, setPosition] = useState(form.position);
  const [date, setDate] = useState({
    start_date: showingDummy.start_date || "",
    end_date: showingDummy.end_date || "",
  });
  const [editorData, setEditorData] = useState<string>("");
  const [editorNoticeData, setEditorNoticeData] = useState<string>("");
  const initialList = form.date_time?.map((item) => {
    const [date, time] = item.split(" - ");
    return { date, time };
  });
  const [roundList, setRoundList] = useState(initialList);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImgFiles([...imgFiles, ...e.target.files]);
    const previewImgSrc = [...e.target.files].map((file) => URL.createObjectURL(file));
    setImgPreviewUrls([...imgPreviewUrls, ...previewImgSrc]);
  };
  const handleRemoveImage = (image: string) => {
    const deleteImgIndex = imgPreviewUrls.indexOf(image);
    // file 객체 리스트에서 제거
    const newImgFiles = [...imgFiles.slice(0, deleteImgIndex), ...imgFiles.slice(deleteImgIndex + 1)];
    setImgFiles(newImgFiles);
    // 미리보기 blob url 리스트에서 제거
    setImgPreviewUrls((prev) => prev.filter((previewUrl) => previewUrl !== image));
  };
  useEffect(() => {
    return () => {
      if (imgPreviewUrls) {
        imgPreviewUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl));
      }
    };
  }, [imgPreviewUrls]);

  const handleDateInput = (event: DateInputType) => {
    const { name, value } = event.target;
    setDate({ ...date, [name]: value });
  };

  const handleChangeTags = (tags: string[]) => {
    setTagInputs(tags);
  };

  const { data: main_image_color } = useColor(imgPreviewUrls[0], "hex");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imgFiles.length) {
      toast.error("이미지를 1개 이상 업로드 해주세요.");
      return;
    }
    if (imgFiles.length > 10) {
      toast.error("이미지를 10개 이하로 업로드 해주세요.");
      return;
    }
    if (!form.title || !form.univ || !form.department) {
      toast.error("주최자 정보를 입력해주세요.");
      return;
    }
    if (!date.start_date || !date.end_date) {
      toast.error("기간을 입력해주세요.");
      return;
    }
    if (!location) {
      toast.error("주소를 입력해주세요.");
      return;
    }
    if (form.is_reservation === "예") {
      if (form.method === "구글폼" && !form.google_form_url) {
        toast.error("구글폼 URL을 입력해주세요.");
        return;
      }
      if (form.method === "예매 대행" && !form.price && !form.head_count && !form.date_time && !form.notice) {
        toast.error("예매 작성 폼을 완성해주세요.");
        return;
      }
    }

    const resizedImgFiles = await Promise.all(
      imgFiles.map(async (file) => {
        const blobString = URL.createObjectURL(file);
        const jpeg = await reduceImageSize(blobString);
        return new File([jpeg], new Date().toISOString(), { type: "image/jpeg" });
      }),
    );

    const tags = (tagsInput.length && JSON.stringify(convertArrayToObject(tagsInput))) || null;

    const base64EncodedContents = (!!editorData && bytesToBase64(new TextEncoder().encode(editorData))) || null;
    const base64EncodedNotice =
      (form.method === "예매 대행" && !!editorNoticeData && bytesToBase64(new TextEncoder().encode(editorNoticeData))) || null;

    const roundListToDateTime = () => {
      return roundList.map((item) => item.date + " - " + item.time);
    };

    const result = {
      ...form,
      main_image_url: resizedImgFiles[0],
      sub_images_url: resizedImgFiles.slice(1),
      main_image_color,
      show_sub_type: form.show_type === "전시" ? null : form.show_sub_type,
      start_date: date.start_date,
      end_date: date.end_date,
      location,
      position: JSON.stringify(position),
      tags,
      content: base64EncodedContents,
      is_reservation: form.is_reservation === "예" ? "1" : "0",
      method: form.is_reservation === "예" ? (form.method === "구글폼" ? "google" : "agency") : null,
      google_form_url: (form.method === "구글폼" && form.google_form_url) || null,
      price: (form.method === "예매 대행" && form.price) || null,
      head_count: (form.method === "예매 대행" && form.head_count) || null,
      date_time: (form.method === "예매 대행" && JSON.stringify(convertArrayToObject(roundListToDateTime()))) || null,
      notice: base64EncodedNotice,
    };
    console.log(result);

    const formData = new FormData();

    // 이미지 파일
    formData.append("mainImage", result.main_image_url); // 메인 이미지
    for (let i = 0; i < result.sub_images_url.length; i++) {
      formData.append("subImages", result.sub_images_url[i]); // 서브 이미지
    }

    const fileNames: { [key: number]: string } = {};
    result.sub_images_url.forEach((file, index) => (fileNames[index + 1] = file.name));

    // 텍스트
    formData.append("show_type", result.show_type);
    result.show_sub_type && formData.append("show_sub_type", result.show_sub_type);
    formData.append("title", result.title);
    formData.append("start_date", result.start_date);
    formData.append("end_date", result.end_date);
    formData.append("location", result.location);
    result.location_detail && formData.append("location_detail", result.location_detail);
    formData.append("position", result.position);
    formData.append("main_image_color", result.main_image_color as string);
    formData.append("sub_images_url", JSON.stringify(fileNames));
    formData.append("univ", result.univ);
    formData.append("department", result.department);
    result.tags && formData.append("tags", result.tags);
    formData.append("content", result.content);
    result.is_reservation && formData.append("is_reservation", result.is_reservation);
    result.method && formData.append("method", result.method);
    result.google_form_url && formData.append("google_form_url", result.google_form_url);
    result.price && formData.append("price", result.price.toString());
    result.head_count && formData.append("head_count", result.head_count.toString());
    result.notice && formData.append("notice", result.notice);
    result.date_time && formData.append("date_time", result.date_time);

    mutate(formData);
  };

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => postShow(formData),
    onSuccess: (data) => {
      if (data) toast("게시글 업로드 성공");
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
            {imgPreviewUrls.map((image) => (
              <li key={image}>
                <div className={styles["img-cover"]}>
                  <img src={image} alt="" />
                  <DeleteButton spanHidden="해당 이미지 삭제" onClick={() => handleRemoveImage(image)} forImage />
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
        <InputField type="text" name="title" placeholder="제목을 입력해주세요." value={form.title} onChange={onChange} style={{ padding: "0 1rem" }}>
          제목
        </InputField>
        <InputField type="text" name="univ" placeholder="대학을 입력해주세요." value={form.univ} onChange={onChange} style={{ padding: "0 1rem" }}>
          대학
        </InputField>
        <InputField
          type="text"
          name="department"
          placeholder="학과 또는 학부를 입력해주세요."
          value={form.department}
          onChange={onChange}
          style={{ padding: "0 1rem" }}
        >
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
          <InputField type="text" name="location" placeholder="도로명 주소" value={location} labelHidden style={{ padding: "0 1rem" }} readOnly>
            도로명 주소
          </InputField>
          <Postcode setPosition={setPosition} setLocation={setLocation} />
        </div>
        <InputField
          type="text"
          name="location_detail"
          placeholder="상세 주소"
          value={form.location_detail}
          onChange={onChange}
          labelHidden
          style={{ padding: "0 1rem" }}
        >
          상세 주소
        </InputField>
      </section>

      <section className={styles["tags-section"]}>
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
              <ReservationForm
                form={form}
                onChange={onChange}
                roundList={roundList}
                setRoundList={setRoundList}
                editorNoticeData={editorNoticeData}
                setEditorNoticeData={setEditorNoticeData}
              />
            )}
          </>
        )}
      </section>

      <Button type="submit">업로드하기</Button>
    </form>
  );
};

export default PostUpload;
