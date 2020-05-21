const getSidebarProps = require('./remodel/getSidebarProps')
const getPageProps = require('./remodel/getPageProps')
const stripSys = require('../lib/stripSys')

module.exports = (type, entries = []) => {
  switch (type) {
    case 'page':
      return entries.items.map(item => getPageProps(item))

    case 'sidebar':
      return entries.items.map(item => getSidebarProps(item))

    default:
      return entries.items.map(item => stripSys(item))
  }
}
