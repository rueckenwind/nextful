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
  images, content, additionalContent, sidebar,
}) => {
  const sidebarContent = sidebar ? (sidebar.content || null) : null;
  return (
    <StyledPage>
      <Header images={images} />
      <Menu />
      <Template
        header={{ images }}
        content={content && <RichText content={content} />}
        additionalContent={additionalContent}
        sidebar={sidebarContent && <RichText content={sidebarContent} />} />
      <Footer />
    </StyledPage>
  );
};

Page.defaultProps = {
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
  images: PropTypes.array,
  content: PropTypes.object,
  additionalContent: PropTypes.object,
  sidebar: PropTypes.object,
};

export default Page;
