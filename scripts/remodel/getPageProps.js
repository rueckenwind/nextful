const getSidebarProps = require('./getSidebarProps')

function getPageTemplate(template) {
  switch (template) {
    case 'Home':
      return '/pageHome'

    case 'Bikes':
      return '/pageBikes'

    case 'News':
      return '/pageNews'

    default:
      return '/page'
  }
}

module.exports = ({ sys, fields } = {}) => {
  const { id } = sys
  const { url, image, content, sidebar, template } = fields

  if (!url) {
    throw new Error('URL not defined!')
  }

  const pageProps = {
    url,
    id,
    template: getPageTemplate(template),
  }

  if (image) {
    pageProps.headerImage = {
      src: image.fields.file.url,
      alt: image.fields.description || image.fields.title,
    }
  }

  if (content) {
    pageProps.content = content
  }

  if (sidebar) {
    pageProps.sidebar = getSidebarProps(sidebar)
  }

  return pageProps
}
