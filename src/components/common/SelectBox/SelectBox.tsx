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
    handleClose();
    const buttonElement = e.target as HTMLButtonElement;
    setSelectedOption(buttonElement.innerText);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["custom-select"]}>
      <button className={`${styles["btn-select"]} ${isOpen && styles["on"]}`} onClick={handleOpen}>
        <span>{selectedOption}</span>
      </button>
      {isOpen && (
        <ul className={styles.list}>
          {options.map((option, index) => {
            return (
              <li key={index}>
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
