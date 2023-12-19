import React from "react";
import styles from "./InfoSection.module.css";
import LocationMap from "./LocationMap";
import { useShowInfoStore } from "@/stores/useShowInfoStore";
import { toast } from "react-toastify";

type onCopyFn = (text: string) => void;

const copyClipBoard: onCopyFn = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info("클립보드에 복사되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

const InfoSection = () => {
  const { showInfo } = useShowInfoStore();
  if (!showInfo) return <h2>loading...</h2>;

  const { univ, department, title, location, start_date, end_date } = showInfo;

  const tags = showInfo.tags && Object.values(JSON.parse(showInfo.tags));
  const position = showInfo.position && JSON.parse(showInfo.position);
  const contentBufferData = showInfo.content && new Uint8Array(showInfo.content.data);
  const contentDecodedString = contentBufferData && new TextDecoder("utf-8").decode(contentBufferData);

  return (
    <>
      <section>
        <section className={styles["info-title"]}>
          <h3 className="a11y-hidden">상세 정보</h3>
          <p className={styles["info-title__organizer"]}>{univ + " " + department}</p>
          <h4 className={styles["info-title__title"]}>{title}</h4>
          <p className={styles["info-title__date"]}>{start_date + " ~ " + end_date}</p>
          <p className={styles["info-title__location"]}>{location}</p>
          <ul className={styles["info-title__tags"]}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles["info-description"]}>
          <h3>소개</h3>
          {/* 커스텀 글 내용 */}
          <div>{contentDecodedString}</div>
        </section>

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
