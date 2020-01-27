const { createClient } = require('contentful')

const getContentfulEntries = require('./getContentfulEntries')
const getCleanedType = require('./getCleanedType')
const enhancePage = require('./remodel/enhancePage')
const { writeCache } = require('./cache')

const { getContentTypes } = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
})

function writePageCache(url, data) {
  const fileName = url.split('/').join('__')
  writeCache(data, `contentful/pages/${fileName}.json`)
}

function getNewsUrl(slug) {
  return `/news/${slug}/`
}

function getBikeUrl(slug) {
  return `/fahrrad/${slug}/`
}

async function prebuild() {
  const contentTypes = []

  try {
    const res = await getContentTypes()
    res.items.forEach(({ sys: { id }, name }) => {
      contentTypes.push({
        id,
        name,
      })
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  const contentTypesCleaned = {}

  await Promise.all(
    contentTypes.map(async ({ id }) => {
      const typeRes = await getContentfulEntries(id)
      const typeCleaned = getCleanedType(id, typeRes)

      contentTypesCleaned[id] = typeCleaned

      writeCache(typeCleaned, `contentful/${id}.json`)
    }),
  )

  const [defaultSidebar] = contentTypesCleaned.sidebar.filter(
    s => s.id === '2naudBsDC6fu3yTOrr7Zom',
  )

  // write list of pages with only urls
  writeCache(
    [
      ...contentTypesCleaned.page.map(i => i.url),
      ...contentTypesCleaned.news.map(i => getNewsUrl(i.slug)),
      ...contentTypesCleaned.bike.map(i => getBikeUrl(i.slug)),
    ],
    `contentful/pagelist.json`,
  )

  // write exportPathMap
  writeCache(
    [
      ...contentTypesCleaned.page.map(({ url, template }) => ({
        url,
        page: template,
      })),
      ...contentTypesCleaned.news.map(i => ({
        url: getNewsUrl(i.slug),
        page: '/pageNewsSingle',
      })),
      ...contentTypesCleaned.bike.map(i => ({
        url: getBikeUrl(i.slug),
        page: '/pageBike',
      })),
    ],
    `contentful/pathMap.json`,
  )

  const pages = []

  contentTypesCleaned.page.forEach(i => {
    pages.push(i)
  })

  contentTypesCleaned.news.forEach(i => {
    pages.push({
      ...i,
      url: getNewsUrl(i.slug),
    })
  })

  contentTypesCleaned.bike.forEach(i => {
    pages.push({
      ...i,
      url: getBikeUrl(i.slug),
    })
  })

  const pagesEnhanced = pages.map(p =>
    enhancePage(p, { contentTypesCleaned, defaultSidebar }),
  )

  pagesEnhanced.forEach(p => {
    writePageCache(p.url, p)
  })
}

prebuild()
