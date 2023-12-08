const getTodayStringDate = () => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const todayString = `${todayYear}-${(todayMonth + 1) / 10 < 1 ? `0${todayMonth + 1}` : `${todayMonth + 1}`}-${
    todayDay / 10 < 1 ? `0${todayDay}` : `${todayDay}`
  }`;
  return { todayYear, todayMonth, todayDay, todayString };
};

export default getTodayStringDate;
