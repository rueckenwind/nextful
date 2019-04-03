import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Header from '../Header';
import Menu from '../Menu';
import Template from '../Template';
import RichText from '../RichText';
import Footer from '../Footer';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Page = ({
  isHome, images, content, additionalContent, sidebar,
}) => {
  return (
    <StyledPage>
      <Header images={images} />
      <Menu />
      <Template
        isHome={isHome}
        content={content && <RichText content={content} />}
        additionalContent={additionalContent}
        sidebar={sidebar} />
      <Footer />
    </StyledPage>
  );
};

Page.defaultProps = {
  isHome: false,
  images: [
    {
      src: 'https://images.ctfassets.net/rdglyrp094mu/6XNtRN11MjJPrKbo1C74sh/ce19af67df4e5942da2be8a2cba8fa7e/fritz-bielmeier-46072-unsplash.jpg', // eslint-disable-line max-len
      alt: '',
    },
  ],
  content: null,
  additionalContent: null,
  sidebar: null,
};

Page.propTypes = {
  isHome: PropTypes.bool,
  images: PropTypes.array,
  content: PropTypes.object,
  additionalContent: PropTypes.object,
  sidebar: PropTypes.object,
};

export default Page;
