const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'moment': 'moment/src/moment',
        'hls.js': 'hls.js/dist/hls.light.min.js'
      }
    },
    plugins: [new BundleAnalyzerPlugin()]
  }
}
