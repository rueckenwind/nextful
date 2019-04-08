import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Select from 'react-select';
import { H2 } from '../Typography';
import { BikeFilterConsumer } from '../BikeFilterContext';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Item = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemHeadline = styled.div`
  font-size: .75rem;
  font-weight: bold;
`;

const BikeFilter = () => (
  <BikeFilterConsumer>
    {({
      handleChange,
      categories,
      frameShapes,
      bikeCategories = [],
      bikeFrameShapes = [],
    } = {}) => {
      const optionsCategories = bikeCategories.map(cat => ({
        label: cat.name,
        value: cat.id,
      }));

      const optionsFrameShapes = bikeFrameShapes.map(cat => ({
        label: cat.name,
        value: cat.id,
      }));

      return (
        <Fragment>
          <H2>Filter</H2>
          <Wrapper>
            <Item>
              <ItemHeadline>Kategorie</ItemHeadline>
              <Select
                value={categories}
                onChange={sel => handleChange('categories', sel)}
                options={optionsCategories}
                instanceId={42}
                isMulti />
            </Item>

            <Item>
              <ItemHeadline>Rahmenform</ItemHeadline>
              <Select
                value={frameShapes}
                onChange={sel => handleChange('frameShapes', sel)}
                options={optionsFrameShapes}
                instanceId={42 + 1}
                isMulti />
            </Item>
          </Wrapper>
        </Fragment>
      );
    }}
  </BikeFilterConsumer>
);

BikeFilter.propTypes = {
};

export default BikeFilter;
