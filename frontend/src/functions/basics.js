export const setNewValues = (array, newData, i) => {
  try {
    let arr = [];
    array.map((v, j) => {
      if (i === j) {
        arr.push({ ...v, newData });
      } else {
        arr.push(v);
      }
    });
    return arr;
  } catch (error) {
    console.error(error);
  }
};
export const randomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
