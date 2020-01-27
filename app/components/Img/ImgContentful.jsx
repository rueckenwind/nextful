import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import styled from '@emotion/styled'
import { Img } from './Img'

const maxApiDimension = w => (w > 4000 ? 4000 : w)

const ImgWrap = styled.div`
  ${({ loaded }) =>
    loaded
      ? ''
      : `
    filter: blur(.25rem);
    clip-path: inset(0 0);
  `}
`

// eslint-disable-next-line react/no-multi-comp
export class ImgContentful extends PureComponent {
  constructor(props) {
    super(props)
    this.width = props.width
    this.height = props.height
    this.ratio = props.width / props.height
    this.img = React.createRef()
    this.state = {
      status: 'loading',
    }
  }

  componentDidMount() {
    // console.log('componentDidMount', this.img);
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry
        if (isIntersecting) {
          // console.log('isIntersecting');
          this.loadImg()
        }
      })
    })
    this.observer.observe(this.img.current)

    // if (window.requestIdleCallback) {
    //   window.requestIdleCallback(() => {
    //     console.log('requestIdleCallback');
    //     this.loadImg();
    //   });
    // }
  }

  loadImg = () => {
    this.width = this.img.current.offsetWidth
    this.height = this.props.height && this.img.current.offsetWidth * this.ratio

    this.observer = this.observer && this.observer.disconnect()

    this.setState({
      status: 'loadingHiRes',
    })
  }

  handleHasLoaded = () => {
    // console.log('handleHasLoaded');
    this.setState({
      status: 'hasLoaded',
    })
  }

  render() {
    const { width, height, fit, src, ...props } = this.props

    const restProps = {
      ...props,
    }

    delete restProps.width
    delete restProps.height
    delete restProps.src

    const params = {
      fit,
      q: 85,
    }

    const dimensions = {
      w: maxApiDimension(this.width),
      h: maxApiDimension(this.height),
    }

    const qsOpt = { skipNulls: true }

    const placeholderSrc = `${src}?${qs.stringify(
      {
        w: width * 0.2,
        h: height && height * 0.2,
        fm: 'jpg',
        q: 10,
        fit,
      },
      qsOpt,
    )}`
    const jpgSrc = `${src}?${qs.stringify(
      { ...params, ...dimensions, fm: 'jpg' },
      qsOpt,
    )}`

    const viewports = [310, 990, 1425, 1780, 2096, 3000].filter(
      vp => vp <= width * 2,
    )

    // console.log({ width, viewports });

    const srcSetJpg = viewports
      .map(vp => {
        const jpgDimensions = {
          w: maxApiDimension(vp),
          h: maxApiDimension(vp * this.ratio),
        }
        const srcParams = { ...params, ...jpgDimensions, fm: 'jpg' }
        return `${src}?${qs.stringify(srcParams, qsOpt)} ${vp}w`
      })
      .join(', ')

    const srcSetWebp = viewports
      .map(vp => {
        const webpDimensions = {
          w: maxApiDimension(vp),
          h: maxApiDimension(vp * this.ratio),
        }
        const srcParams = { ...params, ...webpDimensions, fm: 'webp' }
        return `${src}?${qs.stringify(srcParams, qsOpt)} ${vp}w`
      })
      .join(', ')

    const hasLoaded = this.state.status === 'hasLoaded'
    const loadHiRes = this.state.status === 'loadingHiRes' || hasLoaded

    return (
      <ImgWrap loaded={hasLoaded}>
        <Img
          ref={this.img}
          width={this.width} // TODO: Needs fix for upscaling window
          height={this.height}
          src={loadHiRes ? jpgSrc : placeholderSrc}
          srcSetJpg={srcSetJpg}
          srcSetWebp={srcSetWebp}
          // srcWebp={loadHiRes ? webpSrc : null}
          {...restProps}
          onLoad={this.handleHasLoaded}
        />
      </ImgWrap>
    )
  }
}

ImgContentful.defaultProps = {
  width: null,
  height: null,
  fit: null,
}

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
}
