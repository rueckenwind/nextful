module.exports = ({ sys, fields } = {}) => {
  const { id } = sys;
  const {
    name,
    slug,
    image,
    content,
    category,
    frameShape,
  } = fields;

  console.log({
    category,
    frameShape,
  });

  if (!slug) {
    throw new Error('Slug not defined!');
  }

  const bikeProps = {
    id,
    name,
    slug,
  };

  if (image) {
    bikeProps.image = {
      src: image.fields.file.url,
      alt: image.fields.description || image.fields.title,
    };
  }

  if (content) {
    bikeProps.content = {
      ...content,
      content: [
        {
          data: {},
          content: [{
            data: {},
            marks: [],
            value: name,
            nodeType: 'text',
          }],
          nodeType: 'heading-1',
        },
        ...content.content,
      ],
    };
  }

  return bikeProps;
};
