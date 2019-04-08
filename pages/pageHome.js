/** @jsx jsx */

import { jsx } from '@emotion/core';

import Page from '../app/components/Page';
import {
  Template,
  TemplateContent,
  TemplateSidebar,
} from '../app/components/Template';
import ContentBox from '../app/components/ContentBox';
import Partner from '../app/components/Partner';
import LatestBikes from '../app/components/LatestBikes';
import News from '../app/components/News';
import RichText from '../app/components/RichText';
import { HSmall } from '../app/components/Typography';

const CfPage = ({
  images,
  content,
  currentNews,
  latestBikes,
  sidebar,
}) => (
  <Page images={images}>
    <Template>
      <TemplateContent templateHasSidebar={!!sidebar} >
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
);

CfPage.getInitialProps = async ({ query }) => query;

export default CfPage;
