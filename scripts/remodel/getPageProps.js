const getSidebarProps = require('./getSidebarProps');

module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const {
    url,
    images,
    content,
    sidebar,
  } = fields;

  if (!url) {
    throw new Error('URL not defined!');
  }

  const pageProps = {
    url,
    id,
  };

  if (images) {
    pageProps.images = images.map(image => ({
      src: image.fields.file.url,
      alt: image.fields.description || image.fields.title,
    }));
  }

  if (content) {
    pageProps.content = content;
  }

  if (sidebar) {
    pageProps.sidebar = getSidebarProps(sidebar);
  }

  return pageProps;
};
