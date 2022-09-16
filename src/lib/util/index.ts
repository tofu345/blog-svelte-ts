export const truncateStr = (str: string) => {
  const length = 1000;
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};
