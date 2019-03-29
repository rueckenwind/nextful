import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Menu from '../Menu';
import Template from '../Template';
import RichText from '../RichText';
import Footer from '../Footer';

const Page = ({ images, content, sidebar }) => {
  return (
    <Fragment>
      { images && <Header images={images} /> }
      <Menu />
      <Template
        header={{ images }}
        content={<RichText content={content} />}
        sidebar={<RichText content={sidebar.content} />} />
      <Footer />
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
