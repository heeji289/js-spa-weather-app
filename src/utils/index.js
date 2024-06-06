export function convertTimestampToTime(timestamp) {
  const dateObj = new Date(timestamp * 1000);
  const localString = dateObj.toLocaleString(); // toTimeString(),
  return localString;
}

// TODO: 임시함수, API 연동 후 제거
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
