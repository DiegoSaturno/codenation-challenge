const axios = require('axios');
const myToken = "62f9dc5d58066dab59e992042f93ae4c7bd96fa2";

main = async() => {
  const { data } = await axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${myToken}`);
  console.log(data);
}

main();

