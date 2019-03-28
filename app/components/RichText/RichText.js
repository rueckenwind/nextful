import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import MapStatic from '../MapStatic';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { id, ...fields } = node.data.target.fields;

      switch (id) {
        case 'staticMap':
          return <MapStatic {...fields} />;

        default:
          return null;
      }

      // return <CustomComponent title={title} description={description} />;
    },
  },
};

const RichText = ({ content }) => {
  console.log(content);
  return (
    <div>
      { documentToReactComponents(content, options) }
    </div>
  );
};

RichText.propTypes = {
  content: PropTypes.object.isRequired,
};

export default RichText;
