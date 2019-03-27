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
    return webpackConfig;
  },
};
