import React, { useState } from "react";
import classNames from "classnames/bind";
import { SignForm, Button, InputField, InputFieldGroup, Timer } from "@/components/common";
import { isPasswordCheck, isPasswordDoubleCheck } from "@/utils/passwordCheck";
import { isEmailCheck } from "@/utils/emailCheck";
import styles from "./SignupPage.module.css";

interface BirthdateGenderType {
  year: string;
  month: string;
  day: string;
  gender: "male" | "female" | null;
}

interface idPasswordCheck {
  value: string;
  isConfirm: boolean;
}

const cx = classNames.bind(styles);

const SignupPage = () => {
  const [userType, setUserType] = useState<"User" | "Admin">("User");
  const [id, setId] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [password, setPassword] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [checkPassword, setCheckPassword] = useState<idPasswordCheck>({ value: "", isConfirm: false });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState({ phone1: "", phone2: "", phone3: "" });
  const [birthGender, setBirthGender] = useState<BirthdateGenderType>({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
    day: new Date().getDate().toString(),
    gender: null,
  });
  const [email, setEmail] = useState({ email1: "", email2: "gmail.com" });
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [emailCertValue, setEmailCertValue] = useState("");
  const [time, setTime] = useState(180); // 3분

  // 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      타입: userType,
      아이디: id.value,
      비밀번호: password.value,
      이름: name,
      전화번호: `${phone.phone1}-${phone.phone2}-${phone.phone3}`,
      생년월일: `${birthGender.year}-${birthGender.month}-${birthGender.day}`,
      성별: `${birthGender.gender === "male" ? 1 : 2}`,
      이메일: `${email.email1}@${email.email2}`,
    });
  };

  // 아이디 중복확인
  const handleCheckId = () => {
    // db 조회 후 중복확인
    setId({ ...id, isConfirm: true });
  };

  // 비밀번호
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, value: e.currentTarget.value, isConfirm: isPasswordCheck(e.currentTarget.value) });
  };

  // 비밀번호 확인
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword({ ...checkPassword, value: e.currentTarget.value, isConfirm: isPasswordDoubleCheck(password.value, e.currentTarget.value) });
  };

  // 이메일 전송
  const handleSendEmail = () => {
    const fullEmail = `${email.email1}@${email.email2}`;
    if (isEmailCheck(fullEmail)) {
      // 인증번호 이메일 발송
      console.log("이메일 전송");
      setTime(180);
      setIsEmailSend(true);
    }
  };

  // 인증번호 확인
  const handleCertConfirm = () => {
    // 인증번호 확인
    console.log("인증번호 확인");
  };

  return (
    <main className={styles["sign-main"]}>
      <SignForm userType={userType} setUserType={setUserType}>
        <form onSubmit={handleSubmit} className={styles["sign-section-form"]}>
          <div className={styles["sign-section-form-group"]}>
            <InputField
              required
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요."
              value={id.value}
              onChange={(e) => setId({ ...id, value: e.currentTarget.value })}
              isConfirm={id.isConfirm}
            >
              아이디
            </InputField>
            <Button onClick={handleCheckId}>중복확인</Button>
          </div>
          <InputField
            required
            type="password"
            name="password"
            placeholder="8자 이상 영문, 숫자, 특수문자를 입력해주세요."
            value={password.value}
            onChange={handlePassword}
            isConfirm={password.isConfirm}
          >
            비밀번호
          </InputField>
          <InputField
            required
            type="password"
            name="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={checkPassword.value}
            onChange={handleCheckPassword}
            isConfirm={checkPassword.isConfirm}
          >
            비밀번호 확인
          </InputField>
          <InputField required type="text" placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.currentTarget.value)}>
            이름
          </InputField>
          <InputFieldGroup required type="phone" values={phone} setValues={setPhone} />
          <InputFieldGroup required type="birthdate-gender" values={birthGender} setValues={setBirthGender} />
          <div className={styles["sign-section-form-group"]}>
            <InputFieldGroup required type="email" values={email} setValues={setEmail} userType={userType} />
            <Button onClick={handleSendEmail}>인증</Button>
          </div>
          {isEmailSend && time > 0 && (
            <div className={cx("sign-section-form-group", "top-minus10")}>
              <InputField
                required
                type="text"
                name="email-cert"
                placeholder="인증번호를 입력해주세요."
                value={emailCertValue}
                onChange={(e) => setEmailCertValue(e.currentTarget.value)}
              ></InputField>
              <Button onClick={handleCertConfirm}>확인</Button>
              <Timer time={time} setTime={setTime} />
            </div>
          )}

          <Button type="submit">로그인</Button>
        </form>
      </SignForm>
    </main>
  );
};

export default SignupPage;
