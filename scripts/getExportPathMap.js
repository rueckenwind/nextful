const { createClient } = require('contentful');
const getBikes = require('./remodel/getBikes');
const getBikeCategories = require('./remodel/getBikeCategories');
const getBikeFrameShapes = require('./remodel/getBikeFrameShapes');
const getNews = require('./remodel/getNews');
const getPages = require('./remodel/getPages');

const { getEntries } = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
});


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

  const {
    newsCleaned,
    newsPages,
  } = getNews(resNews, defaultSidebar);

  const {
    bikesCleanedForList,
    bikesPages,
  } = getBikes(resBikes, defaultSidebar);

  const {
    bikeCategoriesCleaned,
  } = getBikeCategories(resBikeCategories);

  const {
    bikeFrameShapesCleaned,
  } = getBikeFrameShapes(resBikeFrameShapes);

  const {
    pages,
  } = getPages(
    resPages,
    defaultSidebar,
    newsCleaned,
    bikesCleanedForList,
    bikeCategoriesCleaned,
    bikeFrameShapesCleaned,
  );

  return {
    ...staticPages,
    ...pages,
    ...newsPages,
    ...bikesPages,
  };
}

module.exports = exportPathMap;
