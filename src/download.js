const path = require('path');
const fs = require('fs');
const axios = require('axios');

module.exports = function (url, folder) {
  return new Promise(((resolve, reject) => {
    const filename = path.basename(url);
    const dest = path.join(folder, filename);
    const writeStream = fs.createWriteStream(dest);

    writeStream.on('finish', () => {
      resolve(filename);
    });

    writeStream.on('error', err => {
      fs.unlink(dest, reject.bind(null, err));
    });

    axios({
      method: 'get',
      url,
      responseType: 'stream'
    }).then(response => {
      response.data.pipe(writeStream);
    }).catch(err => {
      fs.unlink(dest, reject.bind(null, err));
    });
  }));
};
