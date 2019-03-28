const { parsed: env } = require('dotenv').config();
const getExportPathMap = require('./scripts/getExportPathMap');

const exportPathMap = async () => getExportPathMap();

module.exports = {
  env,
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
