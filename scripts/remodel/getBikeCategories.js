const getBikeCategoryProps = require('./getBikeCategoryProps');

module.exports = function getBikes(res) {
  const bikeCategoriesCleaned = res.items.map(item => getBikeCategoryProps(item));

  return {
    bikeCategoriesCleaned,
  };
};
