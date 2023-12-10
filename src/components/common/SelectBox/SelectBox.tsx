import React, { useState } from "react";
import styles from "./SelectBox.module.css";

interface PropsType {
  options: string[];
  name?: string;
  selectedValue: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectBox: React.FC<PropsType> = ({ options, selectedValue, onClick: onClickParent, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    onClickParent(e);
  };

  return (
    <div className={styles["custom-select"]}>
      <button className={`${styles["btn-select"]} ${isOpen && styles["on"]}`} onClick={handleOpen}>
        <span>{selectedValue}</span>
      </button>
      {isOpen && (
        <ul className={styles.list}>
          {options.map((option) => {
            return (
              <li key={option}>
                <button type="button" name={name} onClick={handleSelect} className={`${option === selectedValue && styles.selected}`}>
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
