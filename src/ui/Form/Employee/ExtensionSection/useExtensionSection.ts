import { useCallback } from 'react'
import {
	type Action,
	type DefaultEmployee
} from '@/core/employee/employee/infra/reducers/employeeFormReducer'

interface UsePhoneSectionProps {
	value: DefaultEmployee['phone']
	handleChange: (name: Action['type'], value: string[]) => void
}
export const usePhoneSection = ({ value, handleChange }: UsePhoneSectionProps) => {
	const handlePhoneChange = useCallback(
		(index: number, newValue: string) => {
			const newPhones = value
			newPhones[index] = newValue
			handleChange('phone', newPhones)
		},
		[handleChange, value]
	)

	const handleAddPhone = useCallback(() => {
		if (value[value.length - 1] !== '') {
			const newPhone = value
			newPhone.push('')
			handleChange('phone', newPhone)
		}
	}, [handleChange, value])

	const handleRemovePhone = useCallback(
		(index: number) => {
			if (value.length > 1) {
				const newPhones = [...value]
				newPhones.splice(index, 1)
				handleChange('phone', newPhones)
			}
		},
		[handleChange]
	)

	const handleClearFirstPhone = useCallback(() => {
		const newPhones = value
		newPhones[0] = ''
		handleChange('phone', newPhones)
	}, [handleChange])

	return {
		phones: value, // Retorna el valor directamente de las props
		handlePhoneChange,
		handleAddPhone,
		handleRemovePhone,
		handleClearFirstPhone
	}
}
