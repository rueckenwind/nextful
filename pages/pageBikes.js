/** @jsx jsx */

import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import Page from '../app/components/Page';
import {
  Template,
  TemplateFilter,
  TemplateContent,
  TemplateSidebar,
} from '../app/components/Template';
import ContentBox from '../app/components/ContentBox';
import BikesList from '../app/components/BikesList';
import { BikeFilterProvider, BikeFilterConsumer } from '../app/components/BikeFilterContext';

const CfPage = ({
  headerImage,
  bikes,
  bikeFilter,
  sidebar,
}) => (
  <Page image={headerImage}>
    <BikeFilterProvider bikes={bikes} {...bikeFilter}>
      <Template>
        <TemplateFilter />

        <TemplateContent templateHasSidebar={!!sidebar}>
          <ContentBox>
            <BikeFilterConsumer>
              {({ bikes: filteredBikes } = {}) => (
                <BikesList bikes={filteredBikes} />
              )}
            </BikeFilterConsumer>
          </ContentBox>
        </TemplateContent>

        <TemplateSidebar widgets={sidebar.widgets} />
      </Template>
    </BikeFilterProvider>
  </Page>
);

CfPage.defaultProps = {
  headerImage: {
    src: 'https://images.ctfassets.net/rdglyrp094mu/6XNtRN11MjJPrKbo1C74sh/ce19af67df4e5942da2be8a2cba8fa7e/fritz-bielmeier-46072-unsplash.jpg', // eslint-disable-line max-len
    alt: '',
  },
};

CfPage.propTypes = {
  headerImage: PropTypes.object,
  bikes: PropTypes.array.isRequired,
  bikeFilter: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
};

CfPage.getInitialProps = async ({ query }) => query;

export default CfPage;
