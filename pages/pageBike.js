/** @jsx jsx */

import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import Page from '../app/components/Page';
import {
  Template,
  TemplateContent,
  TemplateSidebar,
} from '../app/components/Template';
import ContentBox from '../app/components/ContentBox';
import RichText from '../app/components/RichText';
import { HSmall } from '../app/components/Typography';
import { BikeImage, BikeDetails } from '../app/components/Bike/Bike';

const CfPage = ({
  images, content, bike, sidebar,
}) => (
  <Page images={images}>
    <Template>
      <TemplateContent templateHasSidebar={!!sidebar}>
        <BikeImage {...bike.image} />
        <ContentBox>
          <RichText content={content} />
          <br />
          <HSmall>Details</HSmall>
          <BikeDetails {...bike} />
        </ContentBox>
      </TemplateContent>

      <TemplateSidebar widgets={sidebar.widgets} />
    </Template>
  </Page>
);

CfPage.defaultProps = {
  images: [
    {
      src: 'https://images.ctfassets.net/rdglyrp094mu/6XNtRN11MjJPrKbo1C74sh/ce19af67df4e5942da2be8a2cba8fa7e/fritz-bielmeier-46072-unsplash.jpg', // eslint-disable-line max-len
      alt: '',
    },
  ],
};

CfPage.propTypes = {
  images: PropTypes.array,
  content: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
  bike: PropTypes.object.isRequired,
};

CfPage.getInitialProps = async ({ query }) => query;

export default CfPage;
