import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

const MaxWidth = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding-right: 1rem;
  padding-left: 1rem;

  @media ${viewportsJs.xs} {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  > * {
    max-width: 65rem;
  }
`;

export default MaxWidth;
