const getStringDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  const itemYear = date.getFullYear();
  const itemMonth = date.getMonth();
  const itemDay = date.getDate();
  const dayOfWeek = date.getDay();

  const dateString = `${itemYear}-${(itemMonth + 1) / 10 < 1 ? `0${itemMonth + 1}` : `${itemMonth + 1}`}-${
    itemDay / 10 < 1 ? `0${itemDay}` : `${itemDay}`
  }`;
  return { dateString, dayOfWeek };
};

export default getStringDate;
