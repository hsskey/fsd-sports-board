import { format, isToday } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatPostDate(dateString: string): string {
  const date = new Date(dateString)

  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: ko })
  }

  return format(date, 'MM/dd HH:mm', { locale: ko })
}
