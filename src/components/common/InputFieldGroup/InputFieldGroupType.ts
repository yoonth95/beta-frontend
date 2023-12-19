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

interface CommonType {
  userType?: "user" | "admin";
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  readOnly?: boolean;
}

interface PhoneInputProps extends CommonType {
  type: "phone";
  values: PhoneValues;
  setValues?: SetValuesFunction<PhoneValues>;
  name: "phone";
}

interface BirthdateGenderInputProps extends CommonType {
  type: "birthdate-gender";
  values: BirthdateGenderValues;
  setValues?: SetValuesFunction<BirthdateGenderValues>;
  name: "gender";
}

interface EmailInputProps extends CommonType {
  type: "email";
  values: EmailValues;
  setValues?: SetValuesFunction<EmailValues>;
  name: "email";
}

export type SetValuesFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type PropsType = PhoneInputProps | BirthdateGenderInputProps | EmailInputProps;
