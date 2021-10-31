function translatePigLatin(str) {
  let response = ""
  let regexp = /[aeiou]/ig;
  if (str[0].match(regexp)) {
    response = str + 'way';
  } else if (str.match(regexp) === null) {
    response = str + 'ay';
  } else {
    let firstVowelIndex = str.indexOf(str.match(regexp)[0]);
    response = str.substr(firstVowelIndex) + str.substr(0, firstVowelIndex) + "ay";
  }
  return response;
}

translatePigLatin("consonant");