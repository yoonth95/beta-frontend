import React from "react";
import styles from "./InfoSection.module.css";
import LocationMap from "./LocationMap";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { toast } from "react-toastify";

type onCopyFn = (text: string) => void;

const copyClipBoard: onCopyFn = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info("클립보드에 복사되었습니다.", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (error) {
    console.error(error);
  }
};

// const decodeBase64UrlSafe = (input: string) => {
//   // URL-safe base64 decoding
//   const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
//   try {
//     return window.atob(base64);
//   } catch (error) {
//     console.error("Error decoding base64:", error);
//     return "";
//   }
// };

const decodeUnicode = (str) => {
  // try {
  //   // const decodedBase64 = decodeBase64UrlSafe(str);
  //   return decodeURIComponent(
  //     str
  //       .split("")
  //       .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
  //       .join(""),
  //   );
  // } catch (error) {
  //   console.error("Error decoding Unicode:", error);
  //   return "";
  // }
  return str;
};

const InfoSection = () => {
  const { showInfo } = useShowInfoStore();
  if (!showInfo) return <h2>loading...</h2>;

  const { univ, department, title, location, start_date, end_date } = showInfo;

  const tags = (showInfo.tags && showInfo.tags.length && Object.values(JSON.parse(showInfo.tags))) || [];
  const position = showInfo.position && JSON.parse(showInfo.position);

  const contentBufferData = showInfo.content && new Uint8Array(showInfo.content.data);
  const contentDecodedString = contentBufferData && new TextDecoder("utf-8").decode(contentBufferData);
  const content = contentDecodedString ? decodeUnicode(contentDecodedString) : null;

  return (
    <>
      <section>
        <section className={styles["info-title"]}>
          <h3 className="a11y-hidden">상세 정보</h3>
          <p className={styles["info-title__organizer"]}>{univ + " " + department}</p>
          <h4 className={styles["info-title__title"]}>{title}</h4>
          <p className={styles["info-title__date"]}>{start_date + " ~ " + end_date}</p>
          <p className={styles["info-title__location"]}>{location}</p>
          {!tags.length && (
            <ul className={styles["info-title__tags"]}>
              {tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </section>

        {content && (
          <section className={styles["info-description"]}>
            <h3>소개</h3>
            <pre className={styles["info-description__content"]} dangerouslySetInnerHTML={{ __html: content }}></pre>
          </section>
        )}

        <section className={styles["info-location"]}>
          <h3 className="a11y-hidden">지도</h3>
          <LocationMap lat={position.lat} lng={position.lng} />
          <div className={styles["info-location__copy"]}>
            <p className={styles["text"]}>{location}</p>
            <button className={styles["button"]} onClick={() => copyClipBoard(location)}>
              복사하기
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default InfoSection;
