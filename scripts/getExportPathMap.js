const { createClient } = require('contentful');
const getPageProps = require('./remodel/getPageProps');
const getNewsProps = require('./remodel/getNewsProps');
const getBikeProps = require('./remodel/getBikeProps');
const getSidebarProps = require('./remodel/getSidebarProps');

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

  const { items: [defaultSidebar] } = await getEntries({
    content_type: 'sidebar',
    'sys.id': '2naudBsDC6fu3yTOrr7Zom',
    include: 10,
  }).catch((e) => {
    console.log(e);
    throw new Error(e);
  });

  const resNews = await getEntries({
    content_type: 'news',
    limit: 1000,
    include: 10,
    'fields.publishDate[lte]': new Date(),
    order: '-fields.publishDate', // '-' for reverse order
  }).catch((e) => {
    console.log(e);
    throw new Error(e);
  });

  const cleanedNews = resNews.items.map(item => getNewsProps(item));

  const contentfulNews = cleanedNews.reduce((state, current) => {
    state[`/news/${current.slug}/`] = {
      page: '/page',
      query: {
        ...current,
        sidebar: getSidebarProps(defaultSidebar),
      },
    };
    return state;
  }, {});

  const resBikes = await getEntries({
    content_type: 'bike',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const cleanedBikes = resBikes.items.map(item => getBikeProps(item));
  const cleanedBikesForList = resBikes.items.map(item => getBikeProps(item, true));

  const contentfulBikes = cleanedBikes.reduce((state, current) => {
    state[`/fahrrad/${current.slug}/`] = {
      page: '/page',
      query: {
        ...current,
        sidebar: getSidebarProps(defaultSidebar),
      },
    };
    return state;
  }, {});


  const resPages = await getEntries({
    content_type: 'page',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const sortetPages = resPages.items.sort((a, b) => a.fields.url.localeCompare(b.fields.url));
  const cleanedPages = sortetPages.map(page => getPageProps(page, defaultSidebar));
  const enhancedPages = cleanedPages.map((page) => {
    if (page.url && page.url === '/') {
      page.isHome = true;
    }

    if (page.url && page.url === '/fahrrad/') {
      page.additionalContent = {
        id: 'bikes',
        content: cleanedBikesForList,
      };
    }

    if (page.url && page.url === '/news/') {
      page.additionalContent = {
        id: 'news',
        content: cleanedNews,
      };
    }
    return page;
  });

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
    ...contentfulNews,
    ...contentfulBikes,
  };
}

module.exports = exportPathMap;
