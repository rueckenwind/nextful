import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

import MaxWidth from '../MaxWidth';
import ContentBox from '../ContentBox';

const Grid = styled.div`
  --grid-column-gap: 1rem;

  display: grid;
  grid-template-areas:
    "content"
    "sidebar";
  grid-column-gap: var(--grid-column-gap);

  @media ${viewportsJs.sm} {
    --grid-column-gap: 2rem;

    grid-template-areas: "content sidebar";
    grid-template-columns: 2fr 1fr;
    max-width: 65rem;
  }
`;

const GridContent = styled.div`
  grid-area: ${({ fullWidth }) => {
    return fullWidth ? 'content / content / sidebar / sidebar' : 'content';
  }};
`;

const GridSidebar = styled.div`
  grid-area: sidebar;
`;

const Template = ({ content, sidebar }) => {
  return (
    <MaxWidth>
      <Grid>
        <GridContent fullWidth={!sidebar}>
          <ContentBox>
            {content}
          </ContentBox>
        </GridContent>

        { sidebar && (
          <GridSidebar>
            <ContentBox>
              { sidebar }
            </ContentBox>
          </GridSidebar>
        ) }
      </Grid>
    </MaxWidth>
  );
};

Template.defaultProps = {
  content: null,
  sidebar: null,
};

Template.propTypes = {
  content: PropTypes.node,
  sidebar: PropTypes.node,
};

export default Template;
