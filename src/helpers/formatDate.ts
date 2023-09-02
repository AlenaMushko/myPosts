export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-EN', options).format(date);
}
