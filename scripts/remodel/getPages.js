const getPageProps = require('./getPageProps');

module.exports = function getPages(res, sidebar, news, bikes, bikeCategories, bikeFrameShapes) {
  const sortetPages = res.items.sort((a, b) => a.fields.url.localeCompare(b.fields.url));
  const cleanedPages = sortetPages.map(page => getPageProps(page, sidebar));
  const enhancedPages = cleanedPages.map((page) => {
    page.template = '/page';

    if (page.url && page.url === '/') {
      page.template = '/pageHome';
      [page.currentNews] = news;
      page.latestBikes = [
        bikes[0],
        bikes[1],
        bikes[2],
      ];
    }

    if (page.url && page.url === '/fahrrad/') {
      page.template = '/pageBikes';
      page.bikes = bikes;
      page.bikeFilter = {
        bikeCategories,
        bikeFrameShapes,
      };
    }

    if (page.url && page.url === '/news/') {
      page.template = '/pageNews';
      page.news = news;
    }
    return page;
  });

  const pages = enhancedPages.reduce((state, current) => {
    state[current.url] = {
      page: current.template,
      query: {
        ...current,
      },
    };
    return state;
  }, {});

  return {
    pages,
  };
};
