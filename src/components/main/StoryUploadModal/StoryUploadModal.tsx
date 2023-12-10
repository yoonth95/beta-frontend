import { useEffect, useState } from "react";
import { Button, TagInput } from "@/components/common";
import styles from "./StoryUploadModal.module.css";

const StoryUploadModal = () => {
  const [imgPreview, setImgPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imgSrc = URL.createObjectURL(selectedFile);
      setImgPreview(imgSrc);
    }
  };

  useEffect(() => {
    return () => {
      if (imgPreview) {
        URL.revokeObjectURL(imgPreview);
      }
    };
  }, [imgPreview]);

  return (
    <div className={styles["modal"]}>
      <label className={styles["img-upload"]} htmlFor="img" style={{ backgroundImage: `url(${imgPreview})` }}>
        <input type="file" id="img" accept="image/*" onChange={handleChange} />
      </label>
      <TagInput />
      <Button borderRadius={"16px"}>업로드하기</Button>
    </div>
  );
};

export default StoryUploadModal;
