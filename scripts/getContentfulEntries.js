const { createClient } = require('contentful')

const { getEntries } = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
})

const options = {
  news: {
    'fields.publishDate[lte]': new Date(),
    order: '-fields.publishDate', // '-' for reverse order
  },
  bikes: {
    'fields.publishDate[lte]': new Date(),
    order: '-fields.publishDate', // '-' for reverse order
  },
}

module.exports = async type => {
  return getEntries({
    content_type: type,
    limit: 1000,
    include: 10,
    ...options[type],
  }).catch(e => {
    // eslint-disable-next-line no-console
    console.log(e)
    throw new Error(e)
  })
}
