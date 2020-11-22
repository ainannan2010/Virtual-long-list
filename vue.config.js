const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/dev-api/': {
        target: process.env.VUE_APP_BASE_HOST,
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': '',
        },
      }
    },
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : undefined,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@comp': resolve('src/components'),
        '@styles': resolve('src/styles'),
      }
    }
  },
};
