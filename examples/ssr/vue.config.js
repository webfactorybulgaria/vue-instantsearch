const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');

const isNodeTarget = process.env.WEBPACK_TARGET === 'node';

module.exports = {
  configureWebpack: () => ({
    entry: isNodeTarget ? './src/main-server.js' : './src/main-client.js',
    target: isNodeTarget ? 'node' : 'web',
    node: isNodeTarget ? undefined : false,
    plugins: [
      isNodeTarget ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
    externals: isNodeTarget
      ? nodeExternals({
          whitelist: [/\.css$/],
        })
      : undefined,
    output: {
      libraryTarget: isNodeTarget ? 'commonjs2' : undefined,
    },
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.optimizeSSR = isNodeTarget;
      });

    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
};
