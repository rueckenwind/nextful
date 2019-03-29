const { createClient } = require('contentful');
const getPageProps = require('./remodel/getPageProps');
const getNews = require('./getNews');

async function exportPathMap() {
  const staticPages = {
    // '/404': {
    //   page: '/_error',
    //   query: { statusCode: 404 },
    // },
    // '/500': {
    //   page: '/_error',
    //   query: { statusCode: 500 },
    // },
  };

  const { getEntries } = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
  });

  const res = await getEntries({
    content_type: 'page',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const sortetPages = res.items.sort((a, b) => a.fields.url.localeCompare(b.fields.url));
  const cleanedPages = sortetPages.map(page => getPageProps(page));
  const enhancedPages = await Promise.all(cleanedPages.map(async (page) => {
    if (page.url && page.url === '/news/') {
      page.additionalContent = {
        id: 'news',
        content: await getNews(getEntries).catch((e) => {
          throw new Error(e);
        }),
      };
    }
    return page;
  }));

  const contentfulPages = enhancedPages.reduce((state, current) => {
    state[current.url] = {
      page: '/page',
      query: {
        ...current,
      },
    };
    return state;
  }, {});

  return {
    ...staticPages,
    ...contentfulPages,
  };
}

module.exports = exportPathMap;
