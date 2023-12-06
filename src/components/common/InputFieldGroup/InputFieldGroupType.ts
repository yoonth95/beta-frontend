export interface PhoneValues {
  phone1: string;
  phone2: string;
  phone3: string;
}

export interface BirthdateGenderValues {
  year: string;
  month: string;
  day: string;
  gender: "male" | "female" | null;
}

export interface EmailValues {
  email1: string;
  email2: string;
}

interface PhoneInputProps {
  type: "phone";
  values: PhoneValues;
  setValues: SetValuesFunction<PhoneValues>;
  userType?: "User" | "Admin";
  required?: boolean;
}

interface BirthdateGenderInputProps {
  type: "birthdate-gender";
  values: BirthdateGenderValues;
  setValues: SetValuesFunction<BirthdateGenderValues>;
  userType?: "User" | "Admin";
  required?: boolean;
}

interface EmailInputProps {
  type: "email";
  values: EmailValues;
  setValues: SetValuesFunction<EmailValues>;
  userType?: "User" | "Admin";
  required?: boolean;
}

export type SetValuesFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type PropsType = PhoneInputProps | BirthdateGenderInputProps | EmailInputProps;
