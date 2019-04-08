import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import GlobalStyles from '../GlobalStyles';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import Meta from '../Meta/Meta';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Page = ({ images, children }) => {
  return (
    <Fragment>
      <GlobalStyles />
      <StyledPage>
        <Meta />
        <Header images={images} />
        <Menu />
        { children }
        <Footer />
      </StyledPage>
    </Fragment>
  );
};

Page.defaultProps = {
  images: [
    {
      src: 'https://images.ctfassets.net/rdglyrp094mu/6XNtRN11MjJPrKbo1C74sh/ce19af67df4e5942da2be8a2cba8fa7e/fritz-bielmeier-46072-unsplash.jpg', // eslint-disable-line max-len
      alt: '',
    },
  ],
};

Page.propTypes = {
  images: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default Page;
