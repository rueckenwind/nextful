import React from 'react'
import styled from '@emotion/styled'
import { de } from 'date-fns/locale'

import { format, isToday } from 'date-fns'
import { PaddedBox } from '../ContentBox/ContentBox'
import colors from '../../js/colors'
import { getOpeningStatus } from './getOpeningStatus'
import { openTimes } from './openTimes'
import { getOpenHours } from './getOpenHours'
import { setTimeOfDay } from './utils'

const Status = styled.div<{ status: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  background-color: ${({ status }) => (status ? colors.greenDark : colors.red)};
`

export const OpenStatus = () => {
  const isOpen = getOpeningStatus(openTimes)
  const openHours = getOpenHours(isOpen)

  const openWeekday = format(openHours.day, 'eeee', { locale: de })

  const nextOpenDay = isToday(openHours.day)
    ? 'heute'
    : `am ${openWeekday} wieder`

  const timesString = openHours.times
    .map(time => {
      const opentime = setTimeOfDay(
        time.opening.hours,
        time.opening.minutes || 0,
      )
      const closetime = setTimeOfDay(
        time.closing.hours,
        time.closing.minutes || 0,
      )
      return `${format(opentime, 'kk:mm')} - ${format(closetime, 'kk:mm')} Uhr`
    })
    .join(', ')

  const descriptionClosed = `Wir haben ${nextOpenDay} für Sie von ${timesString} geöffnet.`

  const textClosed = 'Wir haben zur Zeit geschlossen.'
  const textOpen = 'Wir haben geöffnet!'

  return (
    <>
      <Status status={isOpen}>{isOpen ? textOpen : textClosed}</Status>
      {!isOpen && <PaddedBox>{descriptionClosed}</PaddedBox>}
    </>
  )
}
