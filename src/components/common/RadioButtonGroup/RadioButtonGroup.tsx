import React, { SetStateAction, useEffect, useState } from "react";
import styles from "./RadioButtonGroup.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  radioList: string[];
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler;
  onChangeValue?: React.Dispatch<SetStateAction<string>>;
  flexDirectionColumn?: boolean;
}

const RadioButtonGroup: React.FC<PropsType> = ({ radioList, name, defaultValue, value, onChange, onChangeValue, flexDirectionColumn = false }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || radioList[0]);

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
    onChange && onChange(e);
    onChangeValue && onChangeValue(e.target.value);
  };

  useEffect(() => {
    value && setSelectedOption(value);
  }, [value]);

  return (
    <fieldset className={cx("fieldset", flexDirectionColumn && "column")}>
      {radioList.map((item) => (
        <label key={item}>
          <input type="radio" name={name} value={item} checked={selectedOption === item} onChange={handleOptionChange} />
          <span>{item}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;
