import React from 'react'
import PropTypes from 'prop-types'

import Favicons from '../Favicons'

export const Meta = ({ url, type, title, description, image }) => {
  return (
    <>
      <meta content="width=device-width,initial-scale=1" name="viewport" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Rückenwind Lübeck" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@rueckenwind-luebeck" />
      <meta name="twitter:creator" content="@rueckenwind-luebeck" />

      <Favicons />
    </>
  )
}

Meta.defaultProps = {
  url: 'https://rw.schoen.world',
  type: 'website',
  title: 'Rückenwind Lübeck - Individuelle Fahrräder',
  description:
    // eslint-disable-next-line no-multi-str
    'Rückenwind Lübeck ist Ihr persönlicher Ansprechpartner in Bezug auf \
    Ihr individuelles Fahrrad und Service im Herzen der Lübecker Altstadt.',
  image: 'https://rw.schoen.world/assets/images/social-avatar.jpg',
}

Meta.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}
