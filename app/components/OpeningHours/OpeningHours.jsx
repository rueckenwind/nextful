import React from 'react'
import styled from '@emotion/styled'

import { H3 } from '../Typography'

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 0.5em;
  }

  span:last-child {
    text-align: right;
  }
`

const OpeningHours = () => (
  <>
    <H3>Öffnungszeiten</H3>
    <TableRow>
      <span>Mo.&nbsp;-&nbsp;Fr.</span>
      <span>10:00&nbsp;-&nbsp;13:30, 14:30&nbsp;-&nbsp;18:00</span>
    </TableRow>
    <TableRow>
      <span>Sa.</span>
      <span>11:00&nbsp;-&nbsp;14:00</span>
    </TableRow>
  </>
)

export default OpeningHours
