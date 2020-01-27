const { readCache } = require('./cache')

async function exportPathMap() {
  // const staticPages = [
  //   {
  //     url: '/404/',
  //     template: '/_error',
  //     query: { statusCode: 404 },
  //   },
  //   {
  //     url: '/500/',
  //     template: '/_error',
  //     query: { statusCode: 500 },
  //   },
  // ]

  const pageList = await readCache('contentful/pathMap.json')

  /**
   * Pages
   */

  const pages = {}

  pageList.forEach(({ url, page }) => {
    pages[url] = {
      page,
    }
  })

  return pages
}

module.exports = exportPathMap
