const getBikeProps = require('./getBikeProps');
const getSidebarProps = require('./getSidebarProps');

module.exports = function getBikes(resBikes, defaultSidebar) {
  const bikesCleaned = resBikes.items.map(item => getBikeProps(item));
  const bikesCleanedForList = resBikes.items.map(item => getBikeProps(item, true));

  const bikesPages = bikesCleaned.reduce((state, current) => {
    state[`/fahrrad/${current.slug}/`] = {
      page: '/page',
      query: {
        ...current,
        sidebar: getSidebarProps(defaultSidebar),
      },
    };
    return state;
  }, {});

  return {
    bikesCleaned,
    bikesCleanedForList,
    bikesPages,
  };
};
