/** @jsx jsx */

// import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { jsx, Global, css } from '@emotion/core';

import normalize from 'normalize.css';
import globalstyles from './global.css';

export default () => (
  <Fragment>
    <Global styles={css`${normalize}`} />
    <Global styles={css`${globalstyles}`} />
  </Fragment>
);
