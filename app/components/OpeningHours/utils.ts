const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export const getDayString = (day: Date) => {
  const todayNumber = day.getDay()
  return days[todayNumber]
}

export const getTodayString = () => {
  const now = new Date()
  return getDayString(now)
}

export const setTimeOfDay = (hours: number, minutes = 0): Date => {
  const open = new Date()
  open.setHours(hours)
  open.setMinutes(minutes)

  return open
}
