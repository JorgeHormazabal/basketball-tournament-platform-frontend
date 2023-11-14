function sumAttributeInArray(array, attribute) {
  let sum = 0;

  array.forEach((obj) => {
    if (Object.prototype.hasOwnProperty.call(obj, attribute)) {
      sum += obj[attribute];
    }
  });

  return sum;
}

export default sumAttributeInArray;
