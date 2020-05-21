const { createClient } = require('contentful')

const { getEntries } = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
})

module.exports = async type => {
  return getEntries({
    content_type: type,
    limit: 1000,
    include: 10,
  }).catch(e => {
    // eslint-disable-next-line no-console
    console.log(e)
    throw new Error(e)
  })
}
