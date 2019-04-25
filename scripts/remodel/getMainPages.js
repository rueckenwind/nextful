module.exports = function getPages(pages, news, bikes, bikeCategories, bikeFrameShapes) {
  const sortetPages = pages.sort((a, b) => a.url.localeCompare(b.url));
  const enhancedPages = sortetPages.map((page) => {
    page.template = '/page';

    if (page.url && page.url === '/') {
      page.template = '/pageHome';
      [page.currentNews] = news;
      page.latestBikes = bikes.slice(0, 3);
    }

    if (page.url && page.url === '/fahrraeder/') {
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

  return enhancedPages.map(({ url, template, ...query }) => ({
    url,
    template,
    query,
  }));
};
