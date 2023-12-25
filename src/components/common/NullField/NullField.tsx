import nullImage from "@/assets/null-page.png";
import styles from "./NullField.module.css";

interface PropsType {
  text1: string;
  text2?: string;
}

const NullField: React.FC<PropsType> = ({ text1, text2 }) => {
  return (
    <div className={styles["null-container"]}>
      <img src={nullImage} alt="빈 화면" />
      <p>
        {text1} <br />
        {text2}
      </p>
    </div>
  );
};

export default NullField;
