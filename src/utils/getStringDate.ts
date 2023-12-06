const getStringDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  const itemYear = date.getFullYear();
  const itemMonth = date.getMonth();
  const itemDay = date.getDate();
  const dayOfWeek = date.getDay();

  const dateString = `${itemYear}-${itemMonth + 1}-${itemDay}`;
  return { dateString, dayOfWeek };
};

export default getStringDate;
