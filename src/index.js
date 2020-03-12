const axios = require('axios');
const sha1 = require('sha1');
const FormData = require('form-data');
const { decode } = require('./caesar-cipher');
const { writeFile, fileExists, readFile } = require('./file-utils');

const myToken = "62f9dc5d58066dab59e992042f93ae4c7bd96fa2";
const fileName = "answer.json";
const fileDir = "files";

main = async () => {
  const { data } = await axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${myToken}`);
  const { numero_casas: shift, cifrado: text } = data;
  const decoded = decode(text, shift);
  const encodedInSha1 = sha1(decoded);

  data.decifrado = decoded;
  data.resumo_criptografico = encodedInSha1;

  await writeFile(fileName, fileDir, JSON.stringify(data));

  await sendToCodenationApi();
}

sendToCodenationApi = async() => {
  if (fileExists(fileName, fileDir)) {
    const fileData = await readFile(fileName, fileDir);

    const url = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${myToken}`;

    const formData = new FormData();
    formData.append('answer', fileData);

    const config = {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
      },
    };

    const { data } = await axios.post(url, formData, config);

    console.log(data);
  }
}

main();

