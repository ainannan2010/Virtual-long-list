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
  // css相关配置
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin，如果使用的话css将会分离打包，配合按需加载
  //   extract: true,
  //   // 是否开启 CSS source maps，在打包后可以直接定位css所在位置
  //   sourceMap: false,
  //   // css预设器配置项，所有的 css-loader 选项在这里都是支持的，例如 localIdentName 和 camelCase
  //   loaderOptions: {
  //     css: {
  //       localIdentName: "[name]-[hash]",
  //       camelCase: "only",
  //     },
  //   },
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false,
  // },
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
