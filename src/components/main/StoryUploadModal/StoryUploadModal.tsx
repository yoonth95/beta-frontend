import { useState } from "react";
import { Button, TagInput } from "@/components/common";
import styles from "./StoryUploadModal.module.css";

const StoryUpload = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgFile(e.target.files?.[0] as File | null);
  };

  return (
    <div className={styles["modal"]}>
      <h1 className={styles["modal__title"]}>스토리 업로드</h1>
      <div className={styles["modal__img-container"]} style={{ backgroundImage: imgFile ? `url(${URL.createObjectURL(imgFile)})` : "" }}>
        <label className={styles["img-upload"]} htmlFor="chooseFile"></label>
        <input style={{ display: "none" }} type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={handleChange} />
      </div>
      <TagInput />
      <Button borderRadius={"16px"}>업로드하기</Button>
    </div>
  );
};

export default StoryUpload;
