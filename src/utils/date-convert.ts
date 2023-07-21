export const dateConvert = (date: string) => {
  const todayDate = new Date();
  const targetDate = new Date(date);

  const daysPassed = Math.round((+todayDate - +targetDate) / 86400000);
  let resultDate: string;

  switch (daysPassed) {
    case 0:
      resultDate = "Сегодня";
      break;
    case 1:
      resultDate = "Вчера";
      break;
    case 2:
      resultDate = "Позавчера";
      break;
    case 3:
      resultDate = "3 дня назад";
      break;
    default:
      resultDate = `${("0" + targetDate.getDate()).slice(-2)}.${(
        "0" + (+targetDate.getMonth() + 1).toString()
      ).slice(-2)}.${targetDate.getFullYear()}`;
  }

  const resultTime = `${("0" + targetDate.getHours()).slice(-2)}:${(
    "0" + targetDate.getMinutes()
  ).slice(-2)}`;
  return `${resultDate}, ${resultTime}`;
};
