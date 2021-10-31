function convertHTML(str) {
  let arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case "<":
        arr[i] = "&lt;";
        break;
      case "&":
        arr[i] = "&amp;";
        break;
      case ">":
        arr[i] = "&gt;";
        break;
      case '"':
        arr[i] = "&quot;";
        break;
      case "'":
        arr[i] = "&apos;";
        break;
    }
  }
  str = arr.join('');
  return str;
}

//test case
convertHTML("Dolce & Gabbana");

//other solutions:

function convertHTML(str) {
  // Use Object Lookup to declare as many HTML entities as needed.
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };
  // Using a regex, replace characters with it's corresponding html entity
  return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}

function convertHTML(str) {
  // Use Object Lookup to declare as many HTML entities as needed.
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };
  //Use map function to return a filtered str with all entities changed automatically.
  return str
    .split("")
    .map(entity => htmlEntities[entity] || entity)
    .join("");
}