const fs = require('fs');
const path = require('path');
const express = require('express');
const { createRenderer } = require('vue-server-renderer');
const createApp = require('./main').default;

const server = express();
const renderer = createRenderer({
  template: fs.readFileSync('./src/index.template.html', 'utf-8'),
});

server.use('/js', express.static(path.resolve(__dirname, './dist/js')));
server.use('/css', express.static(path.resolve(__dirname, './dist/css')));
server.use('/img', express.static(path.resolve(__dirname, './dist/img')));

server.get('*', (req, res) => {
  const context = {};
  const application = createApp(context);

  renderer
    .renderToString(application, context)
    .then(html => {
      res.end(html);
    })
    .catch(err => {
      res.status(500).end('Internal Server Error');
    });
});

server.listen(8080, () => {
  console.log('Start server on 8080...');
});
