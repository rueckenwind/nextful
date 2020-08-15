import React from 'react'
import styled from '@emotion/styled'

import colors from '../../js/colors'

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  background-color: ${colors.red};
`

export const Closed = () => {
  const textClosed = 'Wir haben dauerhaft geschlossen.'

  return <Status>{textClosed}</Status>
}
