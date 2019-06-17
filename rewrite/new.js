function New(func, ...arg) {
  const obj = Object.create(func.prototype);
  const result = func.apply(obj, ...arg);
  if (result) {
    return result;
  }
  return obj;
}
