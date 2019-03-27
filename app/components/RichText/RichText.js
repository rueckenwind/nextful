import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const options = {};

const RichText = ({ content }) => (
  <div>
    { documentToReactComponents(content, options) }
  </div>
);

RichText.propTypes = {
  content: PropTypes.object.isRequired,
};

export default RichText;
