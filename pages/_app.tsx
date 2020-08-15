import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { loadDataForUrl, loadDataFromCache } from '../lib/cache'

import { GlobalStyles } from '../app/components/GlobalStyles'

/**
 * Custom Next.js <App />.
 * Next.js uses the `App` component to initialize pages.
 * You can override it and control the page initialization.
 */
class MyApp extends App {
  static async getInitialProps({ ctx }) {
    let apiProps = {}

    const path = ctx.asPath.split('?')[0]

    const { default: pageList } = await loadDataFromCache(
      'contentful/pagelist.json',
    )

    // test if id is defined. every page with id should have cache.json
    if (pageList && pageList.includes(path)) {
      // NOTE:10 the import wraps the data into the default key
      apiProps = await loadDataForUrl(path)
    }

    return {
      path,
      ...ctx.query,
      props: apiProps,
    }
  }

  componentDidCatch(error, info) {
    console.log(this, error, info)
  }

  render() {
    // @ts-ignore
    const { Component, props } = this.props

    const { ...pageProps } = props

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="height=device-height, initial-scale=1, minimum-scale=1"
          />
        </Head>

        <GlobalStyles />
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
