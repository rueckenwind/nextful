/** @jsx jsx */

import { jsx } from '@emotion/core';

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
  images,
  bikes,
  bikeFilter,
  sidebar,
}) => (
  <Page images={images}>
    <BikeFilterProvider bikes={bikes} {...bikeFilter}>
      <Template>
        <TemplateFilter />

        <TemplateContent templateHasSidebar={!!sidebar} >
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

CfPage.getInitialProps = async ({ query }) => query;

export default CfPage;
