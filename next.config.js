const getExportPathMap = require('./scripts/getExportPathMap');

const exportPathMap = async () => getExportPathMap();

const config = {
  exportPathMap,
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.css$/,
      use: [{
        loader: 'raw-loader',
      }],
    });

    webpackConfig.module.rules.push({
      test: /\.(jpe?g|png|gif|webp)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          fallback: 'file-loader',
          publicPath: '/_next/static/images/',
          outputPath: 'static/images/',
          name: '[name].[ext]',
        },
      }],
    });

    return webpackConfig;
  },
};


if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const { error, parsed: localEnv } = require('dotenv').config();

  if (error) {
    throw error;
  }

  config.env = localEnv;
}


module.exports = config;
