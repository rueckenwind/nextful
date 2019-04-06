import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

import MaxWidth from '../MaxWidth';
import ContentBox from '../ContentBox';
import News from '../News/News';
import RichText from '../RichText';
import Partner from '../Partner';
import BikesList from '../BikesList';

const StyledTemplate = styled.main`
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
    --grid-column-gap: 1.25rem;

    grid-template-areas: 'content sidebar';
    grid-template-columns: 2fr 1fr;
    max-width: 65rem;
  }
`;

const GridContent = styled.section`
  grid-area:
    ${({ fullWidth }) => {
    return fullWidth ? 'content / content / sidebar / sidebar' : 'content';
  }};
`;

const GridSidebar = styled.aside`
  grid-area: sidebar;
  max-width: 334px;
  margin-right: auto;
  margin-left: auto;
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

      case 'bikes':
        additionalContentModeled = (
          <BikesList bikes={additionalContent.content} />
        );
        break;

      default:
        break;
    }
  }

  const HomeContent = () => (
    <Fragment>
      <ContentBox>
        <Partner />
      </ContentBox>
      <ContentBox>
        Latest Bikes
      </ContentBox>
    </Fragment>
  );

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
              <ContentBox padded={widget.padded} key={widget.id}>
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
  sidebar: PropTypes.object,
  additionalContent: PropTypes.object,
};

export default Template;
