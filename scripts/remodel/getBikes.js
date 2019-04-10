const getBikeProps = require('./getBikeProps');
const getSidebarProps = require('./getSidebarProps');

module.exports = function getBikes(resBikes, defaultSidebar) {
  const bikesCleaned = resBikes.items.map(item => getBikeProps(item));
  const bikesCleanedForList = resBikes.items.map(item => getBikeProps(item, true));

  const bikesPages = bikesCleaned.reduce((state, { slug, content, ...bike }) => {
    state[`/fahrrad/${slug}/`] = {
      page: '/pageBike',
      query: {
        content,
        bike,
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
