/** @jsx jsx */

import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'

import Page from '../app/components/Page'
import {
  Template,
  TemplateContent,
  TemplateSidebar,
} from '../app/components/Template'
import ContentBox from '../app/components/ContentBox'
import News from '../app/components/News'

const CfPage = ({ headerImage, news, sidebar }) => {
  return (
    <Page image={headerImage}>
      <Template>
        <TemplateContent templateHasSidebar={!!sidebar}>
          <ContentBox>
            {news.map(singleNews => (
              <News {...singleNews} key={singleNews.slug} isExerpt={true} />
            ))}
          </ContentBox>
        </TemplateContent>

        <TemplateSidebar widgets={sidebar.widgets} />
      </Template>
    </Page>
  )
}

CfPage.defaultProps = {
  headerImage: {
    src:
      'https://images.ctfassets.net/rdglyrp094mu/6XNtRN11MjJPrKbo1C74sh/ce19af67df4e5942da2be8a2cba8fa7e/fritz-bielmeier-46072-unsplash.jpg', // eslint-disable-line max-len
    alt: '',
  },
}

CfPage.propTypes = {
  headerImage: PropTypes.object,
  news: PropTypes.array.isRequired,
  sidebar: PropTypes.object.isRequired,
}

CfPage.getInitialProps = async ({ query }) => query

export default CfPage