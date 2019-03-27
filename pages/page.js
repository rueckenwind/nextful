/** @jsx jsx */

// import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';

import Header from '../app/components/Header';
import GlobalStyles from '../app/components/GlobalStyles';

const CfPage = (props) => {
  // console.log(props);
  return (
    <div>
      <GlobalStyles />
      <Header image={props.image && props.image[0].fields.file.url} />

      {props.title}
    </div>
  );
};

CfPage.getInitialProps = async ({ query }) => {
  return query;
};

export default CfPage;
