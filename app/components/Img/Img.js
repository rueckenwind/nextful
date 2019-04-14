import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Image = styled.img`
  display: block;
`;

/* eslint-disable jsx-a11y/alt-text */
export const Img = React.forwardRef(({ className, srcWebp, ...props }, ref) => (
  <picture className={className}>
    { srcWebp && <source type="image/webp" srcSet={srcWebp} />}
    <Image {...props} ref={ref} />
  </picture>
));

Img.defaultProps = {
  className: null,
  srcWebp: null,
};

Img.propTypes = {
  className: PropTypes.string,
  srcWebp: PropTypes.string,
};
