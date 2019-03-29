import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

const ContentBox = styled.div`
  margin-bottom: 1.25rem;
  padding: .75rem;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .15);

  @media ${viewportsJs.xs} {
    padding: 1.25rem;
  }
`;

export default ContentBox;
