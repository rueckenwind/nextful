module.exports = ({ sys, fields } = {}, isTeaser = false) => {
  const { id } = sys;
  const {
    name,
    slug,
    image,
    content,
    category,
    frameShapes,
    color,
    status,
  } = fields;

  console.log({
    frameShapes,
  });

  if (!slug) {
    throw new Error('Slug not defined!');
  }

  const bikeProps = {
    id,
    name,
    slug,
    category: category.fields,
    frameShapes: frameShapes.map(item => item.fields),
    status,
  };

  if (image) {
    bikeProps.image = {
      src: image.fields.file.url,
      alt: image.fields.description || image.fields.title,
    };
  }

  if (isTeaser) {
    return bikeProps;
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