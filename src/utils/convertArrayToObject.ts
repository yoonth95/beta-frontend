const convertArrayToObject = (arr: string[]) => {
  const obj: { [key: string]: string } = {};

  arr.forEach((value, index) => {
    obj[(index + 1).toString()] = value;
  });
  return obj;
};

export default convertArrayToObject;
