const path = require('path');
const fs = require('fs');
const request = require('request');

module.exports = function (arquivo, pasta) {
  return new Promise(((resolve, reject) => {
    const filename = path.basename(arquivo);
    const dest = path.join(pasta, filename);
    const writeStream = fs.createWriteStream(dest);

    writeStream.on('finish', () => {
      resolve(filename);
    });

    writeStream.on('error', err => {
      fs.unlink(dest, reject.bind(null, err));
    });

    const readStream = request.get(arquivo);

    readStream.on('error', err => {
      fs.unlink(dest, reject.bind(null, err));
    });

    readStream.pipe(writeStream);
  }));
};
