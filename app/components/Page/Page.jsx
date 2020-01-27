import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Header from '../Header'
import Menu from '../Menu'
import Footer from '../Footer'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.main`
  flex-grow: 1;
`

const Page = ({ image, children }) => {
  return (
    <StyledPage>
      <Header image={image} />
      <Menu />
      <Content>{children}</Content>
      <Footer />
    </StyledPage>
  )
}

Page.defaultProps = {
  image: {},
}

Page.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

export default Page
