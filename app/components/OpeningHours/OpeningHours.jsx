import React from 'react'
import styled from '@emotion/styled'

import { H3 } from '../Typography'

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const OpeningHours = () => (
  <>
    <H3>Öffnungszeiten</H3>
    <TableRow>
      <span>Mo. - Fr.</span>
      <span>10:00 - 18:00</span>
    </TableRow>
    <TableRow>
      <span>Sa.</span>
      <span>11:00 - 14:00</span>
    </TableRow>
  </>
)

export default OpeningHours
