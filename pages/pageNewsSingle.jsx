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
import RichText from '../app/components/RichText'
import { ImgContentful } from '../app/components/Img'

const CfPage = ({ headerImage, image, content, sidebar }) => (
  <Page image={headerImage}>
    <Template>
      <TemplateContent templateHasSidebar={!!sidebar}>
        <ContentBox>
          <ImgContentful width={640} src={image.src} alt={image.alt} />
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
}

CfPage.propTypes = {
  headerImage: PropTypes.object,
  image: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
}

CfPage.getInitialProps = async ({ query }) => query

export default CfPage