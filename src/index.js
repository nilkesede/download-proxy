const path = require('path');
const express = require('express');
const download = require('./download');

const app = express();
const port = process.env.PORT || 1337;
const folder = process.env.FOLDER || 'storage';

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
