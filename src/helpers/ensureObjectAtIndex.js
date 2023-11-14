function ensureObjectAtIndex(array, index) {
  if (!array[index]) {
    const templateObject = array[0];
    const newObject = {};

    for (const key in templateObject) {
      if (Object.prototype.hasOwnProperty.call(templateObject, key)) {
        newObject[key] = 0;
      }
    }

    array[index] = newObject;
  }
}

export default ensureObjectAtIndex;
