module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://192.168.37.27:9502/money2/transfer',
        pathRewrite: {
          changeOrigin: true,
          '^/api': ''
        }
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "network": "@/network",
        "components": "@/components",
        "views": "@/views",
        "utils": "@/utils",
      }
    }
  }
}
