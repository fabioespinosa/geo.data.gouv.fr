const {join} = require('path')
const webpack = require('webpack')
const nextRuntimeDotenv = require('next-runtime-dotenv')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// The following dependencies will be pushed to the commons.js bundle
const commonDependencies = [
  '/node_modules/next/',
  '/node_modules/lodash-es/',
  '/node_modules/marked/',
  '/node_modules/react/',
  '/node_modules/react-dom/',

  '/components/hoc/',

  '/pages/_error.js'
]

const withConfig = nextRuntimeDotenv({
  public: [
    'PUBLIC_URL',
    'DATAGOUV_API_URL',
    'DATAGOUV_API_KEY',
    'PUBLICATION_BASE_URL',
    'GEODATA_API_URL',
    'PIWIK_URL',
    'PIWIK_SITE_ID'
  ]
})

module.exports = withConfig({
  webpack(config, {dev, isServer}) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/)
    )

    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.shared = {
        name: 'commons',
        test: m => m.context && commonDependencies.some(c => m.context.includes(c))
      }

      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(__dirname, 'reports/bundles.html'),
        defaultSizes: 'gzip'
      }))
    }

    const chunkFilename = dev ? '[name]' : '[name].[contenthash]'
    config.output.chunkFilename = isServer ? `${chunkFilename}.js` : `static/chunks/${chunkFilename}.js`

    config.resolve.alias = {
      // Replace lodash with lodash-es on client side.
      // This reduces the bundles sizes greatly and allows for webpack
      // scope hoisting in other dependencies.
      // Both lodash and lodash-es should be installed, as lodash-es
      // will not work server-side.
      lodash: 'lodash-es'
    }

    return config
  }
})
