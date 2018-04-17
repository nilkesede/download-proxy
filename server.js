'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const got = require('got');

const app = express();
const port = process.env.PORT || 1337;
const folder = process.env.FOLDER || 'storage';

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

    got.stream(url)
      .pipe(writeStream);
  });
};

app.get('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`running on ${port}`);
});
