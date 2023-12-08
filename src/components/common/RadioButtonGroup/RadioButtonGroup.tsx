import React, { useState } from "react";
import styles from "./RadioButtonGroup.module.css";

interface PropsType {
  radioList: string[];
}

const RadioButtonGroup: React.FC<PropsType> = ({ radioList }) => {
  const [selectedOption, setSelectedOption] = useState(radioList[0]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <fieldset className={styles["fieldset"]}>
      {radioList.map((item) => (
        <label>
          <input type="radio" name="round" value={item} checked={selectedOption === item} onChange={handleOptionChange} />
          <span>{item}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;
