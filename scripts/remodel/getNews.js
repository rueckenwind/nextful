const getNewsProps = require('./getNewsProps');
const getSidebarProps = require('./getSidebarProps');

module.exports = function getNews(res, sidebar) {
  const newsCleaned = res.items.map(item => getNewsProps(item));

  const newsPages = newsCleaned.reduce((state, current) => {
    state[`/news/${current.slug}/`] = {
      page: '/page',
      query: {
        ...current,
        sidebar: getSidebarProps(sidebar),
      },
    };
    return state;
  }, {});

  return {
    newsCleaned,
    newsPages,
  };
};
