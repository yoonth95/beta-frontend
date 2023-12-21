import React, { useEffect, useState } from "react";
import { Button, DatePicker, DeleteButton, Editor, InputField, RadioButtonGroup, TagInput } from "@/components/common";
import { Postcode } from "@/components/main";
import { ReservationForm } from "..";
import ImgUploadIcon from "@/assets/ImgUploadIcon.svg?react";
import reduceImageSize from "@/utils/reduceImageSize";
import convertArrayToObject from "@/utils/convertArrayToObject";
import { useColor } from "color-thief-react";
import { DateInputType, DateWithTime } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import styles from "./PostUpdate.module.css";
import classNames from "classnames/bind";
import { deleteShow, getShowInfo, getShowReservationInfo, putShow } from "@/apis";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const categoryList = ["공연", "전시", "스포츠"];
const concertCategoryList = ["음악", "연극", "기타"];
const sportsCategoryList = ["야구", "축구", "농구"];
const isReservationList = ["예", "아니오"];
const methodList = ["구글폼", "예매 대행"];

// 인코딩
function bytesToBase64(bytes: Uint8Array): string {
  const binString = String.fromCodePoint(...Array.from(bytes));
  return btoa(binString);
}

// 디코딩
function base64ToBytes(base64: string): Uint8Array {
  try {
    const binString = window.atob(base64);
    return Uint8Array.from(binString, (c) => c.codePointAt(0) ?? 0);
  } catch (error) {
    console.error("Error decoding base64:", error);
    return new Uint8Array();
  }
}

const roundListToDateTime = (roundList) => {
  return roundList.map((item) => item.date + " - " + item.time);
};

const PostUpdate = () => {
  const navigate = useNavigate();
  const locationObj = useLocation();
  const showId = locationObj.state || undefined;

  // 게시글 정보
  const [showType, setShowType] = useState(categoryList[0]);
  const [showSubType, setShowSubType] = useState(concertCategoryList[0]);
  const [title, setTitle] = useState("");
  const [univ, setUniv] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<object>({});
  const [locationDetail, setLocationDetail] = useState("");
  const [tagsInput, setTagInputs] = useState<string[]>([]);
  const [isReservation, setIsReservation] = useState(isReservationList[1]);

  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreviewUrls, setImgPreviewUrls] = useState<string[]>([]);
  const [imgExistingUrls, setImgExistingUrls] = useState<string[]>([]);
  const { data: main_image_color } = useColor(imgPreviewUrls[0], "hex");
  const [editorData, setEditorData] = useState<string>("");

  // 게시글 예매 정보
  const [method, setMethod] = useState(methodList[0]);
  const [googleFormUrl, setGoogleFormUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [headCount, setHeadCount] = useState<number | null>(null);
  const [roundList, setRoundList] = useState<DateWithTime[]>([]);
  const [editorNoticeData, setEditorNoticeData] = useState<string>("");

  useEffect(() => {
    return () => {
      if (imgPreviewUrls) {
        imgPreviewUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl));
      }
    };
  }, [imgPreviewUrls]);

  // 기존 게시글 데이터 가져오기
  const {
    data: showInfoData,
    status,
    error,
  } = useQuery({
    queryKey: ["showInfoData", showId],
    queryFn: () => getShowInfo(showId),
    enabled: !!showId,
  });

  // 게시글 예매 정보 가져오기
  const {
    data: showReservationInfoData,
    status: showReservationInfoStatus,
    error: showReservationInfoError,
    refetch: refetchShowReservationInfoData,
  } = useQuery({
    queryKey: ["showReservationInfoData", showId],
    queryFn: () => getShowReservationInfo(showId),
    enabled: false,
  });

  // 게시글 수정 업데이트
  const { mutate: editMutate } = useMutation({
    mutationFn: (formData: FormData) => putShow(formData),
    onSuccess: (data) => {
      if (data) {
        toast.info("게시글 수정 완료");
        navigate("/mypage/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteShow(showId),
    onSuccess: (data) => {
      if (data) {
        toast.info("게시글 삭제 완료");
        navigate("/mypage/post");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (status === "success" && showInfoData) {
      if (showInfoData.is_reservation) refetchShowReservationInfoData();
      console.log(showInfoData);

      setTitle(showInfoData.title);
      setShowType(showInfoData.show_type);
      showInfoData.show_sub_type && setShowSubType(showInfoData.show_sub_type);
      setUniv(showInfoData.univ);
      setDepartment(showInfoData.department);
      setLocation(showInfoData.location);
      setPosition(JSON.parse(showInfoData.position));
      showInfoData.location_detail && setLocationDetail(showInfoData.location_detail);
      setIsReservation(showInfoData.is_reservation === 1 ? "예" : "아니오");

      setImgExistingUrls(
        showInfoData.sub_images_url
          ? [showInfoData.main_image_url, ...(Object.values(JSON.parse(showInfoData.sub_images_url)) as string[])]
          : [showInfoData.main_image_url],
      );
      setDate({ start_date: showInfoData.start_date, end_date: showInfoData.end_date });
      showInfoData.tags && setTagInputs(Object.values(JSON.parse(showInfoData.tags)) as string[]);
      showInfoData.content && setEditorData(new TextDecoder().decode(base64ToBytes(showInfoData.content)));
    }
  }, [showInfoData]);

  useEffect(() => {
    if (showReservationInfoStatus === "success" && showReservationInfoData) {
      console.log(showReservationInfoData);

      setMethod(showReservationInfoData.method === "google" ? "구글폼" : "예매 대행");
      if (showReservationInfoData.method === "google") {
        setGoogleFormUrl(showReservationInfoData.google_form_url);
      } else {
        setPrice(showReservationInfoData.price);
        setHeadCount(showReservationInfoData.head_count);
        setRoundList(
          showReservationInfoData.date_time.map((round) => {
            const [date, time] = round.date_time.split(" - ");
            return { date, time };
          }),
        );
        showReservationInfoData.notice && setEditorNoticeData(new TextDecoder().decode(base64ToBytes(showReservationInfoData.notice)));
      }
    }
  }, [showReservationInfoData]);

  if (status === "error") return <h1>{error.message}</h1>;
  if (status === "pending") return <h1>loading...</h1>;

  if (showReservationInfoStatus === "error") return <h1>{showReservationInfoError.message}</h1>;
  if (showReservationInfoStatus === "pending") return <h1>loading...</h1>;

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

  const handleDateInput = (event: DateInputType) => {
    const { name, value } = event.target;
    setDate({ ...date, [name]: value });
  };

  const handleChangeTags = (tags: string[]) => {
    setTagInputs(tags);
  };

  // 수정하기 버튼
  const handleUpdateShow = async (e) => {
    e.preventDefault();

    if (imgFiles.length < 2) {
      toast.error("이미지를 2개 이상 업로드 해주세요.");
      return;
    }
    if (imgFiles.length > 10) {
      toast.error("이미지를 10개 이하로 업로드 해주세요.");
      return;
    }
    if (!title || !univ || !department) {
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
    if (isReservation === "예") {
      if (method === "구글폼" && !googleFormUrl) {
        toast.error("구글폼 URL을 입력해주세요.");
        return;
      }
      if (method === "예매 대행" && !price && !headCount && !roundList.length) {
        toast.error("예매 폼을 완성해주세요.");
        return;
      }
    }

    // if (imgExistingUrls.length) {
    //   const urlToFileArray = imgExistingUrls.map((imgUrl) => {
    //     imgUrl
    //   });
    // }

    const resizedImgFiles = await Promise.all(
      imgFiles.map(async (file) => {
        const blobString = URL.createObjectURL(file);
        const jpeg = await reduceImageSize(blobString);
        return new File([jpeg], new Date().toISOString(), { type: "image/jpeg" });
      }),
    );

    const base64EncodedContents = (!!editorData && bytesToBase64(new TextEncoder().encode(editorData))) || null;
    const base64EncodedNotice = (method === "예매 대행" && !!editorNoticeData && bytesToBase64(new TextEncoder().encode(editorNoticeData))) || null;

    const result = {
      main_image_url: resizedImgFiles[0],
      sub_images_url: resizedImgFiles.slice(1),
      main_image_color,
      show_type: showType,
      show_sub_type: showType === "전시" ? null : showSubType,
      title,
      univ,
      department,
      start_date: date.start_date,
      end_date: date.end_date,
      location,
      location_detail: locationDetail,
      position: JSON.stringify(position),
      tags: (tagsInput.length && JSON.stringify(convertArrayToObject(tagsInput))) || null,
      content: base64EncodedContents,
      is_reservation: isReservation === "예" ? "1" : "0",
      //
      method: isReservation === "예" ? (method === "구글폼" ? "google" : "agency") : null,
      google_form_url: (method === "구글폼" && googleFormUrl) || null,
      price: (method === "예매 대행" && price) || null,
      head_count: (method === "예매 대행" && headCount) || null,
      date_time: (method === "예매 대행" && JSON.stringify(convertArrayToObject(roundListToDateTime(roundList)))) || null,
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
    formData.append("show_id", showId);
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
    result.content && formData.append("content", result.content);
    result.is_reservation && formData.append("is_reservation", result.is_reservation);
    result.method && formData.append("method", result.method);
    result.google_form_url && formData.append("google_form_url", result.google_form_url);
    result.price && formData.append("price", result.price.toString());
    result.head_count && formData.append("head_count", result.head_count.toString());
    result.notice && formData.append("notice", result.notice);
    result.date_time && formData.append("date_time", result.date_time);

    editMutate(formData);
  };

  // 삭제하기 버튼
  const handleDeleteShow = (e) => {
    e.preventDefault();
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutate();
      return;
    }
  };

  return (
    <form className={styles["post-update-section-form"]}>
      <section>
        <h2 className={styles["title"]}>공연/전시/스포츠 이미지</h2>
        <div className={styles["update-imgs-wrapper"]}>
          <label className={styles["update-img-input"]}>
            <ImgUploadIcon />
            <input type="file" accept="image/*" multiple onChange={handleChangeImage} />
          </label>
          <ul className={styles["imgs-list"]}>
            {imgExistingUrls.map((image) => (
              <li key={image}>
                <div className={styles["img-cover"]}>
                  <img src={import.meta.env.VITE_APP_IMAGE_DOMAIN + image} alt="" />
                  <DeleteButton spanHidden="해당 이미지 삭제" onClick={() => handleRemoveImage(image)} forImage />
                </div>
              </li>
            ))}
            {/* {imgPreviewUrls.map((image) => (
              <li key={image}>
                <div className={styles["img-cover"]}>
                  <img src={image} alt="" />
                  <DeleteButton spanHidden="해당 이미지 삭제" onClick={() => handleRemoveImage(image)} forImage />
                </div>
              </li>
            ))} */}
          </ul>
        </div>
      </section>

      <section>
        <h2 className={styles["title"]}>카테고리</h2>
        <RadioButtonGroup radioList={categoryList} name="show_type" onChangeValue={setShowType} value={showType} />
        {showType === "공연" && (
          <RadioButtonGroup radioList={concertCategoryList} name="show_sub_type" defaultValue={showSubType} onChangeValue={setShowSubType} />
        )}
        {showType === "스포츠" && (
          <RadioButtonGroup radioList={sportsCategoryList} name="show_sub_type" defaultValue={showSubType} onChangeValue={setShowSubType} />
        )}
      </section>

      <section>
        <h2 className={cx("a11y-hidden", "title")}>주최 정보</h2>
        <InputField
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "0 1rem" }}
        >
          제목
        </InputField>
        <InputField
          type="text"
          name="univ"
          placeholder="대학을 입력해주세요."
          value={univ}
          onChange={(e) => setUniv(e.target.value)}
          style={{ padding: "0 1rem" }}
        >
          대학
        </InputField>
        <InputField
          type="text"
          name="department"
          placeholder="학과 또는 학부를 입력해주세요."
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
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
          value={locationDetail}
          onChange={(e) => setLocationDetail(e.target.value)}
          labelHidden
          style={{ padding: "0 1rem" }}
        >
          상세 주소
        </InputField>
      </section>

      <section className={styles["tags-section"]}>
        <h2 className={styles["title"]}>태그</h2>
        <TagInput defaultValue={tagsInput} handleChange={handleChangeTags} />
      </section>

      <section>
        <h2 className={styles["title"]}>소개</h2>
        <Editor editorData={editorData} setEditorData={setEditorData} />
      </section>

      <section>
        <h2 className={styles["title"]}>예매 여부</h2>
        <RadioButtonGroup radioList={isReservationList} name="is_reservation" defaultValue={isReservation} onChangeValue={setIsReservation} />
        {isReservation === isReservationList[0] && (
          <>
            <h3 className={styles["title"]}>예매 방법</h3>
            <RadioButtonGroup radioList={methodList} name="method" onChangeValue={setMethod} value={method} />
            {method === methodList[0] && (
              <InputField
                type="url"
                name="google_form_url"
                placeholder="구글폼 URL을 입력해주세요."
                labelHidden
                value={googleFormUrl}
                onChange={(e) => setGoogleFormUrl(e.target.value)}
                // pattern="https://.*"
              >
                구글폼url
              </InputField>
            )}
            {method === methodList[1] && (
              <ReservationForm
                price={price}
                setPrice={setPrice}
                headCount={headCount}
                setHeadCount={setHeadCount}
                roundList={roundList}
                setRoundList={setRoundList}
                editorNoticeData={editorNoticeData}
                setEditorNoticeData={setEditorNoticeData}
              />
            )}
          </>
        )}
      </section>

      <Button type="submit" onClick={handleUpdateShow}>
        수정하기
      </Button>
      <Button type="submit" onClick={handleDeleteShow}>
        삭제하기
      </Button>
    </form>
  );
};

export default PostUpdate;
