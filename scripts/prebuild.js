const { createClient } = require('contentful')

const getContentfulEntries = require('./getContentfulEntries')
const getCleanedType = require('./getCleanedType')
const { writeCache } = require('./cache')

const { getContentTypes } = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
})

function writePageCache(url, data) {
  const fileName = url.split('/').join('__')
  writeCache(data, `contentful/pages/${fileName}.json`)
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

  // write list of pages with only urls
  writeCache(
    [
      ...contentTypesCleaned.page.map(i => i.url),
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
    ],
    `contentful/pathMap.json`,
  )

  const pages = []

  contentTypesCleaned.page.forEach(i => {
    pages.push(i)
  })

  contentTypesCleaned.page.forEach(p => {
    writePageCache(p.url, p)
  })
}

prebuild()
