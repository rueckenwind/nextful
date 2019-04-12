const getExportPathMap = require('./scripts/getExportPathMap');

const exportPathMap = async () => getExportPathMap();

let env = process.ENV;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const { error, parsed: localEnv } = require('dotenv').config();

  if (error) {
    throw error;
  }
  env = localEnv;
}


module.exports = {
  env: env || process.ENV,
  exportPathMap,
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.css$/,
      use: [{
        loader: 'raw-loader',
      }],
    });

    webpackConfig.module.rules.push({
      test: /\.(jpe?g|png|gif)$/,
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
