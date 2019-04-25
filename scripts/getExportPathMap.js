const { createClient } = require('contentful');

const getSidebarProps = require('./remodel/getSidebarProps');
const getBikeProps = require('./remodel/getBikeProps');
const getNewsProps = require('./remodel/getNewsProps');
const getPageProps = require('./remodel/getPageProps');

const getNewsPages = require('./remodel/getNewsPages');
const getBikePages = require('./remodel/getBikePages');
const getMainPages = require('./remodel/getMainPages');


const { getEntries } = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
});


async function exportPathMap() {
  const staticPages = [
    // {
    //   url: '/404/',
    //   template: '/_error',
    //   query: { statusCode: 404 },
    // },
    // {
    //   url: '/500/',
    //   template: '/_error',
    //   query: { statusCode: 500 },
    // },
  ];

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

  const resBikes = await getEntries({
    content_type: 'bike',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const resBikeCategories = await getEntries({
    content_type: 'bikeCategory',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const resBikeFrameShapes = await getEntries({
    content_type: 'bikeFrameShape',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const resPages = await getEntries({
    content_type: 'page',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  const newsCleaned = resNews.items.map(item => getNewsProps(item));

  const bikesCleaned = resBikes.items.map(item => getBikeProps(item));
  const bikesCleanedForList = resBikes.items.map(item => getBikeProps(item, true));

  const bikeCategoriesCleaned = resBikeCategories.items.map(item => item.fields);
  const bikeFrameShapesCleaned = resBikeFrameShapes.items.map(item => item.fields);

  const pagesCleaned = resPages.items.map(page => getPageProps(page));


  /**
   * Pages
   */
  const bikesPages = getBikePages(bikesCleaned);

  const mainPages = getMainPages(
    pagesCleaned,
    newsCleaned,
    bikesCleanedForList,
    bikeCategoriesCleaned,
    bikeFrameShapesCleaned,
  );

  const newsPages = getNewsPages(newsCleaned, pagesCleaned);

  const pages = [
    ...mainPages,
    ...staticPages,
    ...newsPages,
    ...bikesPages,
  ];

  const pagesWithSidebar = pages.map((page) => {
    if (page.query.sidebar) return page;

    page.query.sidebar = getSidebarProps(defaultSidebar);
    return page;
  });

  return pagesWithSidebar.reduce((state, current) => {
    state[current.url] = {
      page: current.template,
      query: current.query,
    };
    return state;
  }, {});
}

module.exports = exportPathMap;
