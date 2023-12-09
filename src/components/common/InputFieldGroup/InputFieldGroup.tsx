import React, { useState } from "react";
import { PhoneValues, BirthdateGenderValues, EmailValues, PropsType } from "./InputFieldGroupType";
import { getYears, getMonths, getDays } from "@/utils/dateSelect";
import styles from "./InputFieldGroup.module.css";

/**
 * InputFieldGroup Component
 * @param {string} type - InputFieldGroup type
 * @param {PhoneValues | BirthdateGenderValues | EmailValues} values - InputFieldGroup values
 * @param {React.Dispatch<React.SetStateAction<PhoneValues | BirthdateGenderValues | EmailValues>>} setValues - InputFieldGroup setValues
 * @param {string} userType - InputFieldGroup userType
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <InputFieldGroup type="phone" values={phone} setValues={setPhone} userType={userType} />
 *
 */

const InputFieldGroup: React.FC<PropsType> = ({ type, values, setValues, userType, required, name }) => {
  const handleInputChange = (field: keyof PhoneValues | keyof BirthdateGenderValues | keyof EmailValues, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValues((prev: any) => ({ ...prev, [field]: value }));
  };

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState("gmail.com");

  switch (type) {
    case "phone":
      return (
        <fieldset className={styles["fieldset-box"]} name={name}>
          <label>핸드폰번호</label>
          <div className={styles["fieldset-box__list"]}>
            <input
              required={required}
              type="text"
              name="phone1"
              value={values.phone1}
              onChange={(e) => handleInputChange("phone1", e.target.value)}
            />
            <input
              required={required}
              type="text"
              name="phone2"
              value={values.phone2}
              onChange={(e) => handleInputChange("phone2", e.target.value)}
            />
            <input
              required={required}
              type="text"
              name="phone3"
              value={values.phone3}
              onChange={(e) => handleInputChange("phone3", e.target.value)}
            />
          </div>
        </fieldset>
      );

    case "birthdate-gender": {
      const years = getYears();
      const months = getMonths();
      const days = getDays(parseInt(values.year), parseInt(values.month));

      return (
        <fieldset className={styles["fieldset-box"]}>
          <label>생년월일 및 성별</label>
          <div className={styles["fieldset-box__list"]}>
            <div className={styles["fieldset-box__select-list"]}>
              <select required={required} value={values.year} onChange={(e) => handleInputChange("year", e.target.value)}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select required={required} value={values.month} onChange={(e) => handleInputChange("month", e.target.value)}>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select required={required} value={values.day} onChange={(e) => handleInputChange("day", e.target.value)}>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["fieldset-box__button-list"]}>
              <button type="button" className={values.gender === "male" ? styles.active : ""} onClick={() => handleInputChange("gender", "male")}>
                남
              </button>
              <button type="button" className={values.gender === "female" ? styles.active : ""} onClick={() => handleInputChange("gender", "female")}>
                여
              </button>
            </div>
          </div>
        </fieldset>
      );
    }

    case "email": {
      const emailOptions = ["gmail.com", "naver.com", "daum.net", "직접 입력"];

      const handleEmailDomainChange = (value: string) => {
        setSelectedDomain(value);
        setIsReadOnly(value !== "직접 입력");
        handleInputChange("email2", "");

        if (value !== "직접 입력") {
          handleInputChange("email2", value);
        }
      };

      return (
        <fieldset className={styles["fieldset-box"]} name={name}>
          <label>{userType === "User" ? "이메일" : "학교 이메일"}</label>
          <div className={styles["fieldset-box__list"]}>
            <input
              required={required}
              type="text"
              name="email1"
              value={values.email1}
              onChange={(e) => handleInputChange("email1", e.target.value)}
            />
            <span>@</span>
            <input
              required={required}
              type="text"
              name="email2"
              value={isReadOnly ? selectedDomain : values.email2}
              onChange={(e) => handleInputChange("email2", e.target.value)}
              readOnly={isReadOnly}
            />
            <select value={selectedDomain} onChange={(e) => handleEmailDomainChange(e.target.value)}>
              {emailOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      );
    }

    default:
      return null;
  }
};

export default InputFieldGroup;
