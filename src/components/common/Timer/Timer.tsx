import { useEffect } from "react";
import styles from "./Timer.module.css";

interface PropsType {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isStop?: boolean;
}

const Timer: React.FC<PropsType> = ({ time, setTime, isStop }) => {
  const getSeconds = (time: number): string => {
    const seconds = time % 60;
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time <= 0 || isStop) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time, isStop]);

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
