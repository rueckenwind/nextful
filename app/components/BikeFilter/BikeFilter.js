/** @jsx jsx */

import { jsx } from '@emotion/core';

import { Fragment } from 'react';
import styled from '@emotion/styled';
import { Select } from '../Form';
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

const inputComponents = {
  select: Select,
};

const BikeFilter = () => (
  <BikeFilterConsumer>
    {({
      handleChange,
      category,
      frameShape,
      bikeCategories = [],
      bikeFrameShapes = [],
    } = {}) => {
      const values = {
        category,
        frameShape,
      };

      const filterList = [
        {
          id: 'category',
          name: 'Kategorie',
          type: 'select',
          options: bikeCategories.map(({ name: label, id: value }) => ({ label, value })),
          isMulti: true,
        },
        {
          id: 'frameShape',
          name: 'Rahmenform',
          type: 'select',
          options: bikeFrameShapes.map(({ name: label, id: value }) => ({ label, value })),
          isMulti: true,
        },
      ];

      const enhancedFilterList = filterList.map(item => ({
        ...item,
        value: values[item.id].map(i => item.options.find(({ value }) => value === i)),
      }));

      return (
        <Fragment>
          <H2>Filter</H2>
          <Wrapper>
            { enhancedFilterList.map(({
              id, name, type, value, options, isMulti,
            }) => {
              const Input = inputComponents[type];
              return (
                <Item key={id}>
                  <ItemHeadline>{ name }</ItemHeadline>
                  <Input
                    value={value}
                    options={options}
                    onChange={e => handleChange(id, e)}
                    isMulti={isMulti}
                    instanceId={id} />
                </Item>
              );
            }) }
          </Wrapper>
        </Fragment>
      );
    }}
  </BikeFilterConsumer>
);

export default BikeFilter;
