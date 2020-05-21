import React from 'react'
import { Global } from '@emotion/core'

// import normalize from 'normalize.css';
import normalize from './normalize'
import globalStyles from './global'
import fonts from './fonts'

/* stylelint-disable */
export const GlobalStyles = () => (
  <>
    <Global styles={normalize} />
    <Global styles={globalStyles} />
    <Global styles={fonts} />
  </>
)
