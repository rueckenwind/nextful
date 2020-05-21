import React from 'react'
import styled from '@emotion/styled'
import {
  format,
  isToday,
  isPast,
  setDay,
  addWeeks,
  isWithinRange,
  closestIndexTo,
} from 'date-fns'
import deLocale from 'date-fns/locale/de'
import colors from '../../js/colors'

import { PaddedBox } from '../ContentBox/ContentBox'

const openingTimes = [
  {
    // sunday
    from: undefined,
    to: undefined,
  },
  {
    // monday
    from: 10,
    to: 18,
  },
  {
    // tuesday
    from: 10,
    to: 18,
  },
  {
    // wednesday
    from: 10,
    to: 18,
  },
  {
    // thursday
    from: 10,
    to: 18,
  },
  {
    // friday
    from: 1,
    to: 18,
  },
  {
    // saturday
    from: 11,
    to: 14,
  },
]

const getStatus = () => {
  const now = new Date()
  const dayOfTheWeek = now.getDay()

  const openingTimesToday = openingTimes[dayOfTheWeek]

  if (!openingTimesToday) return false

  const todayFrom = new Date().setHours(openingTimesToday.from)
  const todayTo = new Date().setHours(openingTimesToday.to)

  if (isWithinRange(now, todayFrom, todayTo)) {
    return true
  }

  return false
}

const getOpenDay = () => {
  const nextDays = openingTimes.map((day, index) => {
    if (!day.from) return null

    let daySet = setDay(new Date(), index)
    if (isPast(daySet)) {
      daySet = addWeeks(daySet, 1)
    }

    return {
      from: daySet.setHours(day.from, 0, 0, 0),
      to: daySet.setHours(day.to, 0, 0, 0),
    }
  })

  const index = closestIndexTo(new Date(), nextDays.map(day => day && day.from))
  return nextDays[index]
}

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  font-size: 0.9rem;
  color: #fff;
  background-color: ${({ status }) => (status ? colors.greenDark : colors.red)};
`

const OpenStatus = () => {
  const openDay = getOpenDay()

  // console.log({
  //   openDayFrom: openDay && format(openDay.from, 'MM/DD/YYYY HH:mm:ss', { locale: deLocale }),
  //   openDayTo: openDay && format(openDay.to, 'MM/DD/YYYY HH:mm:ss', { locale: deLocale }),
  // });

  const status = getStatus()

  const openWeekday = format(openDay.from, 'dddd', { locale: deLocale })
  const openFrom = format(openDay.from, 'HH:mm', { locale: deLocale })
  const openTo = format(openDay.to, 'HH:mm', { locale: deLocale })

  const nextOpenDay = isToday(openDay.from) ? 'heute' : `am ${openWeekday}`

  const descriptionClosed = `Wir haben ${nextOpenDay} wieder von ${openFrom} bis ${openTo} geöffnet.`

  const textClosed = 'Wir haben zur Zeit geschlossen.'
  const textOpen = 'Wir haben geöffnet!'

  return (
    <>
      <Status status={status}>{status ? textOpen : textClosed}</Status>
      {!status && <PaddedBox>{descriptionClosed}</PaddedBox>}
    </>
  )
}

export default OpenStatus
