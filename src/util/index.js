export function convertTimestampToTime(timestamp) {
  const dateObj = new Date(timestamp * 1000);
  const localString = dateObj.toLocaleString();
  return localString;
}

export function createElement(tagName, attributes) {
  const element = document.createElement(tagName);

  if (!!attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}
