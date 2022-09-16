export const truncateStr = (str: string) => {
  const length = 1000;
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

// const awaitFunc = async () => {
//   const res = await new Promise<void>((resolve) => {
//     setTimeout(() => resolve(), 100000);
//   });
// };

// awaitFunc();
