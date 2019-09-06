export function dateFormatter(
  date,
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
) {
  if (date) {
    let new_date = new Intl.DateTimeFormat('en-US', options);
    return new_date.format(new Date(date));
  }
  return null;
}
