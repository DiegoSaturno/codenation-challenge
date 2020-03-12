const fs = require('fs');

module.exports = {
  async writeFile(file, dir, data) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return fs.writeFile(`./${dir}/${file}`, data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },

  fileExists(file, dir) {
    return fs.existsSync(`${dir}/${file}`);
  },

  async readFile(file, dir) {
    return fs.createReadStream(`${dir}/${file}`);
  }
}
