import { memo } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/Select'

interface SettingDayOfWeekSelectProps {
	value: string
	onChange: (value: string) => void
}

const DAYS_OF_WEEK = [
	{ value: '0', label: 'Domingo' },
	{ value: '1', label: 'Lunes' },
	{ value: '2', label: 'Martes' },
	{ value: '3', label: 'Miércoles' },
	{ value: '4', label: 'Jueves' },
	{ value: '5', label: 'Viernes' },
	{ value: '6', label: 'Sábado' }
]

export const SettingsDayOfWeekSelect = memo(({ value, onChange }: SettingDayOfWeekSelectProps) => {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Seleccione un día de la semana" />
			</SelectTrigger>
			<SelectContent>
				{DAYS_OF_WEEK.map(day => (
					<SelectItem key={day.value} value={day.value}>
						{day.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
})
SettingsDayOfWeekSelect.displayName = 'SettingsDayOfWeekSelect'
