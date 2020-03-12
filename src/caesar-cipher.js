const regex = /^[a-zA-Z]*$/;

module.exports = {
  encode(text, shift) {
    let encodedText = "";

    for (let char of text) {
      const regexResults = char.match(regex);

      if (!!regexResults) {
        let encoded = char.charCodeAt(0) + shift;

        if (encoded > 122) {
          encoded = 96 + (encoded - 122);
        }

        encodedText = `${encodedText}${String.fromCharCode(encoded)}`;
      } else {
        encodedText = `${encodedText}${char}`
      }
    }

    return encodedText;
  },

  decode(text, shift) {
    let decodedText = "";

    for (let char of text) {
      const regexResults = char.match(regex);

      if (!!regexResults) {
        let decoded = char.charCodeAt(0) - shift;

        if (decoded - 97 < 0) {
          decoded = 123 - ((decoded - 97) * -1);
        }

        decodedText = `${decodedText}${String.fromCharCode(decoded)}`;
      } else {
        decodedText = `${decodedText}${char}`
      }
    }

    return decodedText;
  }
}
