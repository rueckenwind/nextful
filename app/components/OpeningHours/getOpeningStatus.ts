import { isPast, isFuture } from 'date-fns'
import { getTodayString, setTimeOfDay } from './utils'
import { OpenTimesType, OpenTimeType } from './@types/OpenTime'

export const getOpeningStatus = (openTimes: OpenTimesType) => {
  const today = getTodayString()
  const todayOpenTimes = openTimes[today]

  if (!todayOpenTimes) return false

  const isOpen = todayOpenTimes.some((openTime: OpenTimeType) => {
    const { opening, closing } = openTime
    const tinezoneOffset = new Date().getTimezoneOffset() / 60
    const open = setTimeOfDay(opening.hours, opening.minutes)
    const close = setTimeOfDay(closing.hours, closing.minutes)

    if (isPast(open) && isFuture(close)) return true
    return false
  })

  return isOpen
}
