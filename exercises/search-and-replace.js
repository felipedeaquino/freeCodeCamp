function myReplace(str, before, after) {
  let char = before[0];
  if (char === char.toUpperCase()) {
    after = after.replace(/^\w/, (letter) => letter.toUpperCase());
  } else {
    after = after.replace(/^\w/, (letter) => letter.toLowerCase());
  }
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (words[i] === before) {
      words[i] = after;
    }
  }
  return (words.join(' '));
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");