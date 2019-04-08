import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

import MaxWidth from '../MaxWidth';
import ContentBox from '../ContentBox';
import RichText from '../RichText';
import BikeFilter from '../BikeFilter';

const StyledTemplate = styled.main`
  flex-grow: 1;
`;

const Grid = styled.div`
  --grid-column-gap: 1rem;

  display: grid;
  grid-template-areas:
    'filter'
    'content'
    'sidebar';
  grid-column-gap: var(--grid-column-gap);

  @media ${viewportsJs.sm} {
    --grid-column-gap: 1.25rem;

    grid-template-areas:
      'content filter'
      'content sidebar';
    grid-template-columns: 2fr 1fr;
    grid-template-rows: minmax(0, auto);
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
  max-width: 340px;
  margin-right: auto;
  margin-left: auto;
`;

const GridFilter = styled.div`
  grid-area: filter;
`;

export const Template = ({ children }) => (
  <StyledTemplate>
    <MaxWidth>
      <Grid>
        { children }
      </Grid>
    </MaxWidth>
  </StyledTemplate>
);

Template.defaultProps = {
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TemplateFilter = () => (
  <GridFilter>
    <ContentBox>
      <BikeFilter />
    </ContentBox>
  </GridFilter>
);

export const TemplateContent = ({ children, templateHasSidebar }) => (
  <GridContent fullWidth={!templateHasSidebar}>
    { children }
  </GridContent>
);

TemplateContent.defaultProps = {
  templateHasSidebar: false,
};

TemplateContent.propTypes = {
  children: PropTypes.node.isRequired,
  templateHasSidebar: PropTypes.bool,
};

export const TemplateSidebar = ({ widgets }) => (
  <GridSidebar>
    { widgets.map(widget => (
      <ContentBox padded={widget.padded} key={widget.id}>
        <RichText content={widget.content} />
      </ContentBox>
    )) }
  </GridSidebar>
);

TemplateSidebar.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.object,
    padded: PropTypes.bool,
  })).isRequired,
};
