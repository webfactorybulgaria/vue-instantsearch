const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const server = express();
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync('./src/index.template.html', 'utf-8'),
  clientManifest,
});

server.use('/js', express.static('./dist/js'));
server.use('/css', express.static('./dist/css'));
server.use('/img', express.static('./dist/img'));
server.use('/favicon', express.static('./dist/favicon.ico'));

server.get('*', (req, res) => {
  const context = {};

  console.log('render: start');

  renderer
    .renderToString(context)
    .then(html => {
      console.log('render complete');
      res.end(html);
    })
    .catch(error => {
      console.log(error);
      res.status(500).end('Internal Server Error');
    });
});

server.listen(8080, () => {
  console.log('Start server on 8080...');
});
