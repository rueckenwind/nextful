import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import qs from 'qs'
import ReactImageMagnify from 'react-image-magnify'

import colors from '../../js/colors'
import checkForWebpSupport from '../../js/checkForWebpSupport'

const MAX_WIDTH = 680

const Img = styled.img`
  display: block;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
`

const WrapImg = styled.div`
  display: block;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);

  div:nth-child(2) > img {
    max-width: none;
  }
`

export const BikeImage = ({ src, alt, details }) => {
  const img = src && {
    x1: `${src}?w=${MAX_WIDTH}`,
    x2: `${src}?w=${MAX_WIDTH * 2}`,
  }

  if (details.width <= MAX_WIDTH) {
    return <Img src={img.x1} srcSet={`${img.x1} 1x, ${img.x2} 2x`} alt={alt} />
  }

  const ratio = details.width / details.height

  const imgIsBig = details.width > 2400

  const newDetails = {
    width: imgIsBig ? 2400 : details.width,
    height: imgIsBig ? 2400 / ratio : details.height,
  }

  const contentfulImg = checkForWebpSupport()
    ? `${src}?${qs.stringify({ fm: 'webp' })}`
    : `${src}?${qs.stringify({ fm: 'jpg', q: 70 })}`

  return (
    <WrapImg>
      <ReactImageMagnify
        enlargedImagePosition="over"
        {...{
          smallImage: {
            alt,
            isFluidWidth: true,
            src: img.x1,
            srcSet: `${img.x1} 1x, ${img.x2} 2x`,
          },
          largeImage: {
            style: {
              maxWidth: 'none',
            },
            src: contentfulImg,
            width: newDetails.width,
            height: newDetails.height,
          },
        }}
      />
    </WrapImg>
  )
}

BikeImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  details: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
}

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
`

const Tr = styled.tr`
  :nth-of-type(odd) {
    background-color: ${colors.graylightest};
  }
`

const Td = styled.td`
  padding: 0.25rem 0.5rem;

  :not(:first-of-type) {
    padding-left: 1rem;
  }
`

export const BikeDetails = ({ category, frameShapes = [], status }) => {
  const details = [
    {
      title: 'Kategorie',
      value: category.name,
    },
    {
      title: `Rahmenform${frameShapes.length > 1 ? 'en' : ''}`,
      value: frameShapes
        .map(({ name }) => name)
        .sort()
        .join(', '),
    },
    {
      title: 'Status',
      value: status,
    },
  ]

  return (
    <Table>
      <tbody>
        {details.map(({ title, value }) => (
          <Tr key={title}>
            <Td>{title}</Td>
            <Td>{value}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}

BikeDetails.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  frameShapes: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
}
