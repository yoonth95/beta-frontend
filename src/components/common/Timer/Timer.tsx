import { useEffect } from "react";
import styles from "./Timer.module.css";

interface PropsType {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<PropsType> = ({ time, setTime }) => {
  const getSeconds = (time: number): string => {
    const seconds = time % 60;
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time <= 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className={styles["timer-container"]}>
      <div>
        <span>{Math.floor(time / 60)}</span>
        <span> : </span>
        <span>{getSeconds(time)}</span>
      </div>
    </div>
  );
};

export default Timer;
