import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Image = styled.img`
  display: block;
`

/* eslint-disable jsx-a11y/alt-text */
export const Img = React.forwardRef(
  ({ className, srcSetJpg, srcSetWebp, ...props }, ref) => (
    <picture className={className}>
      {srcSetJpg && <source type="image/jpg" srcSet={srcSetJpg} />}
      {srcSetWebp && <source type="image/webp" srcSet={srcSetWebp} />}
      <Image {...props} ref={ref} />
    </picture>
  ),
)

Img.defaultProps = {
  className: null,
  srcSetJpg: null,
  srcSetWebp: null,
}

Img.propTypes = {
  className: PropTypes.string,
  srcSetJpg: PropTypes.string,
  srcSetWebp: PropTypes.string,
}
