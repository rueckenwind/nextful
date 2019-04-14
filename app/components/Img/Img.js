import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import styled from '@emotion/styled';

const Image = styled.img`
  display: block;
`;

/* eslint-disable jsx-a11y/alt-text */
export const Img = React.forwardRef(({ className, srcWebp, ...props }, ref) => {
  if (!srcWebp) {
    return (<Image {...props} ref={ref} />);
  }

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcWebp} />
      <Image {...props} ref={ref} />
    </picture>
  );
});

Img.defaultProps = {
  className: null,
  srcWebp: null,
};

Img.propTypes = {
  className: PropTypes.string,
  srcWebp: PropTypes.string,
};

const maxApiDimension = w => (w > 4000 ? 4000 : w);

// eslint-disable-next-line react/no-multi-comp
export class ImgContentful extends PureComponent {
  constructor(props) {
    super(props);
    this.image = {
      width: props.width,
      height: props.height,
      // eslint-disable-next-line max-len
      src: '//images.ctfassets.net/rdglyrp094mu/6G0V6JCtBESzu542T0dm4G/d3e18cb056c6c07af325fb6f69e2b80a/placeholder.svg',
    };
    this.ratio = props.width / props.height;
    this.img = React.createRef();
    this.state = {
      isPlaceholder: true,
    };
  }

  componentDidMount() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          this.image = {
            width: this.img.current.offsetWidth,
            height: this.props.height && this.img.current.offsetWidth * this.ratio,
            src: this.props.src,
          };

          this.observer = this.observer.disconnect();

          this.setState({
            isPlaceholder: false,
          });
        }
      });
    });
    this.observer.observe(this.img.current);
  }

  render() {
    const {
      fit,
      ...props
    } = this.props;

    const restProps = {
      ...props,
    };

    delete restProps.width;
    delete restProps.height;
    delete restProps.src;

    const params = {
      fit,
      q: 85,
    };

    const jpgParams = {
      fm: 'jpg',
      fl: 'progressive',
    };

    const webpParams = {
      fm: 'webp',
    };

    const dimensions = {
      w: maxApiDimension(this.image.width),
      h: maxApiDimension(this.image.height),
    };

    const dimensions2x = {
      w: this.image.width && maxApiDimension(this.image.width * 2),
      h: this.image.height && maxApiDimension(this.image.height * 2),
    };

    const qsOpt = { skipNulls: true };

    if (this.state.isPlaceholder) {
      return (
        <Img
          ref={this.img}
          src={`${this.image.src}?${qs.stringify({ ...params, ...dimensions }, qsOpt)}`} />
      );
    }

    const jpgSrc = `${this.image.src}?${qs.stringify({ ...params, ...dimensions, ...jpgParams }, qsOpt)}`;
    const webpSrc = `${this.image.src}?${qs.stringify({ ...params, ...dimensions, ...webpParams }, qsOpt)} 1x, \
                    ${this.image.src}?${qs.stringify({ ...params, ...dimensions2x, ...webpParams }, qsOpt)} 2x`;

    return (
      <Img
        ref={this.img}
        src={jpgSrc}
        srcWebp={webpSrc}
        {...restProps} />
    );
  }
}

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
