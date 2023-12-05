import React, { useState } from "react";
import styles from "./SelectBox.module.css";

interface PropsType {
  options: string[];
  defaultOptionIndex?: number;
}

const SelectBox: React.FC<PropsType> = ({ options, defaultOptionIndex = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[defaultOptionIndex]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    const buttonElement = e.currentTarget as HTMLButtonElement;
    setSelectedOption(buttonElement.innerText);
  };

  return (
    <div className={styles["custom-select"]}>
      <button className={`${styles["btn-select"]} ${isOpen && styles["on"]}`} onClick={handleOpen}>
        <span>{selectedOption}</span>
      </button>
      {isOpen && (
        <ul className={styles.list}>
          {options.map((option) => {
            return (
              <li key={option}>
                <button type="button" onClick={handleSelect} className={`${option === selectedOption && styles.selected}`}>
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
