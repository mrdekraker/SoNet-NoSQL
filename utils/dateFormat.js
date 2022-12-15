const formatDateSuffix = (date) => {
  let dateStr = date.toString();
  // 1st, 2nd, 3rd, 4th etc

  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

module.exports = (
  timestamp,
  { monthLength = `short`, dateSuffix = true } = {}
) => {
  const months = {
    0: monthLength === `short` ? `Jan` : 'January',
    1: monthLength === `short` ? `Feb` : 'February',
    2: monthLength === `short` ? `Mar` : 'March',
    3: monthLength === `short` ? `Apr` : 'April',
    4: monthLength === `short` ? `May` : 'May',
    5: monthLength === `short` ? `Jun` : 'June',
    6: monthLength === `short` ? `Jul` : 'July',
    7: monthLength === `short` ? `Aug` : 'August',
    8: monthLength === `short` ? `Sep` : 'September',
    9: monthLength === `short` ? `Oct` : 'October',
    10: monthLength === `short` ? `Nov` : 'November',
    11: monthLength === `short` ? `Dec` : 'December',
  };

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const day = dateSuffix ? dateSuffix(dateObj.getDate()) : dateObj.getDate();

  const year = dateObj.getFullYear();

  let hour =
    dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();

  if (hour === 0) {
    hour = 12;
  }

  const minute = dateObj.getMinutes() < 10 ? `0` : `${dateObj.getMinutes()}`;

  const period = dateObj.getHours() >= 12 ? `pm` : `am`;

  const formattedTimeStamp = `${formattedMonth} ${day}, ${year} at ${hour}:${minute} ${period}`;

  return formattedTimeStamp;
};