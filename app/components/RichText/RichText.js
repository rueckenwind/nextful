import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { H1, H2, H3 } from '../Headline';
import MapStatic from '../MapStatic';

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
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
