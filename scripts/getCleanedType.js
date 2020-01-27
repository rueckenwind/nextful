const getSidebarProps = require('./remodel/getSidebarProps')
const getBikeProps = require('./remodel/getBikeProps')
const getNewsProps = require('./remodel/getNewsProps')
const getPageProps = require('./remodel/getPageProps')
const stripSys = require('../lib/stripSys')

module.exports = (type, entries = []) => {
  switch (type) {
    case 'page':
      return entries.items.map(item => getPageProps(item))

    case 'sidebar':
      return entries.items.map(item => getSidebarProps(item))

    case 'bike':
      return entries.items.map(item => getBikeProps(item))

    case 'news':
      return entries.items.map(item => getNewsProps(item))

    default:
      return entries.items.map(item => stripSys(item))
  }
}
