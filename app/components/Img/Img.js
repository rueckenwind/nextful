import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import styled from '@emotion/styled';

const Image = styled.img`
  display: block;
`;

/* eslint-disable jsx-a11y/alt-text */
export const Img = ({ className, srcWebp, ...props }) => {
  if (!srcWebp) {
    return (<img {...props} />);
  }

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcWebp} />
      <Image {...props} />
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

export const ImgContentful = ({
  width, height, fit, src, ...props
}) => {
  const params = {
    fit,
  };

  const jpgParams = {
    fm: 'jpg',
    q: 85,
    fl: 'progressive',
  };

  const webpParams = {
    fm: 'webp',
  };

  const dimensions = {
    w: width,
    h: height,
  };

  const dimensions2x = {
    w: width && width * 2,
    h: height && height * 2,
  };

  const qsOpt = { skipNulls: true };


  const jpgSrc = `${src}?${qs.stringify({ ...params, ...dimensions, ...jpgParams }, qsOpt)}`;
  const webpSrc = `${src}?${qs.stringify({ ...params, ...dimensions, ...webpParams }, qsOpt)} 1x, \
                   ${src}?${qs.stringify({ ...params, ...dimensions2x, ...webpParams }, qsOpt)} 2x`;

  return (
    <Img
      src={jpgSrc}
      srcWebp={webpSrc}
      {...props} />
  );
};

ImgContentful.defaultProps = {
  width: null,
  height: null,
  fit: null,
};


// https://www.contentful.com/developers/docs/references/images-api/
ImgContentful.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fit: PropTypes.oneOf([
    'pad', // Resize the image to the specified dimensions, padding the image if needed.
    // Uses background-color as padding color.
    'fill', // Resize the image to the specified dimensions, cropping the image if needed.
    'scale', // Resize the image to the specified dimensions, changing the original aspect ratio if needed.
    'crop', // Crop a part of the original image to fit into the specified dimensions.
    'thumb', // Create a thumbnail from the image.
  ]),
  src: PropTypes.string.isRequired,
};
