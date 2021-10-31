const squareList = arr => {
  // Only change code below this line
  var response = 
  arr
    .filter(number => number > 0 && number % 1 === 0)
    .reduce((prev, current) => {
      const square = current * current;
      prev.push(square);
      return prev;
    }, []);
  
  return response;
  // Only change code above this line
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);