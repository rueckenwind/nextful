const { createClient } = require('contentful');
const cleanPage = require('./cleanPage');

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
  }).catch((e) => {
    throw new Error(e);
  });

  const sortetPages = res.items.sort((a, b) => a.fields.url.localeCompare(b.fields.url));
  const cleanedPages = sortetPages.map(page => cleanPage(page));

  const contentfulPages = cleanedPages.reduce((state, current) => {
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
