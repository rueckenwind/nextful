const getBikeCategoriyProps = require('./getBikeCategoriyProps');

module.exports = function getBikes(res) {
  const bikeCategoriesCleaned = res.items.map(item => getBikeCategoriyProps(item));

  return {
    bikeCategoriesCleaned,
  };
};
