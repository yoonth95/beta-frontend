const isNotUser = (role: string) => {
  if (role !== "user") return true;
  else return false;
};

export default isNotUser;
