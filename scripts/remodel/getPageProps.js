const getSidebarProps = require('./getSidebarProps');

module.exports = ({ sys, fields } = {}, defaultSidebar) => {
  const { id } = sys;
  const {
    url,
    image,
    content,
    sidebar = defaultSidebar,
  } = fields;

  if (!url) {
    throw new Error('URL not defined!');
  }

  const pageProps = {
    url,
    id,
  };

  if (image) {
    pageProps.headerImage = {
      src: image.fields.file.url,
      alt: image.fields.description || image.fields.title,
    };
  }

  if (content) {
    pageProps.content = content;
  }

  if (sidebar) {
    pageProps.sidebar = getSidebarProps(sidebar);
  }

  return pageProps;
};
