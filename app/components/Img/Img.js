import React from 'react';
import PropTypes from 'prop-types';


/* eslint-disable jsx-a11y/alt-text */
export const Img = ({ className, srcWebp, ...props }) => {
  if (!srcWebp) {
    return (<img {...props} />);
  }

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcWebp} />
      <img className={className} {...props} />
    </picture>
  );
};

Img.defaultProps = {
  className: null,
  srcWebp: null,
};

Img.propTypes = {
  className: PropTypes.string,
  srcWebp: PropTypes.string,
};

// export const ImgContentful = ({ width, height, ...props }) => {
//   return <img />;
// };
