import React from 'react'
import Parser from 'html-react-parser'
import faviconData from '../../../faviconData.json'

const faviconHtml = faviconData && faviconData.favicon.html_code
const Favicons = () =>
  Parser(faviconHtml, {
    replace(domNode) {
      if (domNode.attribs && domNode.attribs.rel === 'manifest') {
        return (
          <link
            rel="manifest"
            href="/static/assets/images/favicons/site.webmanifest"
          />
        )
      }
      return null
    },
  })

export default Favicons
