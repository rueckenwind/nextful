/** @jsx jsx */

import { jsx } from '@emotion/core';

import Page from '../app/components/Page';
import {
  Template,
  TemplateContent,
  TemplateSidebar,
} from '../app/components/Template';
import ContentBox from '../app/components/ContentBox';
import RichText from '../app/components/RichText';

const CfPage = ({
  images, content, sidebar,
}) => (
  <Page images={images}>
    <Template>
      <TemplateContent templateHasSidebar={!!sidebar} >
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
