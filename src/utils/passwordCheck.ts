export const isPasswordCheck = (value: string) => {
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,}$/;
  return value.match(pwRegex);
};

export const isPasswordDoubleCheck = (value: string, value2: string) => {
  return value === value2;
};
