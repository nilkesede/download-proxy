const express = require('express');
const download = require('./download');

const app = express();
const port = 1337 || process.env.PORT;
const folder = '/tmp' || process.env.FOLDER;

app.get('/', async (req, res) => {
  try {
    const {url} = req.query;

    if (!url) {
      throw new Error('no url param');
    }

    const filename = await download(url, folder);
    res.download(`${folder}/${filename}`);
  } catch (err) {
    res.end(err.stack);
  }
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
