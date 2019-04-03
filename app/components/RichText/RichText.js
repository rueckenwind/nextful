import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { H1, H2, H3, UL, OL, LI } from '../Typography';
import Link from '../Link';
import MapStatic from '../MapStatic';

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
    [BLOCKS.UL_LIST]: (node, children) => <UL>{children}</UL>,
    [BLOCKS.OL_LIST]: (node, children) => <OL>{children}</OL>,
    [BLOCKS.LIST_ITEM]: (node, children) => <LI>{children}</LI>,
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (!children || children[0] === '') return null;
      return (<p>{children}</p>);
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { id, ...fields } = node.data.target.fields;

      switch (id) {
        case 'openingStatus':
          return <div>openingStatus</div>;

        case 'openingHours':
          return <div>openingHours</div>;

        case 'staticMap':
          return <MapStatic {...fields} />;

        default:
          return null;
      }

      // return <CustomComponent title={title} description={description} />;
    },

    [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}>{children}</Link>,
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
