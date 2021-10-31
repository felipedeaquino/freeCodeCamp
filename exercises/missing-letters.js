function fearNotLetter(str) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'
  str = str.toLowerCase(str);
  let startSearch = str[0];
  let endSearch = str[str.length - 1];
  let startIndex = alphabet.indexOf(startSearch);
  let endIndex = alphabet.indexOf(endSearch);

  for (let i = startIndex + 1; i < endIndex; i++) {
    if (str.includes(alphabet[i]) === false) {
      return alphabet[i];
    }
  }

  return undefined;
}

// solution 2
function fearNotLetter(str) {
  for (var i = 0; i < str.length; i++) {
    /* code of current character */
    var code = str.charCodeAt(i);

    /* if code of current character is not equal to first character + no of iteration
        hence character has been escaped */
    if (code !== str.charCodeAt(0) + i) {
      /* if current character has escaped one character find previous char and return */
      return String.fromCharCode(code - 1);
    }
  }
  return undefined;
}

// solution 3
function fearNotLetter(str) {
  let currCharCode = str.charCodeAt(0);
  let missing = undefined;

  str
    .split("")
    .forEach(letter => {
      if (letter.charCodeAt(0) === currCharCode) {
        currCharCode++;
      } else {
        missing = String.fromCharCode(currCharCode);
      }
    });

  return missing;
}

// solution 4
function fearNotLetter(str) {
  for (let i = 1; i < str.length; ++i) {
    if (str.charCodeAt(i) - str.charCodeAt(i - 1) > 1) {
      return String.fromCharCode(str.charCodeAt(i - 1) + 1);
    }
  }
}

//test case
fearNotLetter("abce");