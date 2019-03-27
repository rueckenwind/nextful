const getSidebarProps = require('./getSidebarProps');

module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const {
    url = null,
    images: imagesOrig,
    content = null,
    sidebar: sidebarOrig,
  } = fields;

  const images = imagesOrig ? imagesOrig.map(image => ({
    src: image.fields.file.url,
    alt: image.fields.description || image.fields.title,
  })) : null;

  const sidebar = sidebarOrig ? getSidebarProps(sidebarOrig) : null;

  return {
    url,
    id,
    images,
    content,
    sidebar,
  };
};
