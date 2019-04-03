import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

import MaxWidth from '../MaxWidth';
import ContentBox from '../ContentBox';
import News from '../News/News';
import RichText from '../RichText';

const StyledTemplate = styled.div`
  flex-grow: 1;
`;

const Grid = styled.div`
  --grid-column-gap: 1rem;

  display: grid;
  grid-template-areas:
    'content'
    'sidebar';
  grid-column-gap: var(--grid-column-gap);

  @media ${viewportsJs.sm} {
    --grid-column-gap: 2rem;

    grid-template-areas: 'content sidebar';
    grid-template-columns: 2fr 1fr;
    max-width: 65rem;
  }
`;

const GridContent = styled.div`
  grid-area:
    ${({ fullWidth }) => {
    return fullWidth ? 'content / content / sidebar / sidebar' : 'content';
  }};
`;

const GridSidebar = styled.div`
  grid-area: sidebar;
`;

const Template = ({
  isHome, content, sidebar, additionalContent,
}) => {
  let additionalContentModeled = null;
  if (additionalContent) {
    switch (additionalContent.id) {
      case 'news':
        additionalContentModeled = (
          <Fragment>
            {additionalContent.content.map(news => <News {...news} key={news.slug} isExerpt={true} />)}
          </Fragment>
        );
        break;

      default:
        break;
    }
  }

  const HomeContent = () => (
    <Fragment>
      <ContentBox>
        Partner
      </ContentBox>
      <ContentBox>
        Latest Bikes
      </ContentBox>
    </Fragment>
  );

  console.log(sidebar.widgets);

  return (
    <StyledTemplate>
      <MaxWidth>
        <Grid>
          <GridContent fullWidth={!sidebar}>
            { isHome && <HomeContent /> }
            <ContentBox>
              {content}
              {additionalContentModeled}
            </ContentBox>
          </GridContent>

          <GridSidebar>
            { sidebar.widgets && sidebar.widgets.map(widget => (
              <ContentBox padded={widget.padded}>
                <RichText content={widget.content} />
              </ContentBox>
            )) }
          </GridSidebar>
        </Grid>
      </MaxWidth>
    </StyledTemplate>
  );
};

Template.defaultProps = {
  isHome: false,
  content: undefined,
  sidebar: undefined,
  additionalContent: null,
};

Template.propTypes = {
  isHome: PropTypes.bool,
  content: PropTypes.node,
  sidebar: PropTypes.node,
  additionalContent: PropTypes.object,
};

export default Template;
