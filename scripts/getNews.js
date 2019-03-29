const getNewsProps = require('./remodel/getNewsProps');

async function getNews(getEntries) {
  const res = await getEntries({
    content_type: 'news',
    limit: 1000,
    include: 10,
  }).catch((e) => {
    throw new Error(e);
  });

  if (!res.items) {
    console.error('no news found!');
    return {};
  }

  const cleanedNews = res.items.map(item => getNewsProps(item));
  return cleanedNews;
}

module.exports = getNews;
