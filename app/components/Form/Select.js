import React from 'react';
import ReactSelect from 'react-select';

const customStyles = {
  control: provided => ({
    ...provided,
    minHeight: '0',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '0 .25rem',
  }),
  option: provided => ({
    ...provided,
    padding: '.125rem .25rem',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: '.125rem',
  }),
  clearIndicator: provided => ({
    ...provided,
    padding: '.125rem',
  }),
};

export const Select = props => (
  <ReactSelect
    styles={customStyles}
    {...props} />
);
