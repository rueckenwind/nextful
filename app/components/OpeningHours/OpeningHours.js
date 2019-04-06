import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import { H3 } from '../Typography';

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OpeningHours = () => (
  <Fragment>
    <H3>Öffnungszeiten</H3>
    <TableRow>
      <span>Mo. - Fr.</span>
      <span>10:00 - 18:00</span>
    </TableRow>
    <TableRow>
      <span>Sa.</span>
      <span>11:00 - 14:00</span>
    </TableRow>
  </Fragment>

);

export default OpeningHours;
