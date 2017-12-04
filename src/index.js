const express = require('express');
const download = require('./download');

const app = express();
const port = 1337 || process.env.PORT;

app.get('/', (req, res) => {
  const {url} = req.query;

  download(url, './storage')
    .then(filename => {
      res.download(`./storage/${filename}`);
    }).catch(err => {
      res.end(err);
    });
});

app.listen(port, () => {
  console.log(`Running on localhost:${port}`);
});
