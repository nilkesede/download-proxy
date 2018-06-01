const path = require('path');
const express = require('express');
const next = require('next');
const download = require('download');

const port = parseInt(process.env.PORT, 10) || 1337;
const dev = process.env.NODE_ENV !== 'production';
const folder = process.env.FOLDER || 'storage';

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/download', async (req, res) => {
    try {
      const {url, name} = req.query;
      const filename = name || path.basename(url);

      if (!url) {
        throw new Error('no url');
      }

      await download(url, folder, {filename});
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
