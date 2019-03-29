import styled from '@emotion/styled';

import times from '../../js/times';
import colors from '../../js/colors';

const Link = styled.a`
  color: ${colors.blue};
  text-decoration: none;
  cursor: pointer;
  transition: ${times.transition};

  :hover {
    color: ${colors.green};
  }
`;

export default Link;
