function whatIsInAName(collection, source) {
  var query = Object.keys(source);

  return collection.filter((obj) => {
    for (let i = 0; i < query.length; i++) {
      if (!obj.hasOwnProperty(query[i]) || obj[query[i]] !== source[query[i]]) {
        return false;
      }
    }
    return true;
  });
}
/*
Other solutions:

function whatIsInAName(collection, source) {
  var srcKeys = Object.keys(source);

  return collection.filter(function(obj) {
    return srcKeys.every(function(key) {
      return obj.hasOwnProperty(key) && obj[key] === source[key];
    });
  });
}


function whatIsInAName(collection, source) {
  var srcKeys = Object.keys(source);

  // filter the collection
  return collection.filter(function(obj) {
    return srcKeys
      .map(function(key) {
        return obj.hasOwnProperty(key) && obj[key] === source[key];
      })
      .reduce(function(a, b) {
        return a && b;
      });
  });
}

*/
