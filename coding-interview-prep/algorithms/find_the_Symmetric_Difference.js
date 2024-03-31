// First Solution
function sym(arr1, arr2, ...arrs) {
  if (arguments.length < 2) {
    throw new Error('A função deve receber pelo menos dois argumentos.');
  }
  
  const arrays = Array.prototype.slice.call(arguments);
  
  function difference(group) {
    let total = {};
    for (const arr of group) {
      const unique = new Set(arr);
      unique.forEach(number => {
        total[number] = (total[number] || 0) + 1;
      });
    } 
    let diff = [];
    const totalKeys = Object.keys(total)
    totalKeys.forEach(key => {
      if(total[Number(key)] === 1) {
        diff.push(+key);
      }
    })
    return(diff);
  }
  
  while (arrays.length >= 2) {
    const group = [arrays[0], arrays[1]]
    arrays[0] = difference(group);
    arrays.splice(1, 1);
  }
  return arrays[0];
}

// refactor with ChatGPT to think differently
function sym2(...arrays) {
  if (arrays.length < 2) {
    throw new Error('A função deve receber pelo menos dois argumentos.');
  }
  
  function symmetricDifference(setA, setB) {
    const diff1 = new Set([...setA].filter(x => !setB.has(x)));
    const diff2 = new Set([...setB].filter(x => !setA.has(x)));
    return new Set([...diff1, ...diff2]);
  }
  
  let result = new Set(arrays[0]);
  for (let i = 1; i < arrays.length; i++) {
    result = symmetricDifference(result, new Set(arrays[i]));
  }
  
  return Array.from(result);
}

