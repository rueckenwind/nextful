import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

const ContentBox = styled.div`
  padding: .75rem;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.15);
  margin-right: 1rem;
  margin-left: 1rem;

  @media ${viewportsJs.xs} {
    margin-right: 0;
    margin-left: 0;
    padding: 1.25rem;
  }
`;

export default ContentBox;
