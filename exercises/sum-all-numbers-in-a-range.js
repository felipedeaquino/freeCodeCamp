function sumAll(arr) {
  let copy = [...arr];
  copy.sort((a, b) => a - b);
  var sum = 0;
  for (let i = copy[0]; i <= copy[1]; i++) {
    sum += i;
  }
  return sum;
}