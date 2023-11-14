function sumValuesAtIndex(array, index) {
  if (index < 0 || index >= array.length || !array[index]) {
    return 0;
  }

  let sum = 0;
  const object = array[index];

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      sum += object[key];
    }
  }

  return sum;
}

export default sumValuesAtIndex;
