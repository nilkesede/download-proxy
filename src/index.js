const path = require('path');
const express = require('express');
const download = require('./download');

const app = express();
const port = 1337 || process.env.PORT;
const folder = '/tmp' || process.env.FOLDER;

app.disable('x-powered-by');

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
