export function convertMRZDate(str, dateConvertType) {
  if (str && str.length === 6) {
    var year = parseInt(str.substring(0, 2));
    var month = str.substring(2, 4);
    var day = str.substring(4, 6);

    switch (dateConvertType) {
      case 'dob':
        let curYear = new Date().getFullYear();
        if (year + 2000 < curYear) {
          year += 2000;
        } else {
          year += 1900;
        }
        break;
      case 'expiry':
        year += 2000;
        break;
      case 'issue':
        year += 2000 - 10;
        break;
    }

    const date =
      new Date(year.toString(), month - 1, day).toISOString().split('.')[0] +
      'Z';

    console.log(year, parseInt(month) - 1, parseInt(day));

    return date;
  }
  return null;
}
