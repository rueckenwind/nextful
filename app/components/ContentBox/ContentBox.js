import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

const ContentBox = styled.div`
  margin-bottom: 1.25rem;
  padding: ${({ padded }) => (padded ? '.75rem' : 0)};
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .15);

  @media ${viewportsJs.xs} {
    padding: ${({ padded }) => (padded ? '1.25rem' : 0)};
  }
`;

ContentBox.defaultProps = {
  padded: true,
};

ContentBox.propTypes = {
  padded: PropTypes.bool,
};

export default ContentBox;
