function destroyer(arr) {
  let response = [...arr];
  for (let i = 1; i < arguments.length; i++) {
    for (let j = 0; j < response.length; j++) {
      if (response[j] === arguments[i]) {
        response.splice(j, 1);
        i--;
      }    
    }
  }
  return response;
}

/*
Other solutions: 

function destroyer(arr) {
  let valsToRemove = Object.values(arguments).slice(1);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < valsToRemove.length; j++) {
      if (arr[i] === valsToRemove[j]) {
        delete arr[i];
      }
    }
  }
  return arr.filter(item => item !== null);
}


function destroyer(arr) {
  var valsToRemove = Array.from(arguments).slice(1);
  return arr.filter(function(val) {
    return !valsToRemove.includes(val);
  });
}


function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
*/