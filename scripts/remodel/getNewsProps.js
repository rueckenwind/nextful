module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const {
    slug,
    title,
    image,
    content,
  } = fields;

  if (!slug) {
    throw new Error('Slug not defined!');
  }

  const newsProps = {
    id,
    title,
    slug,
  };

  if (image) {
    newsProps.image = {
      src: image.fields.file.url,
      alt: image.fields.description || image.fields.title,
    };
  }

  if (content) {
    newsProps.content = content;
  }

  return newsProps;
};
