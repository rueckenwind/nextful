import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
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

const Page = ({ image, children }) => {
  return (
    <Fragment>
      <Meta />
      <Head>
        <link rel="prefetch" href="https://fonts.gstatic.com/s/opensans/v16/mem5YaGs126MiZpBA-UN_r8OUuhpKKSTjw.woff2" />
        <link rel="prefetch" href="https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2" />
        <link rel="prefetch" href="https://fonts.gstatic.com/s/opensans/v16/mem5YaGs126MiZpBA-UNirkOUuhpKKSTjw.woff2" />
      </Head>

      <GlobalStyles />

      <StyledPage>
        <Header image={image} />
        <Menu />
        { children }
        <Footer />
      </StyledPage>
    </Fragment>
  );
};

Page.defaultProps = {
  image: {},
};

Page.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

export default Page;
