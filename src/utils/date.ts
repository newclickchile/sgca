import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

const DEFAULT_TIME_ZONE = 'America/Santiago'

export const formatDateForBackend = (date: Date): string => {
  return formatInTimeZone(date, DEFAULT_TIME_ZONE, 'yyyy-MM-dd')
}

export const toZonedDate = (date: Date): Date => {
  return toZonedTime(date, DEFAULT_TIME_ZONE)
}

export const formatDate = (date: string | Date, formatValue: string = 'dd-MM-yyyy'): string => {
  return formatInTimeZone(date, DEFAULT_TIME_ZONE, formatValue)
}
