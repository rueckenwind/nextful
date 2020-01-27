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
import Partner from '../app/components/Partner'
import LatestBikes from '../app/components/LatestBikes'
import News from '../app/components/News'
import RichText from '../app/components/RichText'
import { HSmall } from '../app/components/Typography'

const CfPage = ({
  headerImage,
  content,
  currentNews,
  latestBikes,
  sidebar,
}) => (
  <Page image={headerImage}>
    <Template>
      <TemplateContent templateHasSidebar={!!sidebar}>
        <ContentBox>
          <HSmall>Unsere Partner</HSmall>
          <Partner />
        </ContentBox>

        <ContentBox>
          <HSmall>Neueste Fahrräder</HSmall>
          <LatestBikes bikes={latestBikes} />
        </ContentBox>

        <ContentBox>
          <HSmall>Aktuelle News</HSmall>
          <News {...currentNews} isExerpt={true} />
        </ContentBox>

        <ContentBox>
          <RichText content={content} />
        </ContentBox>
      </TemplateContent>

      <TemplateSidebar widgets={sidebar.widgets} />
    </Template>
  </Page>
)

CfPage.defaultProps = {
  headerImage: {
    src:
      'https://images.ctfassets.net/rdglyrp094mu/6XNtRN11MjJPrKbo1C74sh/ce19af67df4e5942da2be8a2cba8fa7e/fritz-bielmeier-46072-unsplash.jpg', // eslint-disable-line max-len
    alt: '',
  },
  currentNews: {},
  latestBikes: [],
}

CfPage.propTypes = {
  headerImage: PropTypes.object,
  currentNews: PropTypes.object,
  latestBikes: PropTypes.array,
  content: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
}

export default CfPage
