import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Template from '../Template';
import RichText from '../RichText';

const Page = ({ images, content, sidebar }) => {
  return (
    <Fragment>
      { images && <Header images={images} /> }
      <Template
        header={{ images }}
        content={<RichText content={content} />}
        sidebar={<RichText content={sidebar.content} />} />
    </Fragment>
  );
};

Page.defaultProps = {
  images: [],
  content: null,
  sidebar: null,
};

Page.propTypes = {
  images: PropTypes.array,
  content: PropTypes.object,
  sidebar: PropTypes.object,
};

export default Page;
