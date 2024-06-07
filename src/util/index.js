export function convertTimestampToTime(timestamp) {
  const dateObj = new Date(timestamp * 1000);
  const localString = dateObj.toLocaleString();
  return localString;
}
