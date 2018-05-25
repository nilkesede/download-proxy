const path = require('path');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 1337;
const dev = process.env.NODE_ENV !== 'production';
const folder = process.env.FOLDER || 'storage';

const app = next({dev});
const handle = app.getRequestHandler();

const download = function (url, folder) {
  return new Promise((resolve, reject) => {
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
      url,
      method: 'get',
      responseType: 'stream'
    }).then(response => {
      response.data.pipe(writeStream);
    }).catch(err => reject.bind(null, err));
  });
};

app.prepare().then(() => {
  const server = express();

  server.get('/download', async (req, res) => {
    try {
      const {url} = req.query;

      if (!url) {
        throw new Error('no url');
      }

      const filename = await download(url, folder);
      res.download(path.join(folder, filename));
    } catch (err) {
      res.end(err.message);
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:${port}`);
  });
});
