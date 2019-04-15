import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import { Img } from './Img';

const maxApiDimension = w => (w > 4000 ? 4000 : w);

// eslint-disable-next-line react/no-multi-comp
export class ImgContentful extends PureComponent {
  constructor(props) {
    super(props);
    this.width = props.width;
    this.height = props.height;
    // eslint-disable-next-line max-len
    this.src = '//images.ctfassets.net/rdglyrp094mu/6G0V6JCtBESzu542T0dm4G/d3e18cb056c6c07af325fb6f69e2b80a/placeholder.svg';
    this.ratio = props.width / props.height;
    this.img = React.createRef();
    this.state = {
      isPlaceholder: true,
    };
  }

  componentDidMount() {
    console.log('componentDidMount', this.img);
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          console.log('isIntersecting');
          this.loadImg();
        }
      });
    });
    this.observer.observe(this.img.current);

    // if (window.requestIdleCallback) {
    //   window.requestIdleCallback(() => {
    //     console.log('requestIdleCallback');
    //     this.loadImg();
    //   });
    // }
  }

  loadImg = () => {
    this.width = this.img.current.offsetWidth;
    this.height = this.props.height && this.img.current.offsetWidth * this.ratio;
    this.src = this.props.src;

    this.observer = this.observer && this.observer.disconnect();

    this.setState({
      isPlaceholder: false,
    });
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
      w: maxApiDimension(this.width),
      h: maxApiDimension(this.height),
    };

    const dimensions2x = {
      w: this.width && maxApiDimension(this.width * 2),
      h: this.height && maxApiDimension(this.height * 2),
    };

    const qsOpt = { skipNulls: true };

    const placeholderSrc = `${this.src}?${qs.stringify({
      q: 1,
      fit: 'pad',
      ...jpgParams,
      ...dimensions,
    }, qsOpt)}`;
    const jpgSrc = `${this.src}?${qs.stringify({ ...params, ...dimensions, ...jpgParams }, qsOpt)}`;
    const webpSrc = `${this.src}?${qs.stringify({ ...params, ...dimensions, ...webpParams }, qsOpt)} 1x, \
                    ${this.src}?${qs.stringify({ ...params, ...dimensions2x, ...webpParams }, qsOpt)} 2x`;

    const src = this.state.isPlaceholder ? placeholderSrc : jpgSrc;

    return (
      <Img
        ref={this.img}
        width={this.width}
        height={this.height}
        src={src}
        srcWebp={this.state.isPlaceholder ? null : webpSrc}
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
