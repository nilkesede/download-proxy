const express = require('express');
const download = require('./download');

const app = express();
const port = 1337 || process.env.PORT;
const folder = '/tmp';

app.get('/', (req, res) => {
  const {url} = req.query;

  if (url) {
    download(url, folder)
      .then(filename => {
        res.download(`${folder}/${filename}`);
      }).catch(err => {
        res.end(err.stack);
      });

    return;
  }

  res.end('xD');
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
