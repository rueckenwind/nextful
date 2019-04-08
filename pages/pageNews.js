/** @jsx jsx */

import { jsx } from '@emotion/core';

import Page from '../app/components/Page';
import {
  Template,
  TemplateContent,
  TemplateSidebar,
} from '../app/components/Template';
import ContentBox from '../app/components/ContentBox';
import News from '../app/components/News';

const CfPage = ({
  images, news, sidebar,
}) => {
  return (
    <Page images={images}>
      <Template>
        <TemplateContent templateHasSidebar={!!sidebar} >
          <ContentBox>
            { news.map(singleNews => (
              <News {...singleNews} key={singleNews.slug} isExerpt={true} />
            )) }
          </ContentBox>
        </TemplateContent>

        <TemplateSidebar widgets={sidebar.widgets} />
      </Template>
    </Page>
  );
};

CfPage.getInitialProps = async ({ query }) => query;

export default CfPage;
