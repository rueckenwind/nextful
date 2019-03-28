/** @jsx jsx */

import { Fragment } from 'react';
import { jsx } from '@emotion/core';

import GlobalStyles from '../app/components/GlobalStyles';
import Page from '../app/components/Page';

const CfPage = (props) => {
  return (
    <Fragment>
      <GlobalStyles />
      <Page {...props} />
    </Fragment>
  );
};

CfPage.getInitialProps = async ({ query }) => query;

export default CfPage;
