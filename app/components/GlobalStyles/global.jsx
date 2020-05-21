import { css } from '@emotion/core'

export default css`
  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    -webkt-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
    line-height: 1.5;
    color: #1a1e20;
    text-rendering: optimizeLegibility;
    background-color: #177ab1;
  }

  body {
    background-color: #f2f2f2;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
