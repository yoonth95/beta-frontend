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
  setValues?: SetValuesFunction<PhoneValues>;
  userType?: "User" | "Admin";
  required?: boolean;
  name: "phone";
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

interface BirthdateGenderInputProps {
  type: "birthdate-gender";
  values: BirthdateGenderValues;
  setValues?: SetValuesFunction<BirthdateGenderValues>;
  userType?: "User" | "Admin";
  required?: boolean;
  name: "gender";
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

interface EmailInputProps {
  type: "email";
  values: EmailValues;
  setValues?: SetValuesFunction<EmailValues>;
  userType?: "User" | "Admin";
  required?: boolean;
  name: "email";
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export type SetValuesFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type PropsType = PhoneInputProps | BirthdateGenderInputProps | EmailInputProps;
