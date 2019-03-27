/** @jsx jsx */

// import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import GlobalStyles from '../app/components/GlobalStyles';
import Header from '../app/components/Header';
import Template from '../app/components/Template';
import RichText from '../app/components/RichText';

const CfPage = ({
  images, content, sidebar,
}) => {
  console.log({
    images, content, sidebar: sidebar.content,
  });
  return (
    <div>
      <GlobalStyles />
      { images && <Header images={images} /> }
      <Template
        header={{ images }}
        content={<RichText content={content} />}
        sidebar={<RichText content={sidebar.content} />} />
    </div>
  );
};

CfPage.getInitialProps = async ({ query }) => {
  return query;
};

export default CfPage;
