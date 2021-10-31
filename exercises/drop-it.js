//like it's hot

function dropElements(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i]) === true) {
      return arr;
    } else {
      arr.shift();
      i--
    }
  }
  return arr
}

dropElements([1, 2, 3], function(n) {return n < 3; });

function dropElements(arr, func) {
  let sliceIndex = arr.findIndex(func);
  return arr.slice(sliceIndex >= 0 ? sliceIndex : arr.length);
}

function dropElements(arr, func) {
  // drop them elements.
  let originalLen = arr.length;
  for (let i = 0; i < originalLen; i++) {
    if (func(arr[0])) {
      break;
    } else {
      arr.shift();
    }
  }
  return arr;
}

// test here
dropElements([1, 2, 3, 4], function(n) {
  return n >= 3;
});

function dropElements(arr, func, i = 0) {
  return i < arr.length && !func(arr[i])
    ? (dropElements(arr.slice(i + 1), func, i))
    : arr;
}