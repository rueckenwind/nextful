const getExportPathMap = require('./scripts/getExportPathMap')

const exportPathMap = async () => getExportPathMap()

const config = {
  exportPathMap,
  exportTrailingSlash: true,
  webpack: webpackConfig => {
    webpackConfig.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    })

    webpackConfig.module.rules.push({
      test: /\.(jpe?g|png|gif|webp)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: 'file-loader',
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
            name: '[name].[ext]',
          },
        },
      ],
    })

    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                prefixIds: false,
              },
              {
                removeViewBox: false,
              },
              {
                addAttributesToSVGElement: {
                  attributes: [
                    'width="auto"',
                    'height="1em"',
                    'preserveAspectRatio="xMinYMid meet"',
                  ],
                },
              },
            ],
          },
        },
      },
    })

    return webpackConfig
  },
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const { error, parsed: localEnv } = require('dotenv').config()

  if (error) {
    throw error
  }

  config.env = localEnv
}

module.exports = config
