import { useMemo } from 'react'
import { formatDateWithWeekday } from '../utils/formatDate'

export const useGreetings = () => {
	const currentDate = new Date()

	const greeting = useMemo(() => {
		const currentHour = currentDate.getHours()
		if (currentHour >= 5 && currentHour < 12) {
			return 'Buenos dias'
		} else if (currentHour >= 12 && currentHour < 19) {
			return 'Buenas tardes'
		} else {
			return 'Buenas noches'
		}
	}, [])

	const date = formatDateWithWeekday(currentDate)

	return { greeting, date, currentDate }
}
