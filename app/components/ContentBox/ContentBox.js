import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

export const PaddedBox = styled.div`
  padding: .75rem;

  @media ${viewportsJs.xs} {
    padding: 1.25rem;
  }
`;

const Box = styled.div`
  margin-bottom: 1.25rem;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .15);
`;

const ContentBox = ({ padded, ...props }) => {
  if (padded) {
    return (
      <Box>
        <PaddedBox {...props} />
      </Box>
    );
  }

  return (
    <Box {...props} />
  );
};

ContentBox.defaultProps = {
  padded: true,
};

ContentBox.propTypes = {
  padded: PropTypes.bool,
};

export default ContentBox;
