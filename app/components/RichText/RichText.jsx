/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

import { H1, H2, H3, UL, OL, LI, HR, QUOTE } from '../Typography'
import Link from '../Link'
import { MapStatic } from '../MapStatic'
import { OpeningHours } from '../OpeningHours'
import { ContactForm } from '../ContactForm'

const OpenStatus = dynamic(
  () => import('../OpeningHours').then(mod => mod.OpenStatus),
  {
    ssr: false,
  },
)

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
    [BLOCKS.UL_LIST]: (node, children) => <UL>{children}</UL>,
    [BLOCKS.OL_LIST]: (node, children) => <OL>{children}</OL>,
    [BLOCKS.LIST_ITEM]: (node, children) => <LI>{children}</LI>,
    [BLOCKS.QUOTE]: (node, children) => <QUOTE>{children}</QUOTE>,
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (!children || (children.length === 1 && children[0] === '')) {
        return null
      }
      return <p key={children}>{children}</p>
    },
    [BLOCKS.HR]: () => <HR />,
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const { target } = node.data
      const { id } = target.sys.contentType.sys

      const customComponents = {
        openingStatus: <OpenStatus />,
        openingHours: <OpeningHours />,
        staticMap: <MapStatic />,
        contactForm: <ContactForm />,
      }

      switch (id) {
        case 'sidebarWidget':
        case 'contentKomponente':
          return customComponents[target.fields.id]

        default:
          return null
      }
    },

    [INLINES.HYPERLINK]: (node, children) => (
      <Link href={node.data.uri}>{children}</Link>
    ),
  },
  renderText: text =>
    text.split('\n').map((t, i) =>
      i > 0 ? (
        <>
          <br />
          {t}
        </>
      ) : (
        t
      ),
    ),
}

const RichText = ({ content }) => {
  return <div>{documentToReactComponents(content, options)}</div>
}

RichText.propTypes = {
  content: PropTypes.object.isRequired,
}

export default RichText
