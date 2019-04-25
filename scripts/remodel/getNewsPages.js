module.exports = function getNewsPages(news, pages = null) {
  // using headerImage from /news/ for every news
  const [newsPage] = pages ? pages.filter(page => page.url === '/news/') : [];
  const headerImage = newsPage && newsPage.headerImage;

  return news.map(({ slug, ...query }) => ({
    url: `/news/${slug}/`,
    template: '/pageNewsSingle',
    query: {
      headerImage,
      ...query,
    },
  }));
};
