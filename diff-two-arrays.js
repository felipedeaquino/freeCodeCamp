function diffArray(arr1, arr2) {
  
  function diff(a, b) {
    let diffItems = a.filter(item => b.indexOf(item) === -1); 
    return diffItems
  }
  
  let diff1 = diff(arr1, arr2);
  let diff2 = diff(arr2, arr1);
  
  return diff1.concat(diff2);
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);