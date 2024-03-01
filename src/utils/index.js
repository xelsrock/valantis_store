export const deleteDuplicates = (array) => {
  return array.filter((val, idx, arr) => arr.findIndex((val2) => val2.id === val.id) === idx);
};

export const modificateDate = (date) => {
  if (date <= 9) {
    return '0' + date;
  } else {
    return date;
  }
};
