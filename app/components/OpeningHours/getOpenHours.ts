import { getTodayString } from './utils'
import { openTimes } from './openTimes'
import { addDays, isFuture } from 'date-fns'
import { getDayString } from './utils'
import { OpenTimeType } from './@types/OpenTime'
import { getOpenHoursType } from './@types/getOpenHoursType'

const getTodaysOpenTimes = () => {
  const todayString = getTodayString()
  return openTimes[todayString]
}

const getNextOpenDay = (today: Date): getOpenHoursType => {
  const tomorrow = addDays(today, 1)
  const tomorrowString = getDayString(tomorrow)

  if (!openTimes[tomorrowString]) return getNextOpenDay(tomorrow)

  return { day: tomorrow, times: openTimes[tomorrowString] }
}

export const getOpenHours = (isOpen: boolean): getOpenHoursType => {
  if (isOpen) return { day: new Date(), times: getTodaysOpenTimes() }

  const todayTimes = getTodaysOpenTimes()

  if (
    todayTimes &&
    todayTimes.some((time: OpenTimeType) => {
      const closingTime = new Date()
      closingTime.setHours(time.closing.hours)
      closingTime.setMinutes(time.closing.minutes || 0)
      if (isFuture(closingTime)) return true
      return false
    })
  ) {
    return { day: new Date(), times: todayTimes }
  }
  return getNextOpenDay(new Date())
}
